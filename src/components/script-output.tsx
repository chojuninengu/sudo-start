'use client';

import { useStore } from '@/lib/store';
import { generateScript, downloadScript } from '@/lib/script-generator';
import { Download, Copy, Check, ChevronLeft, Terminal, Link } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function ScriptOutput() {
    const { os, shell, bucket, setCurrentStep, clearBucket } = useStore();
    const [script, setScript] = useState('');
    const [copied, setCopied] = useState(false);
    const [executionUrl, setExecutionUrl] = useState('');
    const [urlCopied, setUrlCopied] = useState(false);
    const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);

    useEffect(() => {
        // Generate script when dependencies change
        const generatedScript = generateScript(os, shell, bucket);
        setScript(generatedScript);
    }, [os, shell, bucket]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(script);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for browsers that don't support the Clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = script;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        downloadScript(script);
    };

    const handleGenerateUrl = async () => {
        setIsGeneratingUrl(true);
        try {
            const response = await fetch('/api/script', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ os, shell, packages: bucket }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setExecutionUrl(data.executionUrl);
        } catch (error) {
            console.error('Error generating execution URL:', error);
            alert('Failed to generate execution URL. Please try again.');
        } finally {
            setIsGeneratingUrl(false);
        }
    };

    const handleCopyUrl = async () => {
        if (executionUrl) {
            const curlCommand = `curl -sSL ${executionUrl} | bash`;
            try {
                await navigator.clipboard.writeText(curlCommand);
                setUrlCopied(true);
                setTimeout(() => setUrlCopied(false), 2000);
            } catch {
                // Fallback for browsers that don't support the Clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = curlCommand;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setUrlCopied(true);
                setTimeout(() => setUrlCopied(false), 2000);
            }
        }
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

                    {/* Package List */}
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

                {/* Script Display */}
                <div className="terminal-card rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
                        <h3 className="font-bold terminal-text">sudo-start-setup.sh</h3>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted
                         hover:bg-muted/80 transition-all"
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
                         text-primary-foreground hover:bg-primary/90 transition-all terminal-glow"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download .sh</span>
                            </button>
                            <button
                                onClick={handleGenerateUrl}
                                disabled={isGeneratingUrl}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary
                         text-secondary-foreground hover:bg-secondary/80 transition-all disabled:opacity-50"
                            >
                                {isGeneratingUrl ? (
                                    <>
                                        <Terminal className="w-4 h-4 animate-pulse" />
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Link className="w-4 h-4" />
                                        <span>Direct Execute</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="max-h-150 overflow-y-auto">
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

                {/* Execution URL Section */}
                {executionUrl && (
                    <div className="terminal-card rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-bold terminal-text flex items-center gap-2">
                            <Link className="w-5 h-5" />
                            Direct Execution URL
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Use this URL to execute the script directly with curl:
                        </p>
                        <div className="bg-muted rounded-lg p-4">
                            <code className="text-sm break-all">
                                curl -sSL {executionUrl} | bash
                            </code>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyUrl}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary
                         text-primary-foreground hover:bg-primary/90 transition-all"
                            >
                                {urlCopied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        <span>URL Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        <span>Copy Command</span>
                                    </>
                                )}
                            </button>
                            <a
                                href={executionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary
                         text-secondary-foreground hover:bg-secondary/80 transition-all"
                            >
                                <Terminal className="w-4 h-4" />
                                <span>View Script</span>
                            </a>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            ⚠️ Always review scripts before executing them. This URL will expire in 24 hours.
                        </p>
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
