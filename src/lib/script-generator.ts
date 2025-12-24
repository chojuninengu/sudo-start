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

  // Step 2: OS Update Command
  lines.push('echo "================================================"');
  lines.push('echo "  SudoStart - System Setup Initialization"');
  lines.push('echo "================================================"');
  lines.push('echo ""');
  lines.push('');
  
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
  }
  
  lines.push('');

  // Step 3: Install packages
  if (packages.length > 0) {
    lines.push('echo ""');
    lines.push('echo "Installing packages..."');
    lines.push('echo ""');
    lines.push('');

    packages.forEach((pkg) => {
      const version = pkg.selectedVersion || '';
      const versionSuffix = version ? `@${version}` : '';
      
      lines.push(`# Installing ${pkg.name}${version ? ` (version ${version})` : ''}`);
      lines.push(`echo "→ Installing ${pkg.name}..."`);
      
      if (os === 'macos') {
        const installCmd = pkg.macosInstallCmd || `brew install ${pkg.id}${versionSuffix}`;
        lines.push(installCmd);
      } else if (os === 'linux') {
        const installCmd = pkg.linuxInstallCmd || `sudo apt-get install -y ${pkg.id}${versionSuffix}`;
        lines.push(installCmd);
      }
      
      lines.push('');
    });
  }

  // Step 4: Shell configuration
  lines.push('# Configure shell');
  lines.push(`echo "Configuring ${shell} as default shell..."`);
  
  const shellPaths: Record<Shell, string> = {
    bash: '/bin/bash',
    zsh: '/bin/zsh',
    fish: '/usr/bin/fish',
  };
  
  lines.push(`chsh -s ${shellPaths[shell]} 2>/dev/null || echo "Note: Shell change may require logout"`);
  lines.push('');

  // Step 5: Completion message
  lines.push('echo ""');
  lines.push('echo "================================================"');
  lines.push('echo "  System Ready. Welcome to your new machine!"');
  lines.push('echo "================================================"');
  lines.push('echo ""');
  lines.push(`echo "OS: ${os.toUpperCase()}"`);
  lines.push(`echo "Shell: ${shell}"`);
  lines.push(`echo "Packages installed: ${packages.length}"`);
  lines.push('echo ""');
  lines.push('echo "Enjoy coding! 🚀"');

  return lines.join('\n');
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
