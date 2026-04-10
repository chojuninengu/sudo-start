import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

let groq: Groq | null = null;

function getGroqClient() {
  if (!groq) {
    if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY is not defined');
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, bucketContext } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages' }), { status: 400 });
    }

    const bucketSection = bucketContext && bucketContext.length > 0
      ? `\n\nCurrent bucket (already selected by the user): ${bucketContext.join(', ')}.`
      : '\n\nCurrent bucket: empty.';

    const systemPrompt = {
      role: 'system' as const,
      content: `You are "Root", an expert Unix system administrator and helpful AI assistant for the SudoStart application.

Your purpose is to help users set up their development environment by recommending software packages and tools.

Start every response with a JSON object. Do not output plain text outside the JSON.
The JSON Schema is:
{
  "response": "Your conversational response to the user here (use Markdown)",
  "action": {
    "type": "add" | "remove",
    "packageIds": ["id1", "id2", "id3:version"]
  }
}
The "action" field is OPTIONAL. Only include it if the user explicitly asks to add or remove packages.

Full Package Catalog:
IDEs: windsurf, cursor, zed, vscode, vim, intellij
Browsers: zen-browser, arc, vivaldi, brave, google-chrome, microsoft-edge, firefox
Runtimes: nvm, nodejs, npm, python3, ruby, php, kotlin, rust, go, java, cpp
Package Managers: pnpm, yarn, pyenv, rbenv, sdkman
Build Tools: make, cmake, gradle, maven
Containers: docker, docker-desktop, podman, kubectl, minikube
Cloud CLIs: aws-cli, gcloud, azure-cli
Databases: postgresql, mysql, mariadb, sqlite3, redis, mongodb
Terminals: iterm2, warp, alacritty, kitty, hyper, ghostty
Frameworks: react, vue, angular, nextjs, django, flask, express
DevOps: jenkins, prometheus, docker-compose
Data Science: jupyter, tensorflow, pandas, numpy, matplotlib
Mobile: flutter, react-native, ionic, cordova, xcode
Game Dev: godot, blender, unity, unreal-engine
Desktop Dev: electron, tauri, qt
Web Servers: nginx, apache
Utilities: jq, wget, htop, tmux, openssh, ngrok, insomnia
Communication: zoom, microsoft-teams, telegram, slack, discord
Productivity: rectangle, raycast, 1password, bitwarden, docker-desktop
Tools: git, curl, zsh, oh-my-zsh, terraform, ansible, github-cli, postman, figma
${bucketSection}

Keep responses short and terminal-like. Be opinionated and helpful. Always be aware of what's already in the bucket.`,
    };

    const client = getGroqClient();
    const stream = await client.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    // Stream the response as Server-Sent Events
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let fullContent = '';
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? '';
            if (delta) {
              fullContent += delta;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ delta, done: false })}\n\n`)
              );
            }
          }
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ delta: '', done: true, full: fullContent })}\n\n`)
          );
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500 }
    );
  }
}