# 🚀 SudoStart

> **The Developer's Boot Screen**  
> Configure your dream development environment in seconds with a terminal-inspired interface.

## 🌟 Features

- **Terminal Aesthetics**: A beautiful, hacker-themed UI with deep dark modes and retro animations.
- **Modern App Catalog**: Curated list of 2025's best tools:
  - **AI IDEs**: Windsurf, Cursor, Zed, VS Code.
  - **Browsers**: Zen Browser, Arc, Vivaldi, Brave.
  - **Languages**: Rust, Go, Python, Java, Node.js, C++.
  - **Containers**: Docker, Podman, Kubernetes (kubectl, minikube).
  - **DevOps**: Terraform, Ansible.
- **Smart "Root" AI**: Chat with our agentic AI assistant.
  - **Agentic Capabilities**: "Root" can actively **add and remove** packages from your bucket for you. Just ask!
  - **Context Aware**: Knows your OS (Mac/Linux) and suggests valid tools.
- **Cross-Platform**: Generates precise installation scripts for **macOS** (Homebrew) and **Linux** (apt/snap/flatpak).

## 🛠️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chojuninengu/sudo-start.git
    cd sudo-start
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file and add your Groq API Key for the AI chat:
    ```bash
    GROQ_API_KEY=gsk_...
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open locally:**
    Visit [http://localhost:3000](http://localhost:3000).

## 🤖 Using Root AI

The chat interface is located in the bottom right.
- **Ask for advice**: "What do I need for a Rust backend?"
- **Give commands**: "Add Rust and Docker to my setup", or "Remove everything".
- **Root Actions**: The AI will parse your intent and modify your package bucket programmatically.

## 📦 Deployment

Deploy easily to Vercel:
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Add `GROQ_API_KEY` in Vercel Environment Variables.
4.  Deploy!
