'use client';

import { useStore } from '@/lib/store';
import { MessageSquare, ShoppingCart, Terminal, Search } from 'lucide-react';
import { useState } from 'react';
import { BucketModal } from './bucket-modal';
import { SearchBar } from './search-bar';

export function Navbar() {
    const { os, bucket, toggleChat } = useStore();
    const [isBucketOpen, setIsBucketOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}

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

                        {/* Search Bar (desktop) */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:flex flex-1 max-w-sm items-center gap-3 px-4 py-2 rounded-lg
                                bg-muted border border-border hover:border-primary/50 transition-all
                                text-muted-foreground text-sm font-mono"
                        >
                            <Search className="w-4 h-4 shrink-0" />
                            <span>Search packages...</span>
                            <kbd className="ml-auto px-1.5 py-0.5 text-xs rounded border border-border">⌘K</kbd>
                        </button>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Search icon (mobile) */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-border
                                    hover:border-primary/50 transition-all"
                                title="Search packages"
                            >
                                <Search className="w-5 h-5" />
                            </button>

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
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-20" />
        </>
    );
}