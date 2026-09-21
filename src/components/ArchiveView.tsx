import React, { useState, useMemo } from 'react';
import { Post } from '../types';
import { Search } from 'lucide-react';

interface ArchiveViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  posts,
  onSelectPost,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    const term = searchTerm.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
    );
  }, [posts, searchTerm]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups: { [year: string]: Post[] } = {};
    filteredPosts.forEach((post) => {
      const year = post.date.substring(0, 4);
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    return groups;
  }, [filteredPosts]);

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-10 sm:pt-14 font-serif">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl text-[#111111] font-normal tracking-tight mb-3">
          Archive
        </h1>
        <p className="text-[16px] text-[#444444] font-sans">
          Chronological record of all research notes and computational essays.
        </p>
      </header>

      {/* Search Input */}
      <div className="relative mb-10 font-sans">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter notes by title, topic, or tag..."
          className="w-full pl-10 pr-4 py-2 bg-[#faf9f5] border border-[#dcdad0] focus:border-black rounded-[2px] text-[14.5px] text-[#222222] focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#777777] hover:text-black"
          >
            Clear
          </button>
        )}
      </div>

      {years.length === 0 ? (
        <div className="py-12 text-center text-[#666666] font-sans">
          No articles found matching "{searchTerm}".
        </div>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-2xl font-bold text-[#111111] border-b border-[#e5e3dc] pb-2 mb-6">
                {year}
              </h2>
              <div className="space-y-4">
                {groupedByYear[year].map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 group py-1.5"
                  >
                    <button
                      onClick={() => onSelectPost(post)}
                      className="text-left font-serif text-[18px] text-[#111111] group-hover:text-[#444444] transition-colors focus:outline-none"
                    >
                      {post.title}
                    </button>
                    <div className="flex items-center gap-3 text-xs font-sans text-[#777777] shrink-0">
                      <span>{post.category}</span>
                      <span>•</span>
                      <time dateTime={post.date}>{post.formattedDate}</time>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
