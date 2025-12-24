import { Package } from '@/types';

// Predefined package catalog for the "Package Manager" UI
export const packageCatalog: Package[] = [
  // IDEs
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Powerful, lightweight code editor',
    category: 'ide',
    macosInstallCmd: 'brew install --cask visual-studio-code',
    linuxInstallCmd: 'sudo snap install code --classic',
  },
  {
    id: 'vim',
    name: 'Vim',
    description: 'Highly configurable text editor',
    category: 'ide',
    macosInstallCmd: 'brew install vim',
    linuxInstallCmd: 'sudo apt-get install -y vim',
  },
  
  // Browsers
  {
    id: 'google-chrome',
    name: 'Google Chrome',
    description: 'Fast, secure web browser',
    category: 'browser',
    macosInstallCmd: 'brew install --cask google-chrome',
    linuxInstallCmd: 'wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo sh -c \'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list\' && sudo apt-get update && sudo apt-get install -y google-chrome-stable',
  },
  {
    id: 'firefox',
    name: 'Firefox',
    description: 'Open-source web browser',
    category: 'browser',
    macosInstallCmd: 'brew install --cask firefox',
    linuxInstallCmd: 'sudo apt-get install -y firefox',
  },
  
  // Tools
  {
    id: 'git',
    name: 'Git',
    description: 'Distributed version control system',
    category: 'tool',
    macosInstallCmd: 'brew install git',
    linuxInstallCmd: 'sudo apt-get install -y git',
  },
  {
    id: 'curl',
    name: 'cURL',
    description: 'Command-line tool for transferring data',
    category: 'tool',
    macosInstallCmd: 'brew install curl',
    linuxInstallCmd: 'sudo apt-get install -y curl',
  },
  
  // Runtimes
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'JavaScript runtime built on Chrome\'s V8',
    category: 'runtime',
    versions: ['18', '20', '22'],
    selectedVersion: '20',
    macosInstallCmd: 'brew install node@20',
    linuxInstallCmd: 'curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs',
  },
  {
    id: 'python3',
    name: 'Python 3',
    description: 'Powerful programming language',
    category: 'runtime',
    versions: ['3.10', '3.11', '3.12'],
    selectedVersion: '3.11',
    macosInstallCmd: 'brew install python@3.11',
    linuxInstallCmd: 'sudo apt-get install -y python3.11',
  },
  
  // Containers
  {
    id: 'docker',
    name: 'Docker',
    description: 'Platform for containerized applications',
    category: 'container',
    macosInstallCmd: 'brew install --cask docker',
    linuxInstallCmd: 'sudo apt-get install -y docker.io && sudo systemctl start docker && sudo systemctl enable docker',
  },
  
  // Databases
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Advanced open-source database',
    category: 'database',
    versions: ['14', '15', '16'],
    selectedVersion: '16',
    macosInstallCmd: 'brew install postgresql@16',
    linuxInstallCmd: 'sudo apt-get install -y postgresql-16',
  },
];
