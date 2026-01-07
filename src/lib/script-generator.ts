import { OS, Shell, Package } from '@/types';

/**
 * Generates a bash script based on the selected OS, shell, and packages
 */
export function generateScript(
  os: OS | null,
  shell: Shell | null,
  packages: Package[]
): string {
  if (!os || !shell) {
    return '# Please select an OS and Shell to generate a script';
  }

  const lines: string[] = [];

  // Step 1: Shebang
  lines.push('#!/bin/bash');
  lines.push('');
  lines.push('# SudoStart - Zero-to-Code OS Setup Script');
  lines.push(`# Generated for: ${os.toUpperCase()} (${shell})`);
  lines.push(`# Date: ${new Date().toISOString().split('T')[0]}`);
  lines.push('');
  lines.push('set -e  # Exit on error');
  lines.push('');

  // Step 2: Header
  lines.push('echo "================================================"');
  lines.push('echo "  SudoStart - System Setup Initialization"');
  lines.push('echo "================================================"');
  lines.push('echo ""');
  lines.push('');

  // Step 3: Dependency Detection & Installation
  const needsFlatpak = os === 'linux' && packages.some(pkg => requiresFlatpak(pkg));
  const needsSnap = os === 'linux' && packages.some(pkg => requiresSnap(pkg));

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
    lines.push('sudo apt-get update -y');
    lines.push('sudo apt-get upgrade -y');
    lines.push('');

    // Install flatpak if needed
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

    // Install snap if needed
    if (needsSnap) {
      lines.push('# Install Snap (required for some packages)');
      lines.push('if ! command -v snap &> /dev/null; then');
      lines.push('    echo "Installing Snap..."');
      lines.push('    sudo apt-get install -y snapd');
      lines.push('    sudo systemctl enable --now snapd.socket');
      lines.push('else');
      lines.push('    echo "Snap already installed"');
      lines.push('fi');
      lines.push('');
    }
  }

  lines.push('');

  // Step 4: Install packages
  if (packages.length > 0) {
    lines.push('echo ""');
    lines.push('echo "Installing packages..."');
    lines.push('echo ""');
    lines.push('');

    packages.forEach((pkg) => {
      // Get the selected version or use default
      const versionId = pkg.selectedVersion || pkg.defaultVersion;
      const version = pkg.versions.find(v => v.id === versionId);
      
      if (!version) return;

      // Determine the command to check for existence
      const checkCommand = getCheckCommand(pkg.id);

      lines.push(`# Installing ${pkg.name}${version.label !== 'Latest' && version.label !== 'Stable' ? ` (${version.label})` : ''}`);
      
      // Use platform-specific command from the version
      const installCmd = os === 'macos' ? version.macCommand : version.linuxCommand;
      
      // Skip if command is a comment (e.g., Arc on Linux)
      if (installCmd.trim().startsWith('#')) {
        lines.push(`echo "⚠️  ${pkg.name} is not available on ${os.toUpperCase()}"`);
      } else if (checkCommand) {
        // Add existence check
        lines.push(`if ! command -v ${checkCommand} &> /dev/null; then`);
        lines.push(`    echo "→ Installing ${pkg.name}..."`);
        lines.push(`    ${installCmd}`);
        lines.push('else');
        lines.push(`    echo "✓ ${pkg.name} already installed, skipping."`);
        lines.push('fi');
      } else {
        // No check available, just install
        lines.push(`echo "→ Installing ${pkg.name}..."`);
        lines.push(installCmd);
      }

      lines.push('');
    });
  }

  // Step 5: Shell configuration
  lines.push('# Configure shell');
  lines.push(`echo "Configuring ${shell} as default shell..."`);

  const shellPaths: Record<Shell, string> = {
    bash: '/bin/bash',
    zsh: '/bin/zsh',
    fish: '/usr/bin/fish',
  };

  lines.push(`chsh -s ${shellPaths[shell]} 2>/dev/null || echo "Note: Shell change may require logout"`);
  lines.push('');

  // Step 6: Completion message
  lines.push('echo ""');
  lines.push('echo "================================================"');
  lines.push('echo "  System Ready. Welcome to your new machine!"');
  lines.push('echo "================================================"');
  lines.push('echo ""');
  lines.push(`echo "OS: ${os.toUpperCase()}"`);
  lines.push(`echo "Shell: ${shell}"`);
  lines.push(`echo "Packages installed: ${packages.length}"`);
  lines.push('echo ""');
  
  if (needsFlatpak || needsSnap) {
    lines.push('echo "💡 Note: Some packages were installed via Flatpak/Snap"');
    if (needsFlatpak) {
      lines.push('echo "   You may need to restart for Flatpak apps to appear in your menu"');
    }
    lines.push('echo ""');
  }
  
  lines.push('echo "Enjoy coding! 🚀"');

  return lines.join('\n');
}

/**
 * Check if a package requires flatpak on Linux
 */
function requiresFlatpak(pkg: Package): boolean {
  return pkg.versions.some((v) => v.linuxCommand.includes('flatpak'));
}

/**
 * Check if a package requires snap on Linux
 */
function requiresSnap(pkg: Package): boolean {
  return pkg.versions.some((v) => v.linuxCommand.includes('snap'));
}

/**
 * Get the CLI command name to check if a package is installed
 * Returns null if no reliable check is available
 */
function getCheckCommand(pkgId: string): string | null {
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

/**
 * Download the script as a .sh file
 */
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
