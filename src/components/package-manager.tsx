```
'use client';

import { useStore } from '@/lib/store';
import { appCatalog, getAppsForOS } from '@/lib/apps';
import { Package } from '@/types';
import { Plus, Check, ChevronDown, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';

const categoryIcons: Record<string, string> = {
    ide: '📝',
    browser: '🌐',
    tool: '🔧',
    runtime: '⚙️',
    container: '📦',
    database: '💾',
    terminal: '💻',
};

export function PackageManager() {
    const { os, bucket, addToBucket, toggleChat, setCurrentStep } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Filter apps based on selected OS platform
    const availableApps = useMemo(() => {
        if (!os) return appCatalog;
        return getAppsForOS(os);
    }, [os]);

    const categories = ['all', ...Array.from(new Set(availableApps.map((p) => p.category)))];
    const filteredPackages =
        selectedCategory === 'all'
            ? availableApps
            : availableApps.filter((p) => p.category === selectedCategory);

    const isInBucket = (pkg: Package) => bucket.some((p) => p.id === pkg.id);

    const handleAddToBucket = (pkg: Package, versionId: string) => {
        const version = pkg.versions.find((v) => v.id === versionId);
        if (!version) return;

        addToBucket({
            ...pkg,
            selectedVersion: versionId,
        });
    };

    return (
        <div className="min-h-screen p-6 scan-lines relative">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold terminal-text">Package Manager</h1>
                        <p className="text-muted-foreground mt-2">
                            Select tools to install on your {os?.toUpperCase()} system
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleChat}
                            className="px-6 py-3 rounded-lg border-2 border-primary terminal-text
                       hover:terminal-glow transition-all"
                        >
                            💬 Ask Root
                        </button>
                        <div className="terminal-card px-4 py-3 rounded-lg">
                            <span className="text-sm text-muted-foreground">Bucket:</span>
                            <span className="ml-2 text-lg font-bold terminal-text">{bucket.length}</span>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px - 4 py - 2 rounded - lg border - 2 transition - all capitalize ${
    selectedCategory === cat
        ? 'border-primary terminal-glow bg-primary/10 terminal-text'
        : 'border-border hover:border-primary/50'
} `}
                        >
                            {cat === 'all' ? '🗂️ All' : `${ categoryIcons[cat] } ${ cat } `}
                        </button>
                    ))}
                </div>

                {/* Package Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPackages.map((pkg) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            os={os}
                            isInBucket={isInBucket(pkg)}
                            onAddToBucket={handleAddToBucket}
                        />
                    ))}
                </div>

                {/* Bottom Actions */}
                <div className="fixed bottom-6 right-6 flex gap-4">
                    {bucket.length > 0 && (
                        <button
                            onClick={() => setCurrentStep('output')}
                            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold
                       hover:bg-primary/90 transition-all terminal-glow shadow-lg"
                        >
                            Generate Script ({bucket.length} packages) →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function PackageCard({
    pkg,
    os,
    isInBucket,
    onAddToBucket,
}: {
    pkg: Package;
    os: 'macos' | 'linux' | null;
    isInBucket: boolean;
    onAddToBucket: (pkg: Package, versionId: string) => void;
}) {
    const [selectedVersion, setSelectedVersion] = useState(pkg.defaultVersion);

    const handleAdd = () => {
        onAddToBucket(pkg, selectedVersion);
    };

    // Check if app is available for current OS
    const isAvailable = os ? pkg.platforms[os] : true;

    return (
        <div className={`terminal - card rounded - lg p - 5 space - y - 4 transition - all ${
    isAvailable ? 'hover:border-primary/50' : 'opacity-60'
} `}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold terminal-text">{pkg.name}</h3>
                        {!isAvailable && (
                            <span className="text-xs px-2 py-1 rounded bg-destructive/20 text-destructive border border-destructive flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {os === 'linux' ? 'Mac Only' : 'Linux Only'}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded border border-border capitalize">
                        {categoryIcons[pkg.category]} {pkg.category}
                    </span>
                </div>
            </div>

            {/* Version Selector */}
            {pkg.versions && pkg.versions.length > 1 && (
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Version:</label>
                    <div className="relative">
                        <select
                            value={selectedVersion}
                            onChange={(e) => setSelectedVersion(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-input border border-border
                       text-foreground appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-ring"
                            disabled={isInBucket || !isAvailable}
                        >
                            {pkg.versions.map((version) => (
                                <option key={version.id} value={version.id}>
                                    {version.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                    </div>
                </div>
            )}

            {/* Add Button */}
            <button
                onClick={handleAdd}
                disabled={isInBucket || !isAvailable}
                className={`w - full py - 2 px - 4 rounded - lg font - medium transition - all flex items - center justify - center gap - 2
          ${
    isInBucket
        ? 'bg-primary/20 text-primary cursor-not-allowed'
        : !isAvailable
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-primary text-primary-foreground hover:bg-primary/90 terminal-glow'
} `}
            >
                {isInBucket ? (
                    <>
                        <Check className="w-4 h-4" />
                        Added to Root
                    </>
                ) : !isAvailable ? (
                    <>
                        <AlertCircle className="w-4 h-4" />
                        Not Available on {os?.toUpperCase()}
                    </>
                ) : (
                    <>
                        <Plus className="w-4 h-4" />
                        Add to Root
                    </>
                )}
            </button>
        </div>
    );
}
