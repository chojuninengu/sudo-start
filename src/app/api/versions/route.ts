import { NextRequest, NextResponse } from 'next/server';

// Cache for version data (5 minute TTL)
const versionCache: Record<string, { data: string[]; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Version source configurations
const VERSION_SOURCES: Record<string, {
    url: string;
    parser: (data: unknown) => string[];
}> = {
    nodejs: {
        url: 'https://nodejs.org/dist/index.json',
        parser: (data) => {
            const releases = data as { version: string; lts: boolean | string }[];
            // Get LTS versions only, limit to 5
            return releases
                .filter((r) => r.lts)
                .slice(0, 5)
                .map((r) => r.version);
        },
    },
    go: {
        url: 'https://go.dev/dl/?mode=json',
        parser: (data) => {
            const releases = data as { version: string; stable: boolean }[];
            return releases
                .filter((r) => r.stable)
                .slice(0, 5)
                .map((r) => r.version.replace('go', ''));
        },
    },
    python: {
        url: 'https://endoflife.date/api/python.json',
        parser: (data) => {
            const releases = data as { cycle: string; latest: string }[];
            return releases
                .slice(0, 5)
                .map((r) => r.latest);
        },
    },
    rust: {
        url: 'https://api.github.com/repos/rust-lang/rust/releases?per_page=5',
        parser: (data) => {
            const releases = data as { tag_name: string; prerelease: boolean }[];
            return releases
                .filter((r) => !r.prerelease)
                .map((r) => r.tag_name);
        },
    },
    docker: {
        url: 'https://api.github.com/repos/docker/cli/releases?per_page=5',
        parser: (data) => {
            const releases = data as { tag_name: string; prerelease: boolean }[];
            return releases
                .filter((r) => !r.prerelease)
                .map((r) => r.tag_name.replace('v', ''));
        },
    },
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get('tool');

    if (!tool) {
        return NextResponse.json(
            { error: 'Missing "tool" query parameter' },
            { status: 400 }
        );
    }

    const source = VERSION_SOURCES[tool.toLowerCase()];
    if (!source) {
        return NextResponse.json(
            { error: `Unsupported tool: ${tool}. Supported: ${Object.keys(VERSION_SOURCES).join(', ')}` },
            { status: 400 }
        );
    }

    // Check cache
    const cached = versionCache[tool];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ 
            versions: cached.data, 
            cached: true,
            tool 
        });
    }

    try {
        const response = await fetch(source.url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SudoStart-App',
            },
            next: { revalidate: 300 }, // ISR cache for 5 min
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch versions: ${response.status}`);
        }

        const data = await response.json();
        const versions = source.parser(data);

        // Update cache
        versionCache[tool] = {
            data: versions,
            timestamp: Date.now(),
        };

        return NextResponse.json({ 
            versions, 
            cached: false,
            tool 
        });
    } catch (error) {
        console.error(`Error fetching versions for ${tool}:`, error);
        
        // Return cached data if available, even if stale
        if (cached) {
            return NextResponse.json({ 
                versions: cached.data, 
                cached: true,
                stale: true,
                tool 
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch versions', tool },
            { status: 500 }
        );
    }
}
