'use client';

import { useStore } from '@/lib/store';
import { generateScript, downloadScript } from '@/lib/script-generator';
import { Download, Copy, Check, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function ScriptOutput() {
    const { os, shell, bucket, setCurrentStep, clearBucket } = useStore();
    const [script, setScript] = useState('');
    const [copied, setCopied] = useState(false);

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
                                    {pkg.selectedVersion && ` ${pkg.selectedVersion.startsWith('v') ? pkg.selectedVersion : 'v' + pkg.selectedVersion}`}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Script Display */}
                <div className="terminal-card rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
                        <h3 className="font-bold terminal-text">sudo-start-setup.sh</h3>
                        <div className="flex gap-2">
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
                        </div>
                    </div>

                    <div className="max-h-[600px] overflow-y-auto">
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
