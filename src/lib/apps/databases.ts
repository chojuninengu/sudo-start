import { Package } from '@/types';

export const databaseApps: Package[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: '💾 Advanced open-source relational database',
    category: 'database',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install postgresql',
        linuxCommand: 'sudo apt-get install -y postgresql postgresql-contrib',
      },
    ],
    linuxCommandTemplate: 'sudo apt-get install -y postgresql-${VERSION_MAJOR} postgresql-contrib',
    macosCommandTemplate: 'brew install postgresql@${VERSION_MAJOR}',
  },
  {
    id: 'redis',
    name: 'Redis',
    description: '🧠 In-memory data structure store',
    category: 'database',
    platforms: { macos: true, linux: true },
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
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
    defaultVersion: 'stable',
    versions: [
      {
        id: 'stable',
        label: 'Stable',
        macCommand: 'brew install mongodb-community',
        linuxCommand: 'sudo apt-get install -y gnupg curl && curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg && echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") /mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list && sudo apt-get update && sudo apt-get install -y mongodb-org',
      },
    ],
    linuxCommandTemplate: 'wget -qO - https://www.mongodb.org/static/pgp/server-${VERSION_MAJOR}.0.asc | sudo apt-key add - && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/${VERSION_MAJOR}.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-${VERSION_MAJOR}.0.list && sudo apt-get update && sudo apt-get install -y mongodb-org=${VERSION_NO_V}',
    macosCommandTemplate: 'brew tap mongodb/brew && brew install mongodb-community@${VERSION_MAJOR}',
  },
];
