import { Package } from '@/types';

export const toolApps: Package[] = [
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
  {
    id: 'github-cli',
    name: 'GitHub CLI',
    description: '🐙 GitHub command line tool',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install gh',
        linuxCommand: 'type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y) && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null && sudo apt update && sudo apt install gh -y',
      },
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    description: '💬 Team communication platform',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask slack',
        linuxCommand: 'wget "https://slack.com/filenames/linux/latest/slack-desktop-amd64.deb" -O slack.deb && sudo apt install ./slack.deb -y && rm slack.deb',
      },
    ],
  },
  {
    id: 'postman',
    name: 'Postman',
    description: '🚀 API development platform',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask postman',
        linuxCommand: 'wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz && sudo tar -xzf postman.tar.gz -C /opt && sudo ln -s /opt/Postman/Postman /usr/bin/postman && rm postman.tar.gz',
      },
    ],
  },
  {
    id: 'figma',
    name: 'Figma',
    description: '🎨 Interface design tool',
    category: 'tool',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask figma',
        linuxCommand: 'echo "Figma is best used in the browser on Linux, or via unofficial clients like figma-linux."',
      },
    ],
  },
];
