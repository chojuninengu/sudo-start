'use client';

import { useStore } from '@/lib/store';
import { X, Trash2, Package } from 'lucide-react';

interface BucketModalProps {
    onClose: () => void;
}

export function BucketModal({ onClose }: BucketModalProps) {
    const { bucket, removeFromBucket, clearBucket, setCurrentStep } = useStore();

    const handleGenerateScript = () => {
        onClose();
        setCurrentStep('output');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="absolute right-0 top-full mt-2 w-80 max-h-96
                terminal-card rounded-lg shadow-2xl z-50 border border-border flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-card">
                    <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 terminal-text" />
                        <span className="font-bold">Your Bucket</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 terminal-text">
                            {bucket.length}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-accent rounded transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {bucket.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">
                            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Your bucket is empty</p>
                            <p className="text-sm mt-1">Add some tools to get started!</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-border">
                            {bucket.map((pkg) => (
                                <li key={pkg.id} className="flex items-center justify-between p-3 hover:bg-accent/50">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{pkg.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Version: {(() => {
                                                const v = pkg.selectedVersion || pkg.defaultVersion;
                                                if (v === 'stable' || v === 'latest') return 'Stable';
                                                return v.startsWith('v') ? v : 'v' + v;
                                            })()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromBucket(pkg.id)}
                                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors ml-2"
                                        title="Remove from bucket"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border bg-card space-y-2">
                    {bucket.length > 0 && (
                        <>
                            <button
                                onClick={handleGenerateScript}
                                className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground
                                    font-medium hover:bg-primary/90 transition-all terminal-glow"
                            >
                                Generate Script →
                            </button>
                            <button
                                onClick={clearBucket}
                                className="w-full py-2 px-4 rounded-lg border border-destructive text-destructive
                                    hover:bg-destructive/10 transition-all text-sm"
                            >
                                Clear All
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
