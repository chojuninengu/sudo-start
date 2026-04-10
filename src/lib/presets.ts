export interface Preset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tags: string[];
  packageIds: string[];
  estimatedTime?: number; // minutes
}

export const presets: Preset[] = [
  {
    id: 'frontend-dev',
    name: 'Frontend Developer',
    emoji: '⚛️',
    description: 'React/Next.js stack with modern tooling',
    tags: ['React', 'TypeScript', 'Node.js'],
    packageIds: ['vscode', 'cursor', 'brave', 'git', 'nodejs', 'nvm', 'pnpm', 'zsh', 'oh-my-zsh', 'github-cli', 'curl'],
  },
  {
    id: 'backend-python',
    name: 'Python Backend',
    emoji: '🐍',
    description: 'FastAPI / Django / Flask development environment',
    tags: ['Python', 'PostgreSQL', 'Docker'],
    packageIds: ['vscode', 'python3', 'pyenv', 'postgresql', 'redis', 'docker', 'git', 'curl', 'zsh', 'oh-my-zsh', 'postman'],
  },
  {
    id: 'rust-systems',
    name: 'Rust Systems Engineer',
    emoji: '🦀',
    description: 'Low-level Rust development with CLI tooling',
    tags: ['Rust', 'Systems', 'CLI'],
    packageIds: ['zed', 'rust', 'git', 'curl', 'cmake', 'make', 'zsh', 'oh-my-zsh', 'htop', 'tmux'],
  },
  {
    id: 'devops-cloud',
    name: 'DevOps / Cloud',
    emoji: '☁️',
    description: 'Infrastructure, containers, and cloud CLI tools',
    tags: ['Docker', 'K8s', 'Terraform'],
    packageIds: ['vscode', 'docker', 'kubectl', 'minikube', 'terraform', 'ansible', 'aws-cli', 'git', 'zsh', 'oh-my-zsh', 'htop', 'tmux', 'jq'],
  },
  {
    id: 'ml-engineer',
    name: 'ML / Data Science',
    emoji: '🧪',
    description: 'Python-based ML and data analysis stack',
    tags: ['Python', 'Jupyter', 'TensorFlow'],
    packageIds: ['vscode', 'python3', 'pyenv', 'jupyter', 'tensorflow', 'pandas', 'numpy', 'matplotlib', 'git', 'curl', 'zsh'],
  },
  {
    id: 'fullstack-js',
    name: 'Full-Stack JavaScript',
    emoji: '🌐',
    description: 'Node.js full-stack with databases',
    tags: ['Node.js', 'MongoDB', 'PostgreSQL'],
    packageIds: ['cursor', 'nodejs', 'nvm', 'pnpm', 'postgresql', 'mongodb', 'redis', 'docker', 'git', 'github-cli', 'postman', 'zsh'],
  },
  {
    id: 'mobile-dev',
    name: 'Mobile Developer',
    emoji: '📱',
    description: 'React Native + Flutter cross-platform setup',
    tags: ['Flutter', 'React Native', 'Android'],
    packageIds: ['vscode', 'flutter', 'react-native', 'nodejs', 'git', 'curl', 'android-studio', 'zsh'],
  },
  {
    id: 'go-backend',
    name: 'Go Backend',
    emoji: '🐹',
    description: 'Golang microservices and API development',
    tags: ['Go', 'Docker', 'PostgreSQL'],
    packageIds: ['vscode', 'go', 'docker', 'postgresql', 'redis', 'git', 'curl', 'make', 'zsh', 'oh-my-zsh', 'jq'],
  },
  {
    id: 'java-enterprise',
    name: 'Java Enterprise',
    emoji: '☕',
    description: 'Spring Boot / enterprise Java environment',
    tags: ['Java', 'Maven', 'Spring'],
    packageIds: ['intellij', 'java', 'maven', 'gradle', 'docker', 'postgresql', 'git', 'curl', 'zsh'],
  },
  {
    id: 'minimal-setup',
    name: 'Minimal Essentials',
    emoji: '🔧',
    description: 'Just the must-haves for any new machine',
    tags: ['Git', 'Curl', 'Zsh'],
    packageIds: ['git', 'curl', 'wget', 'zsh', 'oh-my-zsh', 'htop', 'tmux', 'jq', 'vim'],
  },
];