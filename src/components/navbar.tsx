'use client';

import { useStore } from '@/lib/store';
import { useTheme } from '@/lib/theme-context';
import { MessageSquare, ShoppingCart, Terminal, Search, Layers, Upload, Download as DownloadIcon, Sun, Moon } from 'lucide-react';
import { useState, useRef } from 'react';
import { BucketModal } from './bucket-modal';
import { SearchBar } from './search-bar';
import { PresetsModal } from './presets-modal';

export function Navbar() {
  const { os, bucket, toggleChat, exportBucket, importBucket } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [isBucketOpen, setIsBucketOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [importError, setImportError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const success = importBucket(ev.target?.result as string);
      if (!success) {
        setImportError(true);
        setTimeout(() => setImportError(false), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useState(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  });

  return (
    <>
      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
      {isPresetsOpen && <PresetsModal onClose={() => setIsPresetsOpen(false)} />}

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
        title="Import presets file"
        aria-label="Import presets file"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <Terminal className="w-7 h-7 terminal-text" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold terminal-text leading-tight">SudoStart</h1>
                <p className="text-xs text-muted-foreground leading-tight">
                  {os?.toUpperCase() ?? 'Package'} Manager
                </p>
              </div>
            </div>

            {/* Search Bar (desktop) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex flex-4 max-w-sm items-center gap-3 px-6 py-2 rounded-lg bg-muted border border-border hover:border-primary/50 transition-all text-muted-foreground text-sm font-mono"
            >

              
              <Search className="w-4 h-4 shrink-0" />
              <span>Search packages...</span>
              <kbd className="ml-auto px-1.5 py-0.5 text-xs rounded border border-border">⌘K</kbd>
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search (mobile) */}
              <button
                type="button"
                title="Search packages"
                aria-label="Search packages"
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Presets */}
              <button
                type="button"
                onClick={() => setIsPresetsOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border
                  hover:border-primary/50 transition-all text-sm"
                title="Starter presets"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden lg:inline">Presets</span>
              </button>

              {/* Import */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all text-sm ${
                  importError
                    ? 'border-destructive text-destructive'
                    : 'border-border hover:border-primary/50'
                }`}
                title="Import bucket from JSON"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden lg:inline">{importError ? 'Invalid JSON' : 'Import'}</span>
              </button>

              {/* Export */}
              <button
                type="button"
                onClick={exportBucket}
                disabled={bucket.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border
                  hover:border-primary/50 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                title="Export bucket as JSON"
              >
                <DownloadIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Export</span>
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border
                  hover:border-primary/50 transition-all text-sm"
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Moon className="w-4 h-4 terminal-text" />
                )}
                <span className="hidden lg:inline text-muted-foreground">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </button>

              {/* Bucket */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsBucketOpen(!isBucketOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-border
                    hover:border-primary/50 transition-all terminal-card"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Bucket</span>
                  {bucket.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary
                      text-primary-foreground text-xs font-bold flex items-center justify-center terminal-glow">
                      {bucket.length}
                    </span>
                  )}
                </button>
                {isBucketOpen && <BucketModal onClose={() => setIsBucketOpen(false)} />}
              </div>

              {/* AI Chat */}
              <button
                type="button"
                onClick={toggleChat}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-primary
                  terminal-text hover:terminal-glow transition-all text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Root AI</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-[60px]" />
    </>
  );
}