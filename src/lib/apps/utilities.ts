import { Package } from '@/types';

export const utilityApps: Package[] = [
  {
    id: 'jq',
    name: 'jq',
    description: '🔍 Lightweight and flexible command-line JSON processor',
    category: 'utility',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install jq',
        linuxCommand: 'sudo apt-get install -y jq',
      },
    ],
  },
  {
    id: 'wget',
    name: 'wget',
    description: '⬇️ Network downloader supporting HTTP, HTTPS and FTP',
    category: 'utility',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install wget',
        linuxCommand: 'sudo apt-get install -y wget',
      },
    ],
  },
  {
    id: 'htop',
    name: 'htop',
    description: '📊 Interactive process viewer — a better top',
    category: 'utility',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install htop',
        linuxCommand: 'sudo apt-get install -y htop',
      },
    ],
  },
  {
    id: 'tmux',
    name: 'tmux',
    description: '🖥️ Terminal multiplexer — split panes, persist sessions over SSH',
    category: 'utility',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install tmux',
        linuxCommand: 'sudo apt-get install -y tmux',
      },
    ],
  },
  {
    id: 'openssh',
    name: 'OpenSSH',
    description: '🔐 Secure Shell client and server for encrypted remote access',
    category: 'utility',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install openssh',
        linuxCommand: 'sudo apt-get install -y openssh-client openssh-server',
      },
    ],
  },
  {
    id: 'ngrok',
    name: 'ngrok',
    description: '🌐 Expose local servers to the internet — essential for webhook dev',
    category: 'utility',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask ngrok',
        linuxCommand: 'curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt-get update && sudo apt-get install -y ngrok',
      },
    ],
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    description: '🌙 Open-source API client for REST, GraphQL and gRPC',
    category: 'utility',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask insomnia',
        linuxCommand: 'echo "deb [trusted=yes arch=amd64] https://packages.konghq.com/public/insomnia/deb/ubuntu focal main" | sudo tee /etc/apt/sources.list.d/insomnia.list && sudo apt-get update && sudo apt-get install -y insomnia',
      },
    ],
  },
];