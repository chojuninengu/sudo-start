'use client';

import { useStore } from '@/lib/store';
import { packageCatalog } from '@/lib/packages';
import { Package } from '@/types';
import { Plus, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categoryIcons: Record<string, string> = {
    ide: '📝',
    browser: '🌐',
    tool: '🔧',
    runtime: '⚙️',
    container: '📦',
    database: '💾',
};

export function PackageManager() {
    const { bucket, addToBucket, toggleChat, setCurrentStep } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(packageCatalog.map((p) => p.category)))];
    const filteredPackages =
        selectedCategory === 'all'
            ? packageCatalog
            : packageCatalog.filter((p) => p.category === selectedCategory);

    const isInBucket = (pkg: Package) => bucket.some((p) => p.id === pkg.id);

    const handleAddToBucket = (pkg: Package) => {
        addToBucket({ ...pkg });
    };

    return (
        <div className="min-h-screen p-6 scan-lines relative">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold terminal-text">Package Manager</h1>
                        <p className="text-muted-foreground mt-2">
                            Select tools to install on your system
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
                            className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${selectedCategory === cat
                                    ? 'border-primary terminal-glow bg-primary/10 terminal-text'
                                    : 'border-border hover:border-primary/50'
                                }`}
                        >
                            {cat === 'all' ? '🗂️ All' : `${categoryIcons[cat]} ${cat}`}
                        </button>
                    ))}
                </div>

                {/* Package Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPackages.map((pkg) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
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
    isInBucket,
    onAddToBucket,
}: {
    pkg: Package;
    isInBucket: boolean;
    onAddToBucket: (pkg: Package) => void;
}) {
    const [selectedVersion, setSelectedVersion] = useState(pkg.selectedVersion || pkg.versions?.[0]);

    const handleAdd = () => {
        const packageToAdd = {
            ...pkg,
            selectedVersion: selectedVersion,
        };
        onAddToBucket(packageToAdd);
    };

    return (
        <div className="terminal-card rounded-lg p-5 space-y-4 hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-xl font-bold terminal-text">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded border border-border capitalize">
                        {categoryIcons[pkg.category]} {pkg.category}
                    </span>
                </div>
            </div>

            {/* Version Selector */}
            {pkg.versions && pkg.versions.length > 0 && (
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Version:</label>
                    <div className="relative">
                        <select
                            value={selectedVersion}
                            onChange={(e) => setSelectedVersion(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-input border border-border
                       text-foreground appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-ring"
                            disabled={isInBucket}
                        >
                            {pkg.versions.map((version) => (
                                <option key={version} value={version}>
                                    v{version}
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
                disabled={isInBucket}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2
          ${isInBucket
                        ? 'bg-primary/20 text-primary cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90 terminal-glow'
                    }`}
            >
                {isInBucket ? (
                    <>
                        <Check className="w-4 h-4" />
                        Added to Root
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
