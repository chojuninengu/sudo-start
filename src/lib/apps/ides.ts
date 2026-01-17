import { Package } from '@/types';

export const ideApps: Package[] = [
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
    defaultVersion: 'deb',
    versions: [
      {
        id: 'deb',
        label: '.deb Package (Recommended)',
        macCommand: 'brew install --cask cursor',
        linuxCommand: 'echo "🔍 Checking dependencies..." && for cmd in curl wget gpg apt; do command -v "$cmd" >/dev/null 2>&1 || { echo "❌ Required dependency $cmd not found. Installing..."; sudo apt-get install -y "$cmd"; }; done && echo "📥 Downloading Cursor .deb package..." && cd /tmp && wget -q "https://api2.cursor.sh/updates/download/golden/linux-x64-deb/cursor/latest" -O cursor.deb && echo "📦 Installing Cursor .deb package..." && sudo apt-get install -y ./cursor.deb && rm -f cursor.deb && echo "✅ Cursor installed successfully!"',
      },
      {
        id: 'appimage',
        label: 'AppImage',
        macCommand: 'brew install --cask cursor',
        linuxCommand: 'echo "📥 Downloading latest Cursor AppImage..." && mkdir -p "$HOME/Downloads/.AppImage" && curl -fSL "https://downloader.cursor.sh/linux/appImage/x64" -o "$HOME/Downloads/.AppImage/Cursor-latest.AppImage" && chmod +x "$HOME/Downloads/.AppImage/Cursor-latest.AppImage" && echo "✅ Cursor AppImage downloaded to ~/Downloads/.AppImage/Cursor-latest.AppImage"',
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
        label: 'Stable (.deb)',
        macCommand: 'brew install --cask visual-studio-code',
        linuxCommand: 'wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg && sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg && sudo sh -c \'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list\' && rm -f packages.microsoft.gpg && sudo apt install apt-transport-https -y && sudo apt update && sudo apt install code -y',
      },
    ],
    linuxCommandTemplate: 'wget "https://update.code.visualstudio.com/${VERSION}/linux-deb-x64/stable" -O vscode.deb && sudo apt install ./vscode.deb -y && rm vscode.deb',
    macosCommandTemplate: 'brew install --cask visual-studio-code',
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
];
