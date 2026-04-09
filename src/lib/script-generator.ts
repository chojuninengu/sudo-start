import { OS, Shell, Package } from '@/types';
import { requiresFlatpak } from './apps';

export function generateScript(
  os: OS | null,
  shell: Shell | null,
  packages: Package[]
): string {
  if (!os || !shell) {
    return '# Please select an OS and Shell to generate a script';
  }

  const lines: string[] = [];

  lines.push('#!/bin/bash');
  lines.push('');
  lines.push('# SudoStart - Zero-to-Code OS Setup Script');
  lines.push(`# Generated for: ${os.toUpperCase()} (${shell})`);
  lines.push(`# Date: ${new Date().toISOString().split('T')[0]}`);
  lines.push('');
  lines.push('set -e  # Exit on error');
  lines.push('');
  lines.push('echo "================================================"');
  lines.push('echo "  SudoStart - System Setup Initialization"');
  lines.push('echo "================================================"');
  lines.push('echo ""');
  lines.push('');

  const needsFlatpak = os === 'linux' && packages.some(pkg => requiresFlatpak(pkg));

  if (os === 'macos') {
    lines.push('# Check if Homebrew is installed');
    lines.push('if ! command -v brew &> /dev/null; then');
    lines.push('    echo "Installing Homebrew..."');
    lines.push('    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
    lines.push('else');
    lines.push('    echo "Homebrew already installed. Updating..."');
    lines.push('    brew update');
    lines.push('fi');
  } else if (os === 'linux') {
    lines.push('echo "Updating package lists..."');
    lines.push('sudo apt-get update');
    lines.push('');

    if (needsFlatpak) {
      lines.push('# Install Flatpak (required for some packages)');
      lines.push('if ! command -v flatpak &> /dev/null; then');
      lines.push('    echo "Installing Flatpak..."');
      lines.push('    sudo apt-get install -y flatpak');
      lines.push('    sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo');
      lines.push('    echo "Note: You may need to restart your system for Flatpak to work properly"');
      lines.push('else');
      lines.push('    echo "Flatpak already installed"');
      lines.push('fi');
      lines.push('');
    }
  }

  lines.push('');

  if (packages.length > 0) {
    lines.push('echo ""');
    lines.push('echo "Installing packages..."');
    lines.push('echo ""');
    lines.push('');

    packages.forEach((pkg) => {
      const versionId = pkg.selectedVersion || pkg.defaultVersion;
      let version = pkg.versions.find(v => v.id === versionId);

      if (!version && versionId !== 'stable' && versionId !== 'latest') {
        const fallbackVersion = pkg.versions.find(v => v.id === 'stable' || v.id === 'latest') || pkg.versions[0];
        version = {
          id: versionId,
          label: versionId,
          macCommand: fallbackVersion?.macCommand || '',
          linuxCommand: fallbackVersion?.linuxCommand || '',
        };
      }

      if (!version) return;

      const checkCommand = getCheckCommand(pkg.id);
      lines.push(`# Installing ${pkg.name}${version.label !== 'Latest' && version.label !== 'Stable' ? ` (${version.label})` : ''}`);

      let installCmd = os === 'macos' ? version.macCommand : version.linuxCommand;

      const template = os === 'macos' ? pkg.macosCommandTemplate : pkg.linuxCommandTemplate;
      if (template && versionId !== 'latest' && versionId !== 'stable') {
        const v = versionId;
        const v_no_v = v.startsWith('v') ? v.substring(1) : v;
        const v_major = v_no_v.split('.')[0];
        installCmd = template
          .replaceAll('${VERSION}', v)
          .replaceAll('${VERSION_NO_V}', v_no_v)
          .replaceAll('${VERSION_MAJOR}', v_major);
      }

      if (installCmd.trim().startsWith('#')) {
        lines.push(`echo "⚠️  ${pkg.name} is not available on ${os.toUpperCase()}"`);
      } else if (checkCommand) {
        lines.push(`if ! command -v ${checkCommand} &> /dev/null; then`);
        lines.push(`    echo "→ Installing ${pkg.name}..."`);
        lines.push(`    ${installCmd}`);
        lines.push('else');
        lines.push(`    echo "✓ ${pkg.name} already installed, skipping."`);
        lines.push('fi');
      } else {
        lines.push(`echo "→ Installing ${pkg.name}..."`);
        lines.push(installCmd);
      }

      lines.push('');
    });
  }

  lines.push('echo ""');
  lines.push('echo "================================================"');
  lines.push('echo "  System Ready. Welcome to your new machine!"');
  lines.push('echo "================================================"');
  lines.push('echo ""');
  lines.push(`echo "OS: ${os.toUpperCase()}"`);
  lines.push(`echo "Shell: ${shell}"`);
  lines.push(`echo "Packages installed: ${packages.length}"`);
  lines.push('echo ""');

  if (needsFlatpak) {
    lines.push('echo "💡 Note: Some packages were installed via Flatpak"');
    lines.push('echo "   You may need to restart for Flatpak apps to appear in your menu"');
    lines.push('echo ""');
  }

  lines.push('echo "Enjoy coding! 🚀"');

  return lines.join('\n');
}

function getCheckCommand(pkgId: string): string | null {
  const checkCommands: Record<string, string> = {
    // IDEs
    'vscode': 'code',
    'cursor': 'cursor',
    'zed': 'zed',
    'vim': 'vim',
    'intellij': 'idea',

    // Languages & Runtimes
    'nvm': 'nvm',
    'nodejs': 'node',
    'npm': 'npm',
    'python3': 'python3',
    'ruby': 'ruby',
    'php': 'php',
    'kotlin': 'kotlinc',
    'rust': 'rustc',
    'go': 'go',
    'java': 'java',
    'cpp': 'g++',

    // Package Managers
    'pnpm': 'pnpm',
    'yarn': 'yarn',
    'pyenv': 'pyenv',
    'rbenv': 'rbenv',
    'sdkman': 'sdk',

    // Build Tools
    'make': 'make',
    'cmake': 'cmake',
    'gradle': 'gradle',
    'maven': 'mvn',

    // Containers
    'docker': 'docker',
    'docker-desktop': 'docker',
    'podman': 'podman',
    'kubectl': 'kubectl',
    'minikube': 'minikube',

    // Cloud CLIs
    'aws-cli': 'aws',
    'gcloud': 'gcloud',
    'azure-cli': 'az',

    // Tools
    'git': 'git',
    'curl': 'curl',
    'wget': 'wget',
    'jq': 'jq',
    'htop': 'htop',
    'tmux': 'tmux',
    'openssh': 'ssh',
    'ngrok': 'ngrok',
    'zsh': 'zsh',
    'oh-my-zsh': 'omz',
    'terraform': 'terraform',
    'ansible': 'ansible',
    'github-cli': 'gh',
    'postman': 'postman',
    'insomnia': 'insomnia',

    // Databases
    'postgresql': 'psql',
    'mysql': 'mysql',
    'mariadb': 'mariadb',
    'sqlite3': 'sqlite3',
    'redis': 'redis-cli',
    'mongodb': 'mongosh',

    // Terminals
    'warp': 'warp-terminal',
    'alacritty': 'alacritty',
    'kitty': 'kitty',
    'hyper': 'hyper',
    'ghostty': 'ghostty',

    // Communication
    'zoom': 'zoom',
    'telegram': 'telegram-desktop',

    // Productivity
    'bitwarden': 'bitwarden',
    'raycast': 'raycast',

    // Mobile
    'flutter': 'flutter',
  };

  return checkCommands[pkgId] || null;
}

export function downloadScript(script: string, filename: string = 'sudo-start-setup.sh') {
  const blob = new Blob([script], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}