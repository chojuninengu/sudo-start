'use client';

import { useStore } from '@/lib/store';
import { appCatalog, getAppsForOS } from '@/lib/apps';
import { Package } from '@/types';
import { Search, X, Plus, Check } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';

const categoryIcons: Record<string, string> = {
  ide: '📝',
  browser: '🌐',
  tool: '🔧',
  runtime: '⚙️',
  container: '📦',
  database: '💾',
  terminal: '💻',
  framework: '🧱',
  devops: '♾️',
  'data-science': '🧪',
  mobile: '📱',
  'game-dev': '🎮',
  'desktop-dev': '🖥️',
  'web-server': '🌍',
  'package-manager': '📌',
  'build-tool': '🔨',
  cloud: '☁️',
  utility: '🛠️',
  communication: '💬',
  productivity: '🚀',
};

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const { os, bucket, addToBucket, removeFromBucket } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const availableApps = useMemo(() => {
    if (!os) return appCatalog;
    return getAppsForOS(os);
  }, [os]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return availableApps
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, availableApps]);

  // Suggestions when no query
  const suggestions = useMemo(() => {
    if (query.trim()) return [];
    const popular = ['git', 'vscode', 'nodejs', 'docker', 'python3', 'rust', 'cursor', 'zsh'];
    return availableApps.filter((p) => popular.includes(p.id)).slice(0, 6);
  }, [query, availableApps]);

  const isInBucket = (pkg: Package) => bucket.some((p) => p.id === pkg.id);

  const handleToggle = (pkg: Package) => {
    if (isInBucket(pkg)) {
      removeFromBucket(pkg.id);
    } else {
      addToBucket({ ...pkg, selectedVersion: pkg.defaultVersion });
    }
  };

  const displayItems = query.trim() ? results : suggestions;
  const showingSuggestions = !query.trim();

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div
        ref={containerRef}
        className="w-full max-w-2xl terminal-card rounded-xl overflow-hidden shadow-2xl"
        style={{ boxShadow: '0 0 40px rgba(0, 255, 128, 0.2), 0 0 80px rgba(0, 255, 128, 0.05)' }}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="w-5 h-5 terminal-text shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages, tools, runtimes..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-lg focus:outline-none font-mono"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex py-1 text-xs rounded border border-border text-muted-foreground font-mono">ESC</kbd>
            <button
              onClick={onClose}
              className="p-1 hover:bg-accent rounded transition-colors"
              title="Close search"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[420px] overflow-y-auto">
          {displayItems.length > 0 && (
            <div>
              <div className="px-5 py-2 text-xs text-muted-foreground font-mono border-b border-border/50">
                {showingSuggestions ? '⚡ Popular packages' : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
              </div>
              <ul>
                {displayItems.map((pkg) => {
                  const inBucket = isInBucket(pkg);
                  return (
                    <li key={pkg.id}>
                      <button
                        onClick={() => handleToggle(pkg)}
                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-accent/50 transition-colors text-left group"
                      >
                        <span className="text-xl w-8 text-center shrink-0">
                          {categoryIcons[pkg.category] || '📁'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold terminal-text">{pkg.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground capitalize hidden sm:inline">
                              {pkg.category.replace('-', ' ')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{pkg.description}</p>
                        </div>
                        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          inBucket
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted group-hover:bg-primary/20 group-hover:text-primary'
                        }`}>
                          {inBucket ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="px-5 py-10 text-center text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-mono">No packages found for <span className="terminal-text">&quot;{query}&quot;</span></p>
              <p className="text-sm mt-1">Try searching by category or tool name</p>
            </div>
          )}

          {!query.trim() && suggestions.length === 0 && (
            <div className="px-5 py-10 text-center text-muted-foreground">
              <p className="font-mono text-sm">Start typing to search packages...</p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-border bg-card/50 flex items-center gap-4 text-xs text-muted-foreground font-mono">
          <span><kbd className="px-1.5 py-0.5 rounded border border-border">↵</kbd> to add/remove</span>
          <span><kbd className="px-1.5 py-0.5 rounded border border-border">ESC</kbd> to close</span>
          <span className="ml-auto">{bucket.length} in bucket</span>
        </div>
      </div>
    </div>
  );
}