import { NextRequest, NextResponse } from 'next/server';

// In-memory store for scripts (in production, use a database or Redis)
// Scripts expire after 24 hours
const scriptStore = new Map<string, { script: string; createdAt: number; meta: { os: string; packages: string[] } }>();

const TTL = 24 * 60 * 60 * 1000; // 24 hours

function cleanExpired() {
    const now = Date.now();
    for (const [key, value] of scriptStore.entries()) {
        if (now - value.createdAt > TTL) {
            scriptStore.delete(key);
        }
    }
}

function generateId(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

// POST: Store a script and return an ID
export async function POST(request: NextRequest) {
    cleanExpired();

    try {
        const { script, os, packages } = await request.json();

        if (!script || typeof script !== 'string') {
            return NextResponse.json({ error: 'Invalid script' }, { status: 400 });
        }

        const id = generateId();
        scriptStore.set(id, {
            script,
            createdAt: Date.now(),
            meta: { os: os || 'unknown', packages: packages || [] },
        });

        return NextResponse.json({ id });
    } catch {
        return NextResponse.json({ error: 'Failed to store script' }, { status: 500 });
    }
}

// GET: Retrieve a script by ID
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const entry = scriptStore.get(id);
    if (!entry) {
        // Return a helpful shell error if accessed via curl
        const userAgent = request.headers.get('user-agent') || '';
        if (userAgent.toLowerCase().includes('curl') || userAgent.toLowerCase().includes('wget')) {
            return new NextResponse(
                `#!/bin/bash\necho "Error: Script not found or expired. Scripts expire after 24 hours."\nexit 1\n`,
                {
                    status: 404,
                    headers: { 'Content-Type': 'text/plain' },
                }
            );
        }
        return NextResponse.json({ error: 'Script not found or expired' }, { status: 404 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const isCurlOrWget =
        userAgent.toLowerCase().includes('curl') ||
        userAgent.toLowerCase().includes('wget') ||
        searchParams.get('raw') === '1';

    if (isCurlOrWget) {
        return new NextResponse(entry.script, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Content-Disposition': `attachment; filename="sudo-start-setup.sh"`,
                'X-Script-OS': entry.meta.os,
                'X-Script-Packages': entry.meta.packages.length.toString(),
            },
        });
    }

    return NextResponse.json({
        script: entry.script,
        meta: entry.meta,
        createdAt: entry.createdAt,
        expiresAt: entry.createdAt + TTL,
    });
}