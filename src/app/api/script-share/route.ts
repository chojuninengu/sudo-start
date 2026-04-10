import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';

const STORE_DIR = path.join(os.tmpdir(), 'sudostart-scripts');
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface ScriptEntry {
  script: string;
  createdAt: number;
  meta: { os: string; packages: string[] };
}

async function ensureDir() {
  if (!existsSync(STORE_DIR)) {
    await mkdir(STORE_DIR, { recursive: true });
  }
}

function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

async function readEntry(id: string): Promise<ScriptEntry | null> {
  try {
    const file = path.join(STORE_DIR, `${id}.json`);
    const raw = await readFile(file, 'utf-8');
    const entry: ScriptEntry = JSON.parse(raw);
    if (Date.now() - entry.createdAt > TTL_MS) return null;
    return entry;
  } catch {
    return null;
  }
}

async function writeEntry(id: string, entry: ScriptEntry) {
  await ensureDir();
  const file = path.join(STORE_DIR, `${id}.json`);
  await writeFile(file, JSON.stringify(entry), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const { script, os: osName, packages } = await request.json();
    if (!script || typeof script !== 'string') {
      return NextResponse.json({ error: 'Invalid script' }, { status: 400 });
    }

    const id = generateId();
    await writeEntry(id, {
      script,
      createdAt: Date.now(),
      meta: { os: osName ?? 'unknown', packages: packages ?? [] },
    });

    return NextResponse.json({ id });
  } catch (err) {
    console.error('script-share POST error:', err);
    return NextResponse.json({ error: 'Failed to store script' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const entry = await readEntry(id);
  if (!entry) {
    const ua = request.headers.get('user-agent') ?? '';
    const isCli = ua.toLowerCase().includes('curl') || ua.toLowerCase().includes('wget');
    if (isCli) {
      return new NextResponse(
        `#!/bin/bash\necho "Error: Script not found or expired (24h TTL)"\nexit 1\n`,
        { status: 404, headers: { 'Content-Type': 'text/plain' } }
      );
    }
    return NextResponse.json({ error: 'Script not found or expired' }, { status: 404 });
  }

  const ua = request.headers.get('user-agent') ?? '';
  const raw = searchParams.get('raw') === '1';
  const isCli =
    ua.toLowerCase().includes('curl') ||
    ua.toLowerCase().includes('wget') ||
    raw;

  if (isCli) {
    return new NextResponse(entry.script, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="sudo-start-setup.sh"',
        'X-Script-OS': entry.meta.os,
        'X-Script-Packages': entry.meta.packages.length.toString(),
      },
    });
  }

  return NextResponse.json({
    script: entry.script,
    meta: entry.meta,
    createdAt: entry.createdAt,
    expiresAt: entry.createdAt + TTL_MS,
  });
}