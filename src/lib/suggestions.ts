/** Packages that pair well together */
export const pairSuggestions: Record<string, string[]> = {
  docker: ['kubectl', 'minikube', 'docker-compose', 'podman'],
  nodejs: ['pnpm', 'nvm', 'github-cli'],
  nvm: ['nodejs', 'pnpm', 'yarn'],
  python3: ['pyenv', 'jupyter', 'pandas'],
  rust: ['zed', 'make', 'cmake'],
  go: ['make', 'docker', 'postgresql'],
  postgresql: ['redis', 'docker'],
  react: ['nextjs', 'nodejs', 'vscode'],
  flutter: ['xcode', 'git'],
  terraform: ['aws-cli', 'ansible', 'docker'],
  zsh: ['oh-my-zsh', 'tmux'],
  vscode: ['git', 'github-cli'],
  cursor: ['git', 'github-cli', 'nodejs'],
};

/** If you have package A, you should probably also have package B */
export const dependencyWarnings: Array<{
  if: string;
  needs: string;
  message: string;
}> = [
  { if: 'react', needs: 'nodejs', message: 'React requires Node.js to run.' },
  { if: 'nextjs', needs: 'nodejs', message: 'Next.js requires Node.js.' },
  { if: 'angular', needs: 'nodejs', message: 'Angular CLI requires Node.js.' },
  { if: 'vue', needs: 'nodejs', message: 'Vue CLI requires Node.js.' },
  { if: 'express', needs: 'nodejs', message: 'Express runs on Node.js.' },
  { if: 'flutter', needs: 'git', message: 'Flutter SDK requires Git.' },
  { if: 'oh-my-zsh', needs: 'zsh', message: 'Oh My Zsh requires Zsh to be installed first.' },
  { if: 'jupyter', needs: 'python3', message: 'JupyterLab requires Python 3.' },
  { if: 'tensorflow', needs: 'python3', message: 'TensorFlow requires Python 3.' },
  { if: 'pandas', needs: 'python3', message: 'Pandas requires Python 3.' },
  { if: 'numpy', needs: 'python3', message: 'NumPy requires Python 3.' },
  { if: 'matplotlib', needs: 'python3', message: 'Matplotlib requires Python 3.' },
  { if: 'ansible', needs: 'python3', message: 'Ansible requires Python 3.' },
  { if: 'gradle', needs: 'java', message: 'Gradle requires a Java JDK.' },
  { if: 'maven', needs: 'java', message: 'Maven requires a Java JDK.' },
  { if: 'kotlin', needs: 'java', message: 'Kotlin needs a JVM (Java) to run.' },
  { if: 'minikube', needs: 'kubectl', message: 'Minikube works best alongside kubectl.' },
  { if: 'minikube', needs: 'docker', message: 'Minikube needs a container runtime like Docker.' },
  { if: 'electron', needs: 'nodejs', message: 'Electron requires Node.js.' },
  { if: 'tauri', needs: 'rust', message: 'Tauri is built with Rust.' },
  { if: 'react-native', needs: 'nodejs', message: 'React Native requires Node.js.' },
];