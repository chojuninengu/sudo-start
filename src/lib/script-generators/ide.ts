import { OS, Package } from '@/types';
import { getCheckCommand } from './utils';

export function generateIdeScript(os: OS, packages: Package[]): string {
    const idePackages = packages.filter((pkg) => pkg.category === 'ide');
    if (idePackages.length === 0) {
        return '';
    }

    const lines: string[] = [];
    lines.push('echo ""');
    lines.push('echo "Installing IDEs..."');
    lines.push('echo ""');

    idePackages.forEach((pkg) => {
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
