import { NextRequest, NextResponse } from 'next/server';
import { generateScript } from '@/lib/script-generator';
import { OS, Shell, Package } from '@/types';

// Simple in-memory cache for scripts (in production, use Redis or database)
const scriptCache = new Map<string, { script: string; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Clear cache on startup to ensure fresh scripts
scriptCache.clear();

// Generate a unique ID for the script configuration
function generateScriptId(os: OS, shell: Shell, packages: Package[]): string {
  const config = {
    os,
    shell,
    packages: packages.map(p => ({
      id: p.id,
      selectedVersion: p.selectedVersion || p.defaultVersion
    })).sort((a, b) => a.id.localeCompare(b.id))
  };
  
  // Create a hash from the configuration
  const configStr = JSON.stringify(config);
  const hash = Buffer.from(configStr).toString('base64').replace(/[+/=]/g, '').substring(0, 16);
  return hash;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const scriptId = searchParams.get('id');
  
  if (!scriptId) {
    return NextResponse.json(
      { error: 'Missing script ID' },
      { status: 400 }
    );
  }
  
  // Check cache
  const cached = scriptCache.get(scriptId);
  if (!cached) {
    return NextResponse.json(
      { error: 'Script not found or expired' },
      { status: 404 }
    );
  }
  
  // Check if script is expired
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    scriptCache.delete(scriptId);
    return NextResponse.json(
      { error: 'Script expired' },
      { status: 410 }
    );
  }
  
  // Return the script with proper headers for direct execution
  return new NextResponse(cached.script, {
    status: 200,
    headers: {
      'Content-Type': 'text/x-shellscript',
      'Content-Disposition': 'inline; filename="sudo-start-setup.sh"',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { os, shell, packages } = body;
    
    if (!os || !shell || !Array.isArray(packages)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    // Generate the script
    const script = generateScript(os, shell, packages);
    
    // Generate a unique ID for this configuration
    const scriptId = generateScriptId(os, shell, packages);
    
    // Cache the script
    scriptCache.set(scriptId, {
      script,
      timestamp: Date.now(),
    });
    
    // Clean up expired entries
    for (const [id, entry] of scriptCache.entries()) {
      if (Date.now() - entry.timestamp > CACHE_TTL) {
        scriptCache.delete(id);
      }
    }
    
    // Return the script ID and execution URL
    const baseUrl = new URL(request.url).origin;
    const executionUrl = `${baseUrl}/api/script?id=${scriptId}`;
    
    return NextResponse.json({
      scriptId,
      executionUrl,
      expiresAt: new Date(Date.now() + CACHE_TTL).toISOString(),
    });
  } catch (error) {
    console.error('Error generating script:', error);
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}