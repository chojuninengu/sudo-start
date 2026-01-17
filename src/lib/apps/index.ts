import { Package } from '@/types';
import { ideApps } from './ides';
import { browserApps } from './browsers';
import { runtimeApps } from './runtimes';
import { toolApps } from './tools';
import { containerApps } from './containers';
import { databaseApps } from './databases';
import { terminalApps } from './terminals';
import { frameworkApps } from './frameworks';
import { devopsApps } from './devops';
import { dataScienceApps } from './data-science';
import { mobileApps } from './mobile';
import { gameDevApps } from './game-dev';
import { desktopDevApps } from './desktop-dev';
import { webServerApps } from './web-servers';

export const appCatalog: Package[] = [
  ...ideApps,
  ...browserApps,
  ...runtimeApps,
  ...toolApps,
  ...containerApps,
  ...databaseApps,
  ...terminalApps,
  ...frameworkApps,
  ...devopsApps,
  ...dataScienceApps,
  ...mobileApps,
  ...gameDevApps,
  ...desktopDevApps,
  ...webServerApps,
];

/**
 * Helper function to get apps that are available for a specific OS
 */
export function getAppsForOS(os: 'macos' | 'linux'): Package[] {
  return appCatalog.filter((app) => app.platforms[os]);
}

/**
 * Helper function to get apps by category
 */
export function getAppsByCategory(category: string): Package[] {
  return appCatalog.filter((app) => app.category === category);
}

/**
 * Check if an app requires flatpak on Linux
 */
export function requiresFlatpak(pkg: Package): boolean {
  return pkg.versions.some((v) => v.linuxCommand.includes('flatpak'));
}

/**
 * Get a default set of popular applications
 */
export function getDefaultApps(): Package[] {
    const defaultAppIds = [
        'vscode',
        'cursor',
        'google-chrome',
        'git',
        'curl',
        'nodejs',
        'python3',
        'docker',
        'postgresql',
    ];
    return appCatalog.filter((app) => defaultAppIds.includes(app.id));
}
