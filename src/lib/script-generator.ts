import { OS, Shell, Package } from '@/types';
import { generateIdeScript } from './script-generators/ide';
import { generateBrowserScript } from './script-generators/browser';
import { generateToolScript } from './script-generators/tool';
import { generateRuntimeScript } from './script-generators/runtime';
import { generateDatabaseScript } from './script-generators/database';
import { generateContainerScript } from './script-generators/container';
import { generateTerminalScript } from './script-generators/terminal';
import { requiresFlatpak, requiresSnap } from './script-generators/utils';

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
    lines.push(generateIdeScript(os, packages));
    lines.push(generateBrowserScript(os, packages));
    lines.push(generateToolScript(os, packages));
    lines.push(generateRuntimeScript(os, packages));
    lines.push(generateDatabaseScript(os, packages));
    lines.push(generateContainerScript(os, packages));
    lines.push(generateTerminalScript(os, packages));
  }

  // Skip shell configuration for faster execution

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
