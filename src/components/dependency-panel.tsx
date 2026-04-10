'use client';

import { Package } from '@/types';
import { dependencyWarnings, pairSuggestions } from '@/lib/suggestions';
import { appCatalog } from '@/lib/apps';
import { useStore } from '@/lib/store';
import { AlertTriangle, Lightbulb, Plus } from 'lucide-react';
import { useMemo } from 'react';

interface DependencyPanelProps {
  bucket: Package[];
  os: 'macos' | 'linux' | null;
}

export function DependencyPanel({ bucket, os }: DependencyPanelProps) {
  const { addToBucket } = useStore();
  const bucketIds = new Set(bucket.map((p) => p.id));

  const warnings = useMemo(() => {
    return dependencyWarnings.filter(
      (w) => bucketIds.has(w.if) && !bucketIds.has(w.needs)
    );
  }, [bucketIds]);

  const suggestions = useMemo(() => {
    const seen = new Set<string>();
    const result: { triggeredBy: string; suggestedId: string }[] = [];

    bucket.forEach((pkg) => {
      const pairs = pairSuggestions[pkg.id] ?? [];
      pairs.forEach((sugId) => {
        if (!bucketIds.has(sugId) && !seen.has(sugId)) {
          const sugPkg = appCatalog.find((p) => p.id === sugId);
          if (sugPkg && (!os || sugPkg.platforms[os])) {
            seen.add(sugId);
            result.push({ triggeredBy: pkg.name, suggestedId: sugId });
          }
        }
      });
    });

    return result.slice(0, 4);
  }, [bucket, bucketIds, os]);

  if (warnings.length === 0 && suggestions.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 space-y-2">
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
            <AlertTriangle className="w-4 h-4" />
            Dependency Warnings
          </div>
          <ul className="space-y-1">
            {warnings.map((w, i) => {
              const needsPkg = appCatalog.find((p) => p.id === w.needs);
              return (
                <li key={i} className="flex items-center justify-between text-sm text-yellow-300/80">
                  <span>{w.message}</span>
                  {needsPkg && (
                    <button
                      onClick={() => addToBucket({ ...needsPkg, selectedVersion: needsPkg.defaultVersion })}
                      className="ml-3 shrink-0 flex items-center gap-1 px-2 py-1 rounded border border-yellow-500/40
                        text-yellow-400 hover:bg-yellow-500/10 transition-colors text-xs"
                    >
                      <Plus className="w-3 h-3" />
                      Add {needsPkg.name}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2">
          <div className="flex items-center gap-2 terminal-text text-sm font-bold">
            <Lightbulb className="w-4 h-4" />
            Pairs Well With
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(({ triggeredBy, suggestedId }) => {
              const pkg = appCatalog.find((p) => p.id === suggestedId);
              if (!pkg) return null;
              return (
                <button
                  key={suggestedId}
                  onClick={() => addToBucket({ ...pkg, selectedVersion: pkg.defaultVersion })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30
                    text-sm hover:bg-primary/10 hover:border-primary/60 transition-all group"
                >
                  <Plus className="w-3 h-3 terminal-text" />
                  <span className="terminal-text">{pkg.name}</span>
                  <span className="text-muted-foreground text-xs">via {triggeredBy}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}