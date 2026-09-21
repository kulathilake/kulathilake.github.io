import { Post, MarkdownFrontmatter } from '../types';

/**
 * Lightweight, robust parser for YAML-like frontmatter without bulky dependencies.
 * Matches standard Jekyll / Hugo / Astro / Next.js blog post frontmatter:
 * ---
 * title: Post Title
 * date: YYYY-MM-DD
 * category: Research
 * tags:
 *   - Tag1
 *   - Tag2
 * readTime: 5 min read
 * ---
 */
export function parseMarkdownFile(filename: string, rawText: string): Post {
  let frontmatter: MarkdownFrontmatter = {};
  let content = rawText;

  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = rawText.match(frontmatterRegex);

  if (match) {
    const rawYaml = match[1];
    content = match[2].trim();

    const lines = rawYaml.split(/\r?\n/);
    let currentKey: string | null = null;
    let listAccumulator: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Check list item under a key (e.g. "  - Item")
      if (trimmed.startsWith('- ') && currentKey) {
        listAccumulator.push(trimmed.slice(2).trim());
        continue;
      }

      // Check key-value line (e.g. "key: value")
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        // flush previous list if any
        if (currentKey && listAccumulator.length > 0) {
          (frontmatter as Record<string, unknown>)[currentKey] = listAccumulator;
          listAccumulator = [];
        }

        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();

        if (value === '') {
          currentKey = key;
        } else {
          currentKey = null;
          // Unquote if needed
          const cleanValue = value.replace(/^['"]|['"]$/g, '');
          (frontmatter as Record<string, unknown>)[key] = cleanValue;
        }
      }
    }

    if (currentKey && listAccumulator.length > 0) {
      (frontmatter as Record<string, unknown>)[currentKey] = listAccumulator;
    }
  }

  // Derive date and slug from filename convention: YYYY-MM-DD-slug.md
  const cleanFilename = filename.split('/').pop() || filename;
  const filenameMatch = cleanFilename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);

  const fileDate = filenameMatch ? filenameMatch[1] : '';
  const fileSlug = filenameMatch ? filenameMatch[2] : cleanFilename.replace(/\.md$/, '');

  const dateStr = frontmatter.date || fileDate || new Date().toISOString().slice(0, 10);
  
  // Format readable date: "March 15, 2024"
  let formattedDate = dateStr;
  try {
    const dateObj = new Date(dateStr + 'T00:00:00');
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
  } catch {
    formattedDate = dateStr;
  }

  // Generate clean title if missing
  const title =
    frontmatter.title ||
    fileSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  // Generate tags
  let tags: string[] = [];
  if (Array.isArray(frontmatter.tags)) {
    tags = frontmatter.tags;
  } else if (typeof frontmatter.tags === 'string') {
    tags = (frontmatter.tags as string).split(',').map((t) => t.trim());
  }
  if (tags.length === 0 && frontmatter.category) {
    tags = [frontmatter.category];
  }
  if (tags.length === 0) {
    tags = ['Research'];
  }

  // Estimate read time if not provided
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;
  const readTime = frontmatter.readTime || estimatedReadTime;

  // Generate excerpt from first non-heading paragraph
  let excerpt = frontmatter.excerpt || '';
  if (!excerpt) {
    const cleanParagraphs = content
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith('#') && !p.startsWith('```') && !p.startsWith('!'));
    
    if (cleanParagraphs.length > 0) {
      // Strip markdown links/asterisks
      excerpt = cleanParagraphs[0]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`]/g, '')
        .slice(0, 200);
      if (cleanParagraphs[0].length > 200) {
        excerpt += '...';
      }
    }
  }

  return {
    id: fileSlug,
    slug: fileSlug,
    filename: cleanFilename,
    title,
    date: dateStr,
    formattedDate,
    category: frontmatter.category || tags[0] || 'Research',
    tags,
    readTime,
    excerpt,
    content
  };
}

/**
 * Loads all markdown files from the repository's posts directory using Vite's
 * build-time glob import (`import.meta.glob`).
 *
 * This fulfills the requirement:
 * "with each push, the site gets built, and in the build process the new markdown
 * files are used to create the posts, sorted by date in descending order."
 */
export function loadLocalMarkdownPosts(): Post[] {
  const modules = import.meta.glob('../content/posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  });

  const posts: Post[] = [];

  for (const [path, rawContent] of Object.entries(modules)) {
    const post = parseMarkdownFile(path, rawContent as string);
    posts.push(post);
  }

  // Sort descending by date (newest first)
  return posts.sort((a, b) => {
    // Primary: compare ISO dates
    if (b.date !== a.date) {
      return b.date.localeCompare(a.date);
    }
    // Secondary: compare filenames
    return b.filename.localeCompare(a.filename);
  });
}
