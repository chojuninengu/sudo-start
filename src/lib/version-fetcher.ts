// src/lib/version-fetcher.ts
import axios from 'axios';

/**
 * Fetches the latest release tag name from a GitHub repository.
 *
 * @param repoSlug The repository slug in the format "owner/repo".
 * @returns The latest release tag name (e.g., "v1.2.3") or null on failure.
 */
export async function getLatestGitHubRelease(repoSlug: string): Promise<string | null> {
  if (!repoSlug || repoSlug.split('/').length !== 2) {
    console.error(`Invalid repoSlug format: "${repoSlug}". Expected "owner/repo".`);
    return null;
  }

  const apiUrl = `https://api.github.com/repos/${repoSlug}/releases/latest`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.status === 200 && response.data.tag_name) {
      console.log(`Successfully fetched version ${response.data.tag_name} for ${repoSlug}`);
      return response.data.tag_name;
    } else {
      console.warn(`Could not fetch latest release for ${repoSlug}. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    // It's common for this to fail if a repo has no releases, so log as a warning.
    console.warn(`Failed to fetch version for ${repoSlug}:`, error.message);
    return null;
  }
}
