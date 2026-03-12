'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { appCatalog } from '@/lib/apps';
import { Package } from '@/types';

interface SearchResult {
  id: string;
  type: 'package' | 'category';
  title: string;
  description: string;
  category?: string;
  package?: Package;
}

export function SearchBar() {
  const { setCurrentStep, os } = useStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  // Get all available apps based on OS
  const availableApps = useMemo(() => {
    if (!os) return appCatalog;
    return appCatalog.filter(app => app.platforms[os]);
  }, [os]);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(availableApps.map(app => app.category)));
  }, [availableApps]);

  // Search function using useMemo for performance
  const searchResults = useMemo(() => {
    // Clear results if query is empty
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search packages
    availableApps.forEach(pkg => {
      const nameMatch = pkg.name.toLowerCase().includes(searchTerm);
      const descMatch = pkg.description.toLowerCase().includes(searchTerm);
      const categoryMatch = pkg.category.toLowerCase().includes(searchTerm);

      if (nameMatch || descMatch || categoryMatch) {
        results.push({
          id: `pkg-${pkg.id}`,
          type: 'package',
          title: pkg.name,
          description: pkg.description,
          category: pkg.category,
          package: pkg
        });
      }
    });

    // Search categories
    categories.forEach(category => {
      if (category.toLowerCase().includes(searchTerm)) {
        const categoryApps = availableApps.filter(app => app.category === category);
        const description = `${categoryApps.length} packages available`;
        
        results.push({
          id: `cat-${category}`,
          type: 'category',
          title: category,
          description
        });
      }
    });

    // Sort results: exact matches first, then partial matches
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase() === searchTerm;
      const bExact = b.title.toLowerCase() === searchTerm;
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      return a.title.localeCompare(b.title);
    });

    return results.slice(0, 10); // Limit to 10 results
  }, [query, availableApps, categories]);

  // Update results when searchResults changes
  useEffect(() => {
    setResults(searchResults);
  }, [searchResults]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'category') {
      // Navigate to category
      setCurrentStep('catalog');
      // Store category to filter after navigation
      setTimeout(() => {
        const categoryButton = document.querySelector(`[data-category="${result.title}"]`);
        if (categoryButton) {
          categoryButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else if (result.type === 'package' && result.package) {
      // Navigate to package
      setCurrentStep('catalog');
      // Scroll to package after navigation
      setTimeout(() => {
        const packageElement = document.querySelector(`[data-package-id="${result.package?.id}"]`);
        if (packageElement) {
          packageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add highlight effect
          packageElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
          setTimeout(() => {
            packageElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
          }, 2000);
        }
      }, 100);
    }
    
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search packages, categories..."
          className="w-full pl-10 pr-10 py-2 rounded-lg bg-input border border-border
                   text-foreground placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            title="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">
                      {result.type === 'category' ? (
                        <span className="capitalize">{result.title}</span>
                      ) : (
                        result.title
                      )}
                    </h4>
                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      {result.type === 'category' ? 'Category' : 'Package'}
                    </span>
                    {result.category && result.type === 'package' && (
                      <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary capitalize">
                        {result.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-50 p-4">
          <p className="text-muted-foreground text-center">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}