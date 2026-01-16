import { Package } from '@/types';

export const terminalApps: Package[] = [
  {
    id: 'iterm2',
    name: 'iTerm2',
    description: '🖥️ Terminal emulator for macOS',
    category: 'terminal',
    platforms: { macos: true, linux: false },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask iterm2',
        linuxCommand: '# Not available on Linux',
      },
    ],
  },
  {
    id: 'warp',
    name: 'Warp',
    description: '🚀 The terminal for the 21st century',
    category: 'terminal',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask warp',
        linuxCommand: 'curl -fsSL https://releases.warp.dev/linux/keys/warp.asc | gpg --dearmor > warp.gpg && sudo install -D -o root -g root -m 644 warp.gpg /etc/apt/keyrings/warp.gpg && echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/warp.gpg] https://releases.warp.dev/linux/deb stable main" | sudo tee /etc/apt/sources.list.d/warp.list > /dev/null && rm warp.gpg && sudo apt update && sudo apt install warp-terminal -y',
      },
    ],
  },
  {
    id: 'alacritty',
    name: 'Alacritty',
    description: '⚡ GPU-accelerated terminal emulator',
    category: 'terminal',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask alacritty',
        linuxCommand: 'sudo apt-get install -y alacritty',
      },
    ],
  },
];
