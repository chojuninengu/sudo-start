import { Package } from '@/types';

export const frameworkApps: Package[] = [
  {
    id: 'react',
    name: 'React (via Vite)',
    description: '⚛️ The most popular frontend library',
    category: 'framework',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'npm install -g create-vite',
        linuxCommand: 'npm install -g create-vite',
      },
    ],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: '🖖 The progressive JavaScript framework',
    category: 'framework',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'npm install -g @vue/cli',
        linuxCommand: 'npm install -g @vue/cli',
      },
    ],
  },
  {
    id: 'angular',
    name: 'Angular',
    description: '🅰️ Platform for building mobile & desktop web apps',
    category: 'framework',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'npm install -g @angular/cli',
        linuxCommand: 'npm install -g @angular/cli',
      },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: '▲ The React framework for the web',
    category: 'framework',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'npm install -g create-next-app',
        linuxCommand: 'npm install -g create-next-app',
      },
    ],
  },
  {
    id: 'django',
    name: 'Django',
    description: '🎸 High-level Python web framework',
    category: 'framework',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'pip3 install Django',
        linuxCommand: 'pip3 install Django',
      },
    ],
  },
  {
    id: 'flask',
    name: 'Flask',
    description: '🧪 Lightweight Python web framework',
    category: 'framework',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'pip3 install Flask',
        linuxCommand: 'pip3 install Flask',
      },
    ],
  },
  {
    id: 'express',
    name: 'Express',
    description: '🚂 Fast, unopinionated web framework for Node.js',
    category: 'framework',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'npm install -g express-generator',
        linuxCommand: 'npm install -g express-generator',
      },
    ],
  },
];
