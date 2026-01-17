import { Package } from '@/types';

export const containerApps: Package[] = [
  {
    id: 'docker',
    name: 'Docker',
    description: '📦 Platform for containerized applications',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install --cask docker',
        linuxCommand: 'sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg && sudo install -m 0755 -d /etc/apt/keyrings && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && sudo chmod a+r /etc/apt/keyrings/docker.gpg && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin',
      },
    ],
  },
  {
    id: 'podman',
    name: 'Podman',
    description: '🦭 Daemonless container engine',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install podman',
        linuxCommand: 'sudo apt-get install -y podman',
      },
    ],
  },
  {
    id: 'kubectl',
    name: 'Kubectl',
    description: '☸️ Kubernetes command-line tool',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install kubectl',
        linuxCommand: 'K8S_VERSION=$(curl -L -s https://dl.k8s.io/release/stable.txt) && curl -LO "https://dl.k8s.io/release/${K8S_VERSION}/bin/linux/amd64/kubectl" && sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && rm kubectl',
      },
    ],
    linuxCommandTemplate: 'curl -LO "https://dl.k8s.io/release/${VERSION}/bin/linux/amd64/kubectl" && sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl',
    macosCommandTemplate: 'brew install kubectl',
  },
  {
    id: 'minikube',
    name: 'Minikube',
    description: '🏝️ Local Kubernetes environment',
    category: 'container',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install minikube',
        linuxCommand: 'curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64',
      },
    ],
    linuxCommandTemplate: 'curl -LO https://github.com/kubernetes/minikube/releases/download/${VERSION}/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube',
    macosCommandTemplate: 'brew install minikube',
  },
];
