'use client';

import { useStore } from '@/lib/store';
import { generateScript, downloadScript } from '@/lib/script-generator';
import { Download, Copy, Check, ChevronLeft, Link2, Terminal, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function ScriptOutput() {
    const { os, shell, bucket, setCurrentStep, clearBucket } = useStore();
    const [script, setScript] = useState('');
    const [copied, setCopied] = useState(false);
    const [curlCopied, setCurlCopied] = useState(false);
    const [curlUrl, setCurlUrl] = useState<string | null>(null);
    const [curlLoading, setCurlLoading] = useState(false);
    const [curlError, setCurlError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'script' | 'curl'>('script');

    useEffect(() => {
        const generatedScript = generateScript(os, shell, bucket);
        setScript(generatedScript);
    }, [os, shell, bucket]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        downloadScript(script);
    };

    const handleGenerateCurlUrl = async () => {
        setCurlLoading(true);
        setCurlError(null);
        setCurlUrl(null);

        try {
            const response = await fetch('/api/script-share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    script,
                    os,
                    packages: bucket.map((p) => p.name),
                }),
            });

            if (!response.ok) throw new Error('Failed to generate URL');

            const { id } = await response.json();
            const base = window.location.origin;
            setCurlUrl(`${base}/api/script-share?id=${id}`);
            setActiveTab('curl');
        } catch (err) {
            setCurlError('Failed to generate curl URL. Please try again.');
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

    const handleReset = () => {
        clearBucket();
        setCurrentStep('boot');
    };

    return (
        <div className="min-h-screen p-6 scan-lines relative">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold terminal-text">Script Generated</h1>
                        <p className="text-muted-foreground mt-2">
                            Your custom setup script is ready
                        </p>
                    </div>
                    <button
                        onClick={() => setCurrentStep('catalog')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-border
                     hover:border-primary/50 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Catalog
                    </button>
                </div>

                {/* Summary Card */}
                <div className="terminal-card rounded-lg p-6 space-y-4">
                    <h2 className="text-xl font-bold terminal-text">Configuration Summary</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Operating System</p>
                            <p className="text-lg font-bold terminal-text capitalize">{os}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Shell</p>
                            <p className="text-lg font-bold terminal-text capitalize">{shell}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Packages</p>
                            <p className="text-lg font-bold terminal-text">{bucket.length} tools</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Selected Packages:</p>
                        <div className="flex flex-wrap gap-2">
                            {bucket.map((pkg) => (
                                <span
                                    key={pkg.id}
                                    className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm"
                                >
                                    {pkg.name}
                                    {pkg.selectedVersion && pkg.selectedVersion !== 'stable' && pkg.selectedVersion !== 'latest' && ` ${pkg.selectedVersion.startsWith('v') ? pkg.selectedVersion : 'v' + pkg.selectedVersion}`}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('script')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-mono ${
                            activeTab === 'script'
                                ? 'border-primary terminal-text bg-primary/10'
                                : 'border-border hover:border-primary/50'
                        }`}
                    >
                        <Terminal className="w-4 h-4" />
                        Script
                    </button>
                    <button
                        onClick={() => setActiveTab('curl')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-mono ${
                            activeTab === 'curl'
                                ? 'border-primary terminal-text bg-primary/10'
                                : 'border-border hover:border-primary/50'
                        }`}
                    >
                        <Link2 className="w-4 h-4" />
                        Curl URL
                        {curlUrl && <span className="w-2 h-2 rounded-full bg-primary terminal-glow" />}
                    </button>
                </div>

                {/* Script Tab */}
                {activeTab === 'script' && (
                    <div className="terminal-card rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-card border-b border-border">
                            <h3 className="font-bold terminal-text font-mono">sudo-start-setup.sh</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted
                             hover:bg-muted/80 transition-all text-sm"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4 terminal-text" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary
                             text-primary-foreground hover:bg-primary/90 transition-all terminal-glow text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download .sh</span>
                                </button>
                            </div>
                        </div>

                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <SyntaxHighlighter
                                language="bash"
                                style={vscDarkPlus}
                                customStyle={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    background: 'var(--terminal-bg)',
                                    fontSize: '0.875rem',
                                }}
                                showLineNumbers
                            >
                                {script}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                )}

                {/* Curl URL Tab */}
                {activeTab === 'curl' && (
                    <div className="terminal-card rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold terminal-text mb-1">One-liner Curl URL</h3>
                                <p className="text-sm text-muted-foreground">
                                    Generate a shareable URL to run your setup script directly from any terminal.
                                    The link expires after 24 hours.
                                </p>
                            </div>

                            {!curlUrl ? (
                                <div className="space-y-4">
                                    {/* Preview of what the command looks like */}
                                    <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm">
                                        <span className="text-muted-foreground">$ </span>
                                        <span className="terminal-text">bash</span>
                                        <span className="text-muted-foreground"> &lt;(</span>
                                        <span className="terminal-text">curl</span>
                                        <span className="text-muted-foreground"> -fsSL </span>
                                        <span className="text-yellow-400/70 italic">"https://your-url.com/api/script-share?id=xxxxxxxx"</span>
                                        <span className="text-muted-foreground">)</span>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="p-4 rounded-lg border border-border bg-card space-y-2">
                                            <p className="text-sm font-medium terminal-text">⚠️ Security note</p>
                                            <p className="text-xs text-muted-foreground">
                                                Always review scripts before running them. The generated URL serves your exact script — piping directly into bash is powerful but should be done with caution on untrusted machines.
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleGenerateCurlUrl}
                                            disabled={curlLoading}
                                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                                                bg-primary text-primary-foreground hover:bg-primary/90 transition-all
                                                terminal-glow disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                                        >
                                            {curlLoading ? (
                                                <>
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                    Generating URL...
                                                </>
                                            ) : (
                                                <>
                                                    <Link2 className="w-4 h-4" />
                                                    Generate Curl URL
                                                </>
                                            )}
                                        </button>

                                        {curlError && (
                                            <p className="text-sm text-destructive text-center">{curlError}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Success state */}
                                    <div className="p-1 rounded-lg border border-primary/50 bg-primary/5">
                                        <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/20 text-xs text-muted-foreground font-mono">
                                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            <span>URL generated — expires in 24h</span>
                                            <button
                                                onClick={handleGenerateCurlUrl}
                                                disabled={curlLoading}
                                                className="ml-auto flex items-center gap-1 hover:text-foreground transition-colors"
                                                title="Regenerate URL"
                                            >
                                                <RefreshCw className={`w-3 h-3 ${curlLoading ? 'animate-spin' : ''}`} />
                                                Regenerate
                                            </button>
                                        </div>

                                        {/* The one-liner command */}
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
                                        <button
                                            onClick={handleCopyCurl}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary
                                                text-primary-foreground hover:bg-primary/90 transition-all terminal-glow text-sm font-mono"
                                        >
                                            {curlCopied ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy One-liner
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(curlUrl);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted
                                                hover:bg-muted/80 transition-all text-sm font-mono"
                                        >
                                            <Link2 className="w-4 h-4" />
                                            Copy URL only
                                        </button>
                                    </div>

                                    {/* Alternative commands */}
                                    <div className="space-y-2">
                                        <p className="text-xs text-muted-foreground font-mono">Alternative commands:</p>
                                        <div className="space-y-2">
                                            {[
                                                {
                                                    label: 'wget',
                                                    cmd: `bash <(wget -qO- "${curlUrl}")`,
                                                },
                                                {
                                                    label: 'curl + sh',
                                                    cmd: `curl -fsSL "${curlUrl}" | bash`,
                                                },
                                                {
                                                    label: 'Download only',
                                                    cmd: `curl -fsSL "${curlUrl}" -o setup.sh`,
                                                },
                                            ].map(({ label, cmd }) => (
                                                <div key={label} className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border group">
                                                    <code className="flex-1 text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors break-all">
                                                        {cmd}
                                                    </code>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(cmd)}
                                                        className="shrink-0 p-1.5 rounded hover:bg-accent transition-colors"
                                                        title="Copy"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 rounded-lg border-2 border-destructive text-destructive
                     hover:bg-destructive/10 transition-all"
                    >
                        Start Over
                    </button>
                    <div className="text-sm text-muted-foreground">
                        <p>
                            💡 Tip: Make the script executable with{' '}
                            <code className="px-2 py-1 rounded bg-muted terminal-text">
                                chmod +x sudo-start-setup.sh
                            </code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
