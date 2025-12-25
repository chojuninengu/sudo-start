'use client';

import { useStore } from '@/lib/store';
import { OS, Shell } from '@/types';
import { Terminal } from 'lucide-react';
import { useState } from 'react';

export function BootScreen() {
    const { setOS, setShell, setCurrentStep } = useStore();
    const [selectedOS, setSelectedOS] = useState<OS | null>(null);
    const [selectedShell, setSelectedShell] = useState<Shell | null>(null);

    const handleContinue = () => {
        if (selectedOS && selectedShell) {
            setOS(selectedOS);
            setShell(selectedShell);
            setCurrentStep('catalog');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 scan-lines relative">
            <div className="max-w-3xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <Terminal className="w-12 h-12 terminal-text" />
                        <h1 className="text-5xl font-bold terminal-text">SudoStart</h1>
                    </div>
                    <p className="text-xl text-muted-foreground">
                        Zero-to-Code OS Setup Generator
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <span className="terminal-text">$</span>
                        <span>Powered by Root AI</span>
                        <span className="cursor-blink terminal-text">▊</span>
                    </div>
                </div>

                {/* Boot Questions */}
                <div className="terminal-card rounded-lg p-8 space-y-8">
                    {/* Question 1: OS Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="terminal-text">root@sudostart:~$</span>
                            <p className="text-lg font-medium">Select your Kernel:</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-8">
                            <button
                                onClick={() => setSelectedOS('macos')}
                                className={`p-6 rounded-lg border-2 transition-all ${selectedOS === 'macos'
                                        ? 'border-primary terminal-glow bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold terminal-text">MacOS</h3>
                                    <p className="text-sm text-muted-foreground">Homebrew</p>
                                </div>
                            </button>
                            <button
                                onClick={() => setSelectedOS('linux')}
                                className={`p-6 rounded-lg border-2 transition-all ${selectedOS === 'linux'
                                        ? 'border-primary terminal-glow bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold terminal-text">Linux</h3>
                                    <p className="text-sm text-muted-foreground">Apt</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Question 2: Shell Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="terminal-text">root@sudostart:~$</span>
                            <p className="text-lg font-medium">Select your Shell:</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pl-8">
                            {(['bash', 'zsh', 'fish'] as Shell[]).map((shell) => (
                                <button
                                    key={shell}
                                    onClick={() => setSelectedShell(shell)}
                                    className={`p-6 rounded-lg border-2 transition-all ${selectedShell === shell
                                            ? 'border-primary terminal-glow bg-primary/10'
                                            : 'border-border hover:border-primary/50'
                                        }`}
                                >
                                    <h3 className="text-xl font-bold terminal-text capitalize">
                                        {shell}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Continue Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleContinue}
                            disabled={!selectedOS || !selectedShell}
                            className="w-full py-4 px-6 rounded-lg bg-primary text-primary-foreground font-bold text-lg
                       hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                       terminal-glow enabled:hover:shadow-lg"
                        >
                            {selectedOS && selectedShell
                                ? `$ sudo start --os=${selectedOS} --shell=${selectedShell}`
                                : '$ Select OS and Shell to continue'}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>
                        Build your perfect development environment •{' '}
                        <span className="terminal-text">Open Source</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
