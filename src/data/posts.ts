import { Post } from '../types';
import { loadLocalMarkdownPosts, parseMarkdownFile } from '../utils/markdown';

// Eager build-time imported posts from /src/content/posts/*.md
export const BUILD_TIME_POSTS: Post[] = loadLocalMarkdownPosts();

/**
 * Service to fetch posts directly from a public GitHub repository at runtime if desired,
 * falling back seamlessly to the build-time bundled markdown posts.
 */
export async function fetchPostsFromGitHub(
  owner: string = 'kulathilake',
  repo: string = 'blog-posts',
  branch: string = 'main',
  postsPath: string = 'posts'
): Promise<Post[]> {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${postsPath}?ref=${branch}`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const items = await res.json();
    if (!Array.isArray(items)) {
      throw new Error('Expected array of file items from GitHub contents API');
    }

    const mdFiles = items.filter(
      (item) => typeof item.name === 'string' && item.name.endsWith('.md')
    );

    const postPromises = mdFiles.map(async (file) => {
      const rawRes = await fetch(file.download_url);
      const rawText = await rawRes.text();
      return parseMarkdownFile(file.name, rawText);
    });

    const posts = await Promise.all(postPromises);

    // Sort descending by date from file name / frontmatter
    return posts.sort((a, b) => b.date.localeCompare(a.date));
  } catch (error) {
    console.warn('Could not fetch posts from GitHub repository, using build-time posts:', error);
    return BUILD_TIME_POSTS;
  }
}
