import { Package } from '@/types';

export const databaseApps: Package[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: '💾 Advanced open-source relational database',
    category: 'database',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install postgresql',
        linuxCommand: 'sudo apt-get install -y postgresql postgresql-contrib',
      },
    ],
  },
  {
    id: 'redis',
    name: 'Redis',
    description: '🧠 In-memory data structure store',
    category: 'database',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install redis',
        linuxCommand: 'sudo apt-get install -y redis-server',
      },
    ],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: '🍃 NoSQL document database',
    category: 'database',
    platforms: { macos: true, linux: true },
    defaultVersion: 'latest',
    versions: [
      {
        id: 'latest',
        label: 'Latest',
        macCommand: 'brew install mongodb-community',
        linuxCommand: 'sudo apt-get install -y gnupg curl && curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg && echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") /mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list && sudo apt-get update && sudo apt-get install -y mongodb-org',
      },
    ],
  },
];
