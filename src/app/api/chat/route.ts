import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

let groq: Groq | null = null;

function getGroqClient() {
  if (!groq) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not defined');
    }
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    // System prompt for "Root" - the AI assistant
    const systemPrompt = {
      role: 'system',
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
The "action" field is OPTIONAL. You can specify a version by using "id:version" (e.g. "nodejs:20.11.0"). Only include it if the user explicitly asks to add or remove packages, or if you are strongly recommending a setup and they accepted.

Current Package Catalog:
- IDEs: windsurf, cursor, zed, vscode (Visual Studio Code), vim
- Browsers: zen-browser, arc, vivaldi, brave, google-chrome, firefox
- Runtimes/Languages: rust, go, python3, java, cpp, nodejs
- Containers: docker, podman, kubectl, minikube
- Tools: git, curl, terraform, ansible, github-cli, slack, postman, figma
- Databases: postgresql, redis, mongodb
- Terminals: iterm2, warp, alacritty
- Frameworks: react, vue, angular, nextjs, django, flask, express
- DevOps: jenkins, prometheus, docker-compose
- Data Science: jupyter, tensorflow, pandas, numpy, matplotlib
- Mobile: flutter, react-native, ionic, cordova, xcode
- Game Dev: godot, blender, unity, unreal-engine
- Desktop Dev: electron, tauri, qt
- Web Servers: nginx, apache

Examples:
User: "I want to do Rust dev"
Assistant: { "response": "For Rust, you'll need the compiler and a good IDE. I recommend Rust (rustup) and Zed.", "action": { "type": "add", "packageIds": ["rust", "zed"] } }

User: "Remove docker please"
Assistant: { "response": "Removing Docker from your bucket.", "action": { "type": "remove", "packageIds": ["docker"] } }

User: "Hi"
Assistant: { "response": "Hello! I'm Root. What are you building today?" }

Keep responses short and terminal-like. Use a friendly but professional tone.`,
    };

    // Force JSON mode instruction for model
    const startPrompt = messages.length > 0 ? messages[messages.length - 1].content : "";
    const temperature = 0.5; // Lower temp for more consistent JSON

    const client = getGroqClient();
    const chatCompletion = await client.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const assistantMessage = chatCompletion.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error in chat API:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
