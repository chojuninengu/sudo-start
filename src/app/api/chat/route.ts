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

When a user asks for help with a specific development setup (e.g., "Django development", "React Native", "Machine Learning"), you should:

1. List the essential packages and tools needed
2. Explain briefly why each tool is needed
3. Offer to add them to their "bucket" (their installation cart)
4. Be concise but helpful

You have access to these package categories in the SudoStart catalog:

- IDEs: Windsurf (Agentic IDE), Cursor (AI-first), Zed (High Performance), VS Code (Stable/Insiders), Vim
- Browsers: Zen Browser (Privacy/Vertical Tabs), Arc (Mac Only), Vivaldi, Brave, Chrome, Firefox
- Tools: Git, cURL
- Runtimes: Node.js (v18/v20/v22), Python 3 (v3.10/v3.11/v3.12)
- Containers: Docker
- Databases: PostgreSQL (v14/v15/v16)

Keep responses short and terminal-like. Use a friendly but professional tone.
If a user asks for "Windsurf" or "Cursor", highly recommend them as they are cutting-edge AI tools.
If a user is on Linux and asks for "Arc", remind them it's Mac only but suggest "Zen Browser" as a great alternative.`,
    };

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
