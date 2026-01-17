import { Package } from '@/types';

export const devopsApps: Package[] = [
  {
    id: 'jenkins',
    name: 'Jenkins',
    description: '👷 Open-source automation server',
    category: 'devops',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install jenkins-lts',
        linuxCommand: 'wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo gpg --dearmor -o /usr/share/keyrings/jenkins.gpg && echo "deb [signed-by=/usr/share/keyrings/jenkins.gpg] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null && sudo apt-get update && sudo apt-get install -y jenkins',
      },
    ],
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    description: '📊 Monitoring system and time series database',
    category: 'devops',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install prometheus',
        linuxCommand: 'sudo apt-get install -y prometheus',
      },
    ],
  },
  {
    id: 'docker-compose',
    name: 'Docker Compose',
    description: '🐙 Define and run multi-container applications',
    category: 'devops',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install docker-compose',
        linuxCommand: 'sudo apt-get install -y docker-compose-plugin',
      },
    ],
  },
];
