import { OS, Package } from '@/types';
import { getCheckCommand } from './utils';

export function generateBrowserScript(os: OS, packages: Package[]): string {
    const browserPackages = packages.filter((pkg) => pkg.category === 'browser');
    if (browserPackages.length === 0) {
        return '';
    }

    const lines: string[] = [];
    lines.push('echo ""');
    lines.push('echo "Installing Browsers..."');
    lines.push('echo ""');

    browserPackages.forEach((pkg) => {
        const versionId = pkg.selectedVersion || pkg.defaultVersion;
        const version = pkg.versions.find((v) => v.id === versionId);

        if (!version) return;

        const checkCommand = getCheckCommand(pkg.id);
        const installCmd = os === 'macos' ? version.macCommand : version.linuxCommand;

        lines.push(`# Installing ${pkg.name}${version.label !== 'Latest' && version.label !== 'Stable' ? ` (${version.label})` : ''}`);

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

    return lines.join('\n');
}
