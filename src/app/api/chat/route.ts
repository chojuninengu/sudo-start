import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
    "packageIds": ["id1", "id2"] 
  }
}
The "action" field is OPTIONAL. Only include it if the user explicitly asks to add or remove packages, or if you are strongly recommending a setup and they accepted.

Current Package Catalog:
- IDEs: windsurf, cursor, zed, vscode (Visual Studio Code), vim
- Browsers: zen-browser, arc, vivaldi, brave, google-chrome, firefox
- Languages: rust (Rust), go (Go), python3 (Python), java (Java JDK), cpp (C++), nodejs (Node.js)
- Containers: docker, podman, kubectl, minikube
- Tools: git, curl, terraform, ansible, github-cli, slack, postman, figma
- Databases: postgresql, redis, mongodb
- Terminals: iterm2, warp, alacritty

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

    const chatCompletion = await groq.chat.completions.create({
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
