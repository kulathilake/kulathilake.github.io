import React, { useState } from 'react';
import { Post } from '../types';

interface ResearchViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({
  posts,
  onSelectPost,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Collect unique tags
  const allTags = ['All', ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

  const filteredPosts =
    selectedTag === 'All'
      ? posts
      : posts.filter((p) => p.tags.includes(selectedTag));

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-10 sm:pt-14 font-serif">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl text-[#111111] font-normal tracking-tight mb-3">
          Research Notes &amp; Experiments
        </h1>
        <p className="text-[16.5px] text-[#444444] font-sans">
          Working notes, empirical benchmarks, and architectural investigations in distributed systems, graph theory, and edge computing.
        </p>
      </header>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#e5e3dc] font-sans text-[13.5px]">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-[2px] transition-colors focus:outline-none ${
              selectedTag === tag
                ? 'bg-[#1c1c1c] text-[#f7f6f1]'
                : 'bg-[#eceae3] text-[#444444] hover:bg-[#e0ded6] hover:text-black'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-10">
        {filteredPosts.map((post) => (
          <article key={post.id} className="group">
            <button
              onClick={() => onSelectPost(post)}
              className="text-left w-full focus:outline-none"
            >
              <h2 className="text-xl sm:text-[23px] font-bold text-[#111111] group-hover:text-[#444444] transition-colors leading-snug">
                {post.title}
              </h2>
            </button>
            <p className="mt-2 text-[#2d2d2d] leading-relaxed text-[16px]">
              {post.excerpt}
            </p>
            <div className="mt-2 flex items-center gap-3 text-[13.5px] font-sans text-[#666666]">
              <time dateTime={post.date}>{post.formattedDate}</time>
              <span>•</span>
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
