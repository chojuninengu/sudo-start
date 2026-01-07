'use client';

import { useStore } from '@/lib/store';
import { appCatalog, getAppsForOS } from '@/lib/apps';
import { Package } from '@/types';
import { Plus, Check, ChevronDown, AlertCircle } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Navbar } from './navbar';

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
    const { os, bucket, addToBucket } = useStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Filter apps based on selected OS platform
    const availableApps = useMemo(() => {
        if (!os) return appCatalog;
        return getAppsForOS(os);
    }, [os]);

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
        <div className="min-h-screen scan-lines relative">
            {/* Fixed Navbar */}
            <Navbar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
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

                {/* Empty State */}
                {filteredPackages.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No packages found in this category.</p>
                    </div>
                )}
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
    const [dynamicVersions, setDynamicVersions] = useState<string[]>([]);
    const [isLoadingVersions, setIsLoadingVersions] = useState(false);

    // Tools that support dynamic version fetching
    const dynamicVersionTools = ['nodejs', 'python3', 'rust', 'go', 'docker'];
    const supportsDynamicVersions = dynamicVersionTools.includes(pkg.id);

    // Fetch dynamic versions for supported tools
    useEffect(() => {
        if (!supportsDynamicVersions) return;

        const fetchVersions = async () => {
            setIsLoadingVersions(true);
            try {
                const toolId = pkg.id === 'python3' ? 'python' : pkg.id;
                const response = await fetch(`/api/versions?tool=${toolId}`);
                const data = await response.json();

                if (data.versions && data.versions.length > 0) {
                    setDynamicVersions(data.versions);
                    setSelectedVersion(data.versions[0]); // Select latest by default
                }
            } catch (error) {
                console.error('Failed to fetch versions:', error);
            } finally {
                setIsLoadingVersions(false);
            }
        };

        fetchVersions();
    }, [pkg.id, supportsDynamicVersions]);

    const handleAdd = () => {
        onAddToBucket(pkg, selectedVersion);
    };

    // Check if app is available for current OS
    const isAvailable = os ? pkg.platforms[os] : true;

    // Determine which versions to show
    const versionsToShow = supportsDynamicVersions && dynamicVersions.length > 0
        ? dynamicVersions.map(v => ({ id: v, label: v }))
        : pkg.versions.map(v => ({ id: v.id, label: v.label }));

    return (
        <div className={`terminal-card rounded-lg p-5 space-y-4 transition-all ${isAvailable ? 'hover:border-primary/50' : 'opacity-60'
            }`}>
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
            {(versionsToShow.length > 1 || supportsDynamicVersions) && (
                <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                        Version:
                        {isLoadingVersions && (
                            <span className="text-xs terminal-text animate-pulse">fetching...</span>
                        )}
                    </label>
                    <div className="relative">
                        <select
                            value={selectedVersion}
                            onChange={(e) => setSelectedVersion(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-input border border-border
                       text-foreground appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-ring"
                            disabled={isInBucket || !isAvailable || isLoadingVersions}
                        >
                            {versionsToShow.map((version) => (
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
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2
          ${isInBucket
                        ? 'bg-primary/20 text-primary cursor-not-allowed'
                        : !isAvailable
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90 terminal-glow'
                    }`}
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
