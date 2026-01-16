// src/components/VersionBadge.tsx
import { useEffect, useState } from 'react';
import { getLatestGitHubRelease } from '@/lib/version-fetcher';

interface VersionBadgeProps {
  repoSlug: string;
}

const VersionBadge: React.FC<VersionBadgeProps> = ({ repoSlug }) => {
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVersion = async () => {
      setLoading(true);
      const latestVersion = await getLatestGitHubRelease(repoSlug);
      setVersion(latestVersion);
      setLoading(false);
    };

    if (repoSlug) {
      fetchVersion();
    }
  }, [repoSlug]);

  if (!repoSlug) {
    return null;
  }

  if (loading) {
    return <span className="text-xs text-gray-400">Fetching version...</span>;
  }

  if (!version) {
    return <span className="text-xs text-red-500">Failed to fetch version</span>;
  }

  return (
    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
      {version}
    </span>
  );
};

export default VersionBadge;
