'use client';

import { useStore } from '@/lib/store';
import { appCatalog, getAppsForOS } from '@/lib/apps';
import { MessageSquare, ShoppingCart, Terminal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BucketModal } from './bucket-modal';

const categoryIcons: Record<string, string> = {
    all: '🗂️',
    ide: '📝',
    browser: '🌐',
    tool: '🔧',
    runtime: '⚙️',
    container: '📦',
    database: '💾',
    terminal: '💻',
};

interface NavbarProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function Navbar({ selectedCategory, onCategoryChange }: NavbarProps) {
    const { os, bucket, toggleChat } = useStore();
    const [isBucketOpen, setIsBucketOpen] = useState(false);

    // Get available categories based on OS
    const availableApps = useMemo(() => {
        if (!os) return appCatalog;
        return getAppsForOS(os);
    }, [os]);

    const categories = ['all', ...Array.from(new Set(availableApps.map((p) => p.category)))];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-3">
                            <Terminal className="w-8 h-8 terminal-text" />
                            <div>
                                <h1 className="text-xl font-bold terminal-text">SudoStart</h1>
                                <p className="text-xs text-muted-foreground">
                                    {os?.toUpperCase()} Package Manager
                                </p>
                            </div>
                        </div>

                        {/* Category Filters */}
                        <div className="hidden md:flex gap-2 flex-wrap flex-1 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => onCategoryChange(cat)}
                                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all capitalize ${selectedCategory === cat
                                            ? 'border-primary terminal-glow bg-primary/10 terminal-text'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    {categoryIcons[cat] || '📁'} {cat}
                                </button>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Bucket Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsBucketOpen(!isBucketOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-border
                                        hover:border-primary/50 transition-all terminal-card"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="hidden sm:inline">Bucket</span>
                                    {bucket.length > 0 && (
                                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary 
                                            text-primary-foreground text-xs font-bold flex items-center justify-center
                                            terminal-glow">
                                            {bucket.length}
                                        </span>
                                    )}
                                </button>

                                {/* Bucket Modal */}
                                {isBucketOpen && (
                                    <BucketModal onClose={() => setIsBucketOpen(false)} />
                                )}
                            </div>

                            {/* AI Chat Button */}
                            <button
                                onClick={toggleChat}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary
                                    terminal-text hover:terminal-glow transition-all"
                            >
                                <MessageSquare className="w-5 h-5" />
                                <span className="hidden sm:inline">Ask Root</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Category Filters */}
                    <div className="md:hidden flex gap-2 flex-wrap mt-4 pt-4 border-t border-border">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`px-3 py-1.5 rounded-lg border text-sm transition-all capitalize ${selectedCategory === cat
                                        ? 'border-primary terminal-glow bg-primary/10 terminal-text'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                {categoryIcons[cat] || '📁'} {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-24 md:h-20" />
        </>
    );
}
