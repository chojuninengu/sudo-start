import { Package } from '@/types';

export const productivityApps: Package[] = [
  {
    id: 'rectangle',
    name: 'Rectangle',
    description: '🪟 Move and resize windows with keyboard shortcuts. macOS Only',
    category: 'productivity',
    platforms: { macos: true, linux: false },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask rectangle',
        linuxCommand: '# Rectangle is not available on Linux',
      },
    ],
  },
  {
    id: 'raycast',
    name: 'Raycast',
    description: '🚀 Blazingly fast launcher — replaces Spotlight & Alfred. macOS Only',
    category: 'productivity',
    platforms: { macos: true, linux: false },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask raycast',
        linuxCommand: '# Raycast is not available on Linux',
      },
    ],
  },
  {
    id: '1password',
    name: '1Password',
    description: '🔑 The world most trusted password manager',
    category: 'productivity',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask 1password',
        linuxCommand: 'curl -sS https://downloads.1password.com/linux/keys/1password.asc | sudo gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/$(dpkg --print-architecture) stable main" | sudo tee /etc/apt/sources.list.d/1password.list && sudo apt-get update && sudo apt-get install -y 1password',
      },
    ],
  },
  {
    id: 'bitwarden',
    name: 'Bitwarden',
    description: '🛡️ Free and open-source password manager',
    category: 'productivity',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask bitwarden',
        linuxCommand: 'sudo snap install bitwarden',
      },
    ],
  },
  {
    id: 'docker-desktop',
    name: 'Docker Desktop',
    description: '🐳 GUI for Docker — container management made visual',
    category: 'productivity',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask docker',
        linuxCommand: 'curl -fsSL https://desktop.docker.com/linux/main/amd64/docker-desktop-amd64.deb -o docker-desktop.deb && sudo apt-get install -y ./docker-desktop.deb && rm docker-desktop.deb',
      },
    ],
  },
];