import { Package } from '@/types';

export const communicationApps: Package[] = [
  {
    id: 'zoom',
    name: 'Zoom',
    description: '📹 Video conferencing — the standard for remote dev teams',
    category: 'communication',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask zoom',
        linuxCommand: 'wget https://zoom.us/client/latest/zoom_amd64.deb -O zoom.deb && sudo apt install ./zoom.deb -y && rm zoom.deb',
      },
    ],
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: '👥 Enterprise collaboration platform by Microsoft',
    category: 'communication',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask microsoft-teams',
        linuxCommand: 'curl https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/ms-teams stable main" | sudo tee /etc/apt/sources.list.d/teams.list && sudo apt-get update && sudo apt-get install -y teams-insiders',
      },
    ],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: '✈️ Fast, secure messaging app — popular in open-source communities',
    category: 'communication',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install --cask telegram',
        linuxCommand: 'sudo apt-get install -y telegram-desktop',
      },
    ],
  },
];