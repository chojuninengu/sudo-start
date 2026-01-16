import { Package } from '@/types';

/**
 * Check if a package requires flatpak on Linux
 */
export function requiresFlatpak(pkg: Package): boolean {
  return pkg.versions.some((v) => v.linuxCommand.includes('flatpak'));
}

/**
 * Check if a package requires snap on Linux
 */
export function requiresSnap(pkg: Package): boolean {
  return pkg.versions.some((v) => v.linuxCommand.includes('snap'));
}

/**
 * Get the CLI command name to check if a package is installed
 * Returns null if no reliable check is available
 */
export function getCheckCommand(pkgId: string): string | null {
  const checkCommands: Record<string, string> = {
    // IDEs
    'vscode': 'code',
    'cursor': 'cursor',
    'zed': 'zed',
    'vim': 'vim',

    // Browsers (usually not CLI accessible, skip check)

    // Languages & Runtimes
    'nodejs': 'node',
    'python3': 'python3',
    'rust': 'rustc',
    'go': 'go',
    'java': 'java',
    'cpp': 'g++',

    // Containers
    'docker': 'docker',
    'podman': 'podman',
    'kubectl': 'kubectl',
    'minikube': 'minikube',

    // Tools
    'git': 'git',
    'curl': 'curl',
    'terraform': 'terraform',
    'ansible': 'ansible',

    // Databases
    'postgresql': 'psql',
  };

  return checkCommands[pkgId] || null;
}
