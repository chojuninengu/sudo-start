'use client';

import { useStore } from '@/lib/store';
import { appCatalog } from '@/lib/apps';
import { ChatMessage } from '@/types';
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ChatWindow() {
    const { isChatOpen, toggleChat, addToBucket, removeFromBucket, bucket } = useStore();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: 'Hello! I\'m Root 🌳 Ask me about setting up your development environment.',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
        }
    }, [input]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Parse the AI response (JSON or Text fallback)
            let aiText = data.message;
            let action = null;

            try {
                // Attempt to parse JSON response
                // Regex to find JSON object in case model adds introductory text
                const jsonMatch = data.message.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    aiText = parsed.response;
                    action = parsed.action;
                }
            } catch (e) {
                // Fallback to raw text if not valid JSON
                console.warn('Failed to parse AI JSON', e);
            }

            // Execute Actions
            if (action && action.packageIds) {
                action.packageIds.forEach((id: string) => {
                    const pkg = appCatalog.find((p) => p.id === id);
                    if (pkg) {
                        if (action.type === 'add') {
                            // Check if already in bucket
                            if (!bucket.some(b => b.id === pkg.id)) {
                                addToBucket({ ...pkg, selectedVersion: pkg.defaultVersion });
                            }
                        } else if (action.type === 'remove') {
                            removeFromBucket(pkg.id);
                        }
                    }
                });
            }

            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: aiText,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: ChatMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please check that your GROQ_API_KEY is configured in .env.local',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isChatOpen) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 w-96 terminal-card rounded-lg overflow-hidden
                  shadow-2xl z-50 transition-all flex flex-col ${isMinimized ? 'h-14' : 'h-[600px]'
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary terminal-glow animate-pulse" />
                    <span className="font-bold terminal-text">Root AI</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="p-1 hover:bg-accent rounded transition-colors"
                    >
                        {isMinimized ? (
                            <Maximize2 className="w-4 h-4" />
                        ) : (
                            <Minimize2 className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={toggleChat}
                        className="p-1 hover:bg-accent rounded transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-foreground'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted p-3 rounded-lg">
                                    <p className="text-sm terminal-text">
                                        Root is thinking
                                        <span className="cursor-blink">▊</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-border bg-card">
                        <div className="flex gap-2 items-end">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Ask Root for help..."
                                rows={1}
                                className="flex-1 px-3 py-2 rounded-lg bg-input border border-border
                         text-foreground placeholder:text-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-ring resize-none overflow-y-auto"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground
                         hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all h-[38px] flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
