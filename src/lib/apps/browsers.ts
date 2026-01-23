import { Package } from '@/types';

export const browserApps: Package[] = [
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
    ],
  },
  {
    id: 'arc',
    name: 'Arc Browser',
    description: '🌈 The Chrome replacement. Mac Only',
    category: 'browser',
    platforms: { macos: true, linux: false },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
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
];
