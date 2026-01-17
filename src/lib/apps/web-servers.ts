import { Package } from '@/types';

export const webServerApps: Package[] = [
  {
    id: 'nginx',
    name: 'Nginx',
    description: '🌐 High-performance HTTP server and reverse proxy',
    category: 'web-server',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install nginx',
        linuxCommand: 'sudo apt-get install -y nginx',
      },
    ],
  },
  {
    id: 'apache',
    name: 'Apache',
    description: '📜 The most widely used web server software',
    category: 'web-server',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install httpd',
        linuxCommand: 'sudo apt-get install -y apache2',
      },
    ],
  },
];
