'use client';

import { useStore } from '@/lib/store';
import {
  generateScript,
  generateBrewfile,
  downloadScript,
  estimateInstallTime,
  estimateDiskSpace,
} from '@/lib/script-generator';
import {
  Download, Copy, Check, ChevronLeft, Link2, Terminal,
  RefreshCw, Clock, HardDrive, Package, FileText,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Tab = 'script' | 'brewfile' | 'curl';

export function ScriptOutput() {
  const { os, shell, bucket, setCurrentStep, clearBucket } = useStore();
  const [script, setScript] = useState('');
  const [brewfile, setBrewfile] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('script');
  const [copied, setCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);
  const [curlUrl, setCurlUrl] = useState<string | null>(null);
  const [curlLoading, setCurlLoading] = useState(false);
  const [curlError, setCurlError] = useState<string | null>(null);

  useEffect(() => {
    setScript(generateScript(os, shell, bucket));
    if (os === 'macos') setBrewfile(generateBrewfile(bucket));
  }, [os, shell, bucket]);

  const estTime = estimateInstallTime(bucket);
  const estDisk = estimateDiskSpace(bucket);
  const diskLabel = estDisk >= 1000 ? `${(estDisk / 1000).toFixed(1)} GB` : `${estDisk} MB`;

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCurlUrl = async () => {
    setCurlLoading(true);
    setCurlError(null);
    try {
      const res = await fetch('/api/script-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script, os, packages: bucket.map((p) => p.name) }),
      });
      if (!res.ok) throw new Error();
      const { id } = await res.json();
      setCurlUrl(`${window.location.origin}/api/script-share?id=${id}`);
      setActiveTab('curl');
    } catch {
      setCurlError('Failed to generate URL. Please try again.');
    } finally {
      setCurlLoading(false);
    }
  };

  const handleCopyCurl = async () => {
    if (!curlUrl) return;
    await navigator.clipboard.writeText(`bash <(curl -fsSL "${curlUrl}")`);
    setCurlCopied(true);
    setTimeout(() => setCurlCopied(false), 2000);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; macOnly?: boolean }[] = [
    { id: 'script', label: 'Bash Script', icon: <Terminal className="w-4 h-4" /> },
    { id: 'brewfile', label: 'Brewfile', icon: <FileText className="w-4 h-4" />, macOnly: true },
    { id: 'curl', label: 'Curl URL', icon: <Link2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen p-6 scan-lines relative">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold terminal-text">Setup Script</h1>
            <p className="text-muted-foreground mt-1">Your custom environment is ready to deploy</p>
          </div>
          <button
            onClick={() => setCurrentStep('catalog')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-border hover:border-primary/50 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Summary */}
        <div className="terminal-card rounded-lg p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold terminal-text">{bucket.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Packages</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold terminal-text capitalize">{os}</p>
              <p className="text-xs text-muted-foreground mt-0.5">OS</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 terminal-text" />
                <p className="text-2xl font-bold terminal-text">~{estTime}m</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Install time</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50 flex flex-col items-center">
              <div className="flex items-center gap-1">
                <HardDrive className="w-4 h-4 terminal-text" />
                <p className="text-2xl font-bold terminal-text">~{diskLabel}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Disk space</p>
            </div>
          </div>

          {/* Package chips */}
          <div className="flex flex-wrap gap-2">
            {bucket.map((pkg) => {
              const v = pkg.selectedVersion || pkg.defaultVersion;
              const isGeneric = ['stable', 'latest', 'fnm', 'deb', 'appimage'].includes(v);
              return (
                <span key={pkg.id} className="px-2 py-1 rounded-lg bg-primary/15 text-primary text-xs font-mono">
                  {pkg.name}{!isGeneric ? ` ${v.startsWith('v') ? v : 'v' + v}` : ''}
                </span>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => {
            if (tab.macOnly && os !== 'macos') return null;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-mono ${
                  activeTab === tab.id
                    ? 'border-primary terminal-text bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.id === 'curl' && curlUrl && (
                  <span className="w-2 h-2 rounded-full bg-primary terminal-glow" />
                )}
              </button>
            );
          })}
        </div>

        {/* Script Tab */}
        {activeTab === 'script' && (
          <div className="terminal-card rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-card border-b border-border">
              <span className="font-bold terminal-text font-mono text-sm">sudo-start-setup.sh</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(script)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-all text-sm"
                >
                  {copied ? <><Check className="w-4 h-4 terminal-text" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
                <button
                  onClick={() => downloadScript(script)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all terminal-glow text-sm"
                >
                  <Download className="w-4 h-4" /> Download .sh
                </button>
                <button
                  onClick={handleGenerateCurlUrl}
                  disabled={curlLoading}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/50 terminal-text hover:bg-primary/10 transition-all text-sm"
                >
                  {curlLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                  Curl URL
                </button>
              </div>
            </div>
            <div style={{ maxHeight: '520px', overflowY: 'auto' }}>
              <SyntaxHighlighter
                language="bash"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1.25rem', background: 'var(--terminal-bg)', fontSize: '0.8rem' }}
                showLineNumbers
              >
                {script}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* Brewfile Tab */}
        {activeTab === 'brewfile' && os === 'macos' && (
          <div className="terminal-card rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-card border-b border-border">
              <div>
                <span className="font-bold terminal-text font-mono text-sm">Brewfile</span>
                <span className="ml-3 text-xs text-muted-foreground">Run with: <code className="terminal-text">brew bundle</code></span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(brewfile)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-all text-sm"
                >
                  {copied ? <><Check className="w-4 h-4 terminal-text" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
                <button
                  onClick={() => downloadScript(brewfile, 'Brewfile')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all terminal-glow text-sm"
                >
                  <Download className="w-4 h-4" /> Download Brewfile
                </button>
              </div>
            </div>
            <div style={{ maxHeight: '520px', overflowY: 'auto' }}>
              <SyntaxHighlighter
                language="ruby"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1.25rem', background: 'var(--terminal-bg)', fontSize: '0.8rem' }}
                showLineNumbers
              >
                {brewfile}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {/* Curl URL Tab */}
        {activeTab === 'curl' && (
          <div className="terminal-card rounded-lg p-6 space-y-5">
            <div>
              <h3 className="text-lg font-bold terminal-text mb-1">One-liner Curl URL</h3>
              <p className="text-sm text-muted-foreground">
                Shareable link to run your script from any terminal. Expires in 24 hours.
              </p>
            </div>

            {!curlUrl ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 border border-border font-mono text-sm text-muted-foreground">
                  $ bash &lt;(curl -fsSL <span className="italic">"https://…/api/script-share?id=xxxxxxxx"</span>)
                </div>
                <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 text-xs text-yellow-300/80 space-y-1">
                  <p className="font-bold text-yellow-400">⚠️ Security reminder</p>
                  <p>Always review scripts before piping them into bash. The URL serves exactly the script shown in the Script tab.</p>
                </div>
                <button
                  onClick={handleGenerateCurlUrl}
                  disabled={curlLoading}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground
                    hover:bg-primary/90 transition-all terminal-glow disabled:opacity-50 font-mono text-sm"
                >
                  {curlLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Link2 className="w-4 h-4" /> Generate Curl URL</>}
                </button>
                {curlError && <p className="text-sm text-destructive">{curlError}</p>}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-1 rounded-lg border border-primary/40 bg-primary/5">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/20 text-xs text-muted-foreground font-mono">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    URL active — expires in 24h
                    <button onClick={handleGenerateCurlUrl} disabled={curlLoading}
                      className="ml-auto flex items-center gap-1 hover:text-foreground transition-colors">
                      <RefreshCw className={`w-3 h-3 ${curlLoading ? 'animate-spin' : ''}`} />
                      Regenerate
                    </button>
                  </div>
                  <div className="p-4 font-mono text-sm break-all">
                    <span className="text-muted-foreground">$ </span>
                    <span className="terminal-text">bash</span>
                    <span className="text-muted-foreground"> &lt;(</span>
                    <span className="terminal-text">curl</span>
                    <span className="text-muted-foreground"> -fsSL </span>
                    <span className="text-yellow-400">"{curlUrl}"</span>
                    <span className="text-muted-foreground">)</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button onClick={handleCopyCurl}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all terminal-glow text-sm font-mono">
                    {curlCopied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy One-liner</>}
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(curlUrl)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-all text-sm font-mono">
                    <Link2 className="w-4 h-4" /> Copy URL only
                  </button>
                </div>

                {/* Alternatives */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-mono">Alternative commands:</p>
                  {[
                    { label: 'wget', cmd: `bash <(wget -qO- "${curlUrl}")` },
                    { label: 'pipe to bash', cmd: `curl -fsSL "${curlUrl}" | bash` },
                    { label: 'download only', cmd: `curl -fsSL "${curlUrl}" -o setup.sh` },
                  ].map(({ label, cmd }) => (
                    <div key={label} className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border group">
                      <code className="flex-1 text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors break-all">
                        {cmd}
                      </code>
                      <button onClick={() => navigator.clipboard.writeText(cmd)}
                        className="shrink-0 p-1.5 rounded hover:bg-accent transition-colors">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center">
          <button onClick={() => { clearBucket(); setCurrentStep('boot'); }}
            className="px-6 py-3 rounded-lg border-2 border-destructive text-destructive hover:bg-destructive/10 transition-all">
            Start Over
          </button>
          <p className="text-sm text-muted-foreground">
            💡 <code className="px-2 py-0.5 rounded bg-muted terminal-text">chmod +x sudo-start-setup.sh && ./sudo-start-setup.sh</code>
          </p>
        </div>
      </div>
    </div>
  );
}