import { Package } from '@/types';

export const runtimeApps: Package[] = [
  {
    id: 'nodejs',
    name: 'Node.js',
    description: '⚙️ JavaScript runtime built on Chrome V8 engine',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'fnm',
    versions: [
      {
        id: 'fnm',
        label: 'Fast Node Manager (fnm)',
        macCommand: 'brew install fnm',
        linuxCommand: 'curl -fsSL https://fnm.vercel.app/install | bash && export PATH="$HOME/.local/share/fnm:$PATH" && eval "$(fnm env --shell bash)" && fnm install --lts',
      },
      {
        id: 'stable',
        label: 'Latest LTS (APT)',
        macCommand: 'brew install node',
        linuxCommand: 'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs',
      },
    ],
    linuxCommandTemplate: 'curl -fsSL https://deb.nodesource.com/setup_${VERSION_MAJOR}.x | sudo -E bash - && sudo apt-get install -y nodejs',
    macosCommandTemplate: 'brew install node@${VERSION_MAJOR}',
  },
  {
    id: 'cpp',
    name: 'C++',
    description: '⚡ High-performance system programming (gcc/g++)',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'xcode-select --install',
        linuxCommand: 'sudo apt-get install -y build-essential',
      },
    ],
  },
  {
    id: 'python3',
    name: 'Python 3',
    description: '🐍 Powerful programming language for everything',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install python',
        linuxCommand: 'sudo apt-get install -y python3 python3-pip',
      },
    ],
    linuxCommandTemplate: 'sudo add-apt-repository ppa:deadsnakes/ppa -y && sudo apt update && sudo apt install python${VERSION_NO_V} python${VERSION_NO_V}-venv -y',
    macosCommandTemplate: 'brew install python@${VERSION_NO_V}',
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
    linuxCommandTemplate: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && rustup toolchain install ${VERSION_NO_V} && rustup default ${VERSION_NO_V}",
    macosCommandTemplate: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && rustup toolchain install ${VERSION_NO_V} && rustup default ${VERSION_NO_V}",
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    description: '🐹 Simple, reliable, and efficient language',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install go',
        linuxCommand: 'GO_VERSION=$(curl -s https://go.dev/VERSION?m=text | head -n1) && wget https://go.dev/dl/${GO_VERSION}.linux-amd64.tar.gz && sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf ${GO_VERSION}.linux-amd64.tar.gz && rm ${GO_VERSION}.linux-amd64.tar.gz && echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.profile',
      },
    ],
    linuxCommandTemplate: 'wget https://go.dev/dl/go${VERSION_NO_V}.linux-amd64.tar.gz && sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go${VERSION_NO_V}.linux-amd64.tar.gz && rm go${VERSION_NO_V}.linux-amd64.tar.gz && echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.profile',
    macosCommandTemplate: 'brew install go@${VERSION}',
  },
  {
    id: 'java',
    name: 'Java (JDK)',
    description: '☕ General-purpose programming language',
    category: 'runtime',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Latest (OpenJDK)',
        macCommand: 'brew install openjdk',
        linuxCommand: 'sudo apt-get install -y default-jdk',
      },
    ],
  },
];
