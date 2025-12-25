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
        linuxCommand: 'curl -fsSL https://install.codeium.com/windsurf | sh',
      },
    ],
  },
  
  {
    id: 'cursor',
    name: 'Cursor',
    description: '✨ The AI-first code editor built for pair programming',
    category: 'ide',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask cursor',
        linuxCommand: 'curl -fsSL https://raw.githubusercontent.com/watzon/cursor-linux-installer/main/install.sh | bash',
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
  // DEVELOPER TOOLS
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
  
  // ============================================
  // CONTAINERS & DATABASES
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
