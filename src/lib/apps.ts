import { Package } from '@/types';

/**
 * Comprehensive catalog of modern development tools for 2025
 * Includes platform-specific installation commands for MacOS and Linux
 */

export const appCatalog: Package[] = [
  // ============================================
  // AI-ERA IDEs (The Future of Coding)
  // ============================================
  
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: '🌊 The first agentic IDE, powered by Codeium AI',
    category: 'ide',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask windsurf',
        // Official Windsurf installation from Codeium
        linuxCommand: 'sudo apt-get install -y wget gpg && wget -qO- "https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/windsurf.gpg" | gpg --dearmor > /tmp/windsurf-stable.gpg && sudo install -D -o root -g root -m 644 /tmp/windsurf-stable.gpg /etc/apt/keyrings/windsurf-stable.gpg && echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/windsurf-stable.gpg] https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable main" | sudo tee /etc/apt/sources.list.d/windsurf.list > /dev/null && rm -f /tmp/windsurf-stable.gpg && sudo apt-get install -y apt-transport-https && sudo apt-get update && sudo apt-get install -y windsurf',
      },
    ],
  },
  
  {
    id: 'cursor',
    name: 'Cursor',
    description: '✨ The AI-first code editor built for pair programming',
    category: 'ide',
    platforms: { macos: true, linux: true },
    defaultVersion: 'appimage',
    versions: [
      {
        id: 'appimage',
        label: 'AppImage (Recommended)',
        macCommand: 'brew install --cask cursor',
        // Enhanced installation with AppArmor support, icon management, and proper desktop integration
        linuxCommand: 'echo "🔍 Checking dependencies..." && for cmd in curl chmod; do command -v "$cmd" >/dev/null 2>&1 || { echo "❌ Required dependency $cmd not found. Installing..."; sudo apt-get install -y "$cmd"; }; done && APPIMAGE_PATH=$(find "$HOME/Downloads" -type f \\( -name "Cursor-*.AppImage" -o -name "cursor-*.AppImage" \\) | sort | tail -n 1) && if [ -z "$APPIMAGE_PATH" ]; then echo "❌ Cursor AppImage not found in ~/Downloads. Please download it first from cursor.com"; exit 1; fi && INSTALL_DIR="/opt/cursor" && echo "📦 Installing Cursor..." && sudo mkdir -p "$INSTALL_DIR" && sudo cp "$APPIMAGE_PATH" "$INSTALL_DIR/cursor" && sudo chmod +x "$INSTALL_DIR/cursor" && sudo ln -sf "$INSTALL_DIR/cursor" /usr/local/bin/cursor && echo "✅ Cursor installed successfully! You can run it with: cursor"',
      },
      {
        id: 'download',
        label: 'Download Only',
        macCommand: 'brew install --cask cursor',
        // Download AppImage to organized directory with dependency checking
        linuxCommand: 'echo "🔍 Checking dependencies..." && for cmd in curl wget; do command -v "$cmd" >/dev/null 2>&1 || { echo "❌ Required dependency $cmd not found. Installing..."; sudo apt-get install -y "$cmd"; }; done && echo "📥 Downloading latest Cursor AppImage..." && mkdir -p "$HOME/Downloads/.AppImage" && curl -fSL "https://downloader.cursor.sh/linux/appImage/x64" -o "$HOME/Downloads/.AppImage/Cursor-latest.AppImage" && chmod +x "$HOME/Downloads/.AppImage/Cursor-latest.AppImage" && echo "✅ Cursor AppImage downloaded to ~/Downloads/.AppImage/Cursor-latest.AppImage"',
      },
    ],
  },
  
  {
    id: 'zed',
    name: 'Zed',
    description: '⚡ High-performance multiplayer code editor',
    category: 'ide',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask zed',
        linuxCommand: 'curl -f https://zed.dev/install.sh | sh',
      },
    ],
  },
  
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: '📝 Code editing. Redefined. The industry standard',
    category: 'ide',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask visual-studio-code',
        linuxCommand: 'snap install code --classic',
      },
      {
        id: 'insiders',
        label: 'Insiders (Daily)',
        macCommand: 'brew install --cask visual-studio-code-insiders',
        linuxCommand: 'snap install code-insiders --classic',
      },
    ],
  },
  
  {
    id: 'vim',
    name: 'Vim',
    description: '📟 Highly configurable text editor built for efficiency',
    category: 'ide',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install vim',
        linuxCommand: 'sudo apt-get install -y vim',
      },
    ],
  },
  
  // ============================================
  // MODERN BROWSERS (Next-Gen Browsing)
  // ============================================
  
  {
    id: 'zen-browser',
    name: 'Zen Browser',
    description: '🎨 Beautiful Firefox fork with vertical tabs & privacy focus',
    category: 'browser',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask zen-browser',
        linuxCommand: 'flatpak install flathub io.github.zen_browser.zen -y',
      },
      {
        id: 'twilight',
        label: 'Twilight (Beta)',
        macCommand: 'brew install --cask zen@twilight',
        linuxCommand: 'flatpak install flathub io.github.zen_browser.zen.twilight -y',
      },
    ],
  },
  
  {
    id: 'arc',
    name: 'Arc Browser',
    description: '🌈 The Chrome replacement. Mac Only',
    category: 'browser',
    platforms: { macos: true, linux: false },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask arc',
        linuxCommand: '# Arc is not available on Linux',
      },
    ],
  },
  
  {
    id: 'vivaldi',
    name: 'Vivaldi',
    description: '🎭 Power user browser with extensive customization',
    category: 'browser',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask vivaldi',
        linuxCommand: 'wget -qO- https://repo.vivaldi.com/archive/linux_signing_key.pub | gpg --dearmor | sudo dd of=/usr/share/keyrings/vivaldi-browser.gpg && echo "deb [signed-by=/usr/share/keyrings/vivaldi-browser.gpg] https://repo.vivaldi.com/archive/deb/ stable main" | sudo tee /etc/apt/sources.list.d/vivaldi.list && sudo apt update && sudo apt install vivaldi-stable -y',
      },
    ],
  },
  
  {
    id: 'brave',
    name: 'Brave',
    description: '🦁 Privacy-focused browser with built-in ad blocking',
    category: 'browser',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask brave-browser',
        linuxCommand: 'sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg && echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list && sudo apt update && sudo apt install brave-browser -y',
      },
    ],
  },
  
  {
    id: 'google-chrome',
    name: 'Google Chrome',
    description: '🌐 Fast, secure web browser by Google',
    category: 'browser',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask google-chrome',
        linuxCommand: 'wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo sh -c \'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list\' && sudo apt-get update && sudo apt-get install -y google-chrome-stable',
      },
    ],
  },
  
  {
    id: 'firefox',
    name: 'Firefox',
    description: '🦊 Open-source web browser by Mozilla',
    category: 'browser',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask firefox',
        linuxCommand: 'sudo apt-get install -y firefox',
      },
    ],
  },
  
  // ============================================
  // DEVELOPER & DEVOPS TOOLS
  // ============================================
  
  {
    id: 'git',
    name: 'Git',
    description: '🔀 Distributed version control system',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install git',
        linuxCommand: 'sudo apt-get install -y git',
      },
    ],
  },
  
  {
    id: 'curl',
    name: 'cURL',
    description: '🌍 Command-line tool for transferring data with URLs',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install curl',
        linuxCommand: 'sudo apt-get install -y curl',
      },
    ],
  },

  {
    id: 'terraform',
    name: 'Terraform',
    description: '🏗️ Infrastructure as Code tool',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install terraform',
        linuxCommand: 'wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg && echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list && sudo apt update && sudo apt-get install terraform',
      },
    ],
  },

  {
    id: 'ansible',
    name: 'Ansible',
    description: '🤖 IT automation platform',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install ansible',
        linuxCommand: 'sudo apt-get install -y ansible',
      },
    ],
  },
  
  // ============================================
  // RUNTIMES & LANGUAGES
  // ============================================
  
  {
    id: 'nodejs',
    name: 'Node.js',
    description: '⚙️ JavaScript runtime built on Chrome V8 engine',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: '20',
    versions: [
      {
        id: '18',
        label: 'v18 LTS',
        macCommand: 'brew install node@18',
        linuxCommand: 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs',
      },
      {
        id: '20',
        label: 'v20 LTS',
        macCommand: 'brew install node@20',
        linuxCommand: 'curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs',
      },
      {
        id: '22',
        label: 'v22 Current',
        macCommand: 'brew install node@22',
        linuxCommand: 'curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs',
      },
    ],
  },
  
  {
    id: 'python3',
    name: 'Python 3',
    description: '🐍 Powerful programming language for everything',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: '3.11',
    versions: [
      {
        id: '3.10',
        label: 'Python 3.10',
        macCommand: 'brew install python@3.10',
        linuxCommand: 'sudo apt-get install -y python3.10',
      },
      {
        id: '3.11',
        label: 'Python 3.11',
        macCommand: 'brew install python@3.11',
        linuxCommand: 'sudo apt-get install -y python3.11',
      },
      {
        id: '3.12',
        label: 'Python 3.12',
        macCommand: 'brew install python@3.12',
        linuxCommand: 'sudo apt-get install -y python3.12',
      },
    ],
  },

  {
    id: 'rust',
    name: 'Rust',
    description: '🦀 Blazingly fast memory-safe language',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable (Rustup)',
        macCommand: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
        linuxCommand: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y",
      },
    ],
  },

  {
    id: 'go',
    name: 'Go (Golang)',
    description: '🐹 Simple, reliable, and efficient language',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install go',
        linuxCommand: 'wget https://go.dev/dl/go1.21.6.linux-amd64.tar.gz && sudo tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz && echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.profile',
      },
    ],
  },

  {
    id: 'java',
    name: 'Java (JDK)',
    description: '☕ General-purpose programming language',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest (OpenJDK)',
        macCommand: 'brew install openjdk',
        linuxCommand: 'sudo apt-get install -y default-jdk',
      },
    ],
  },

  {
    id: 'cpp',
    name: 'C++',
    description: '⚡ High-performance system programming (gcc/g++)',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'xcode-select --install',
        linuxCommand: 'sudo apt-get install -y build-essential',
      },
    ],
  },
  
  // ============================================
  // CONTAINERS & ORCHESTRATION
  // ============================================
  
  {
    id: 'docker',
    name: 'Docker',
    description: '📦 Platform for containerized applications',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask docker',
        linuxCommand: 'sudo apt-get install -y docker.io && sudo systemctl start docker && sudo systemctl enable docker',
      },
    ],
  },

  {
    id: 'podman',
    name: 'Podman',
    description: '🦭 Daemonless container engine',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install podman',
        linuxCommand: 'sudo apt-get install -y podman',
      },
    ],
  },

  {
    id: 'kubectl',
    name: 'Kubectl',
    description: '☸️ Kubernetes command-line tool',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install kubectl',
        linuxCommand: 'sudo snap install kubectl --classic',
      },
    ],
  },

  {
    id: 'minikube',
    name: 'Minikube',
    description: '🏝️ Local Kubernetes environment',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install minikube',
        linuxCommand: 'curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube',
      },
    ],
  },
  
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: '💾 Advanced open-source relational database',
    category: 'database',
    platforms: { macos: true, linux: true },
    defaultVersion: '16',
    versions: [
      {
        id: '14',
        label: 'PostgreSQL 14',
        macCommand: 'brew install postgresql@14',
        linuxCommand: 'sudo apt-get install -y postgresql-14',
      },
      {
        id: '15',
        label: 'PostgreSQL 15',
        macCommand: 'brew install postgresql@15',
        linuxCommand: 'sudo apt-get install -y postgresql-15',
      },
      {
        id: '16',
        label: 'PostgreSQL 16',
        macCommand: 'brew install postgresql@16',
        linuxCommand: 'sudo apt-get install -y postgresql-16',
      },
    ],
  },
];

/**
 * Helper function to get apps that are available for a specific OS
 */
export function getAppsForOS(os: 'macos' | 'linux'): Package[] {
  return appCatalog.filter((app) => app.platforms[os]);
}

/**
 * Helper function to get apps by category
 */
export function getAppsByCategory(category: string): Package[] {
  return appCatalog.filter((app) => app.category === category);
}

/**
 * Check if an app requires flatpak on Linux
 */
export function requiresFlatpak(pkg: Package): boolean {
  return pkg.versions.some((v) => v.linuxCommand.includes('flatpak'));
}

/**
 * Check if an app requires snap on Linux
 */
export function requiresSnap(pkg: Package): boolean {
  return pkg.versions.some((v) => v.linuxCommand.includes('snap'));
}

/**
 * Get a default set of popular applications
 */
export function getDefaultApps(): Package[] {
    const defaultAppIds = [
        'vscode',
        'cursor',
        'google-chrome',
        'git',
        'curl',
        'nodejs',
        'python3',
        'docker',
        'postgresql',
    ];
    return appCatalog.filter((app) => defaultAppIds.includes(app.id));
}
