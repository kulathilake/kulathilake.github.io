import React from 'react';
import { Post } from '../types';
import portraitImg from '../assets/images/profile_portrait_1790013893009.jpg';

interface HomeViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  onOpenContact: () => void;
  onViewAllResearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  posts,
  onSelectPost,
  onOpenContact,
  onViewAllResearch,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-10 sm:pt-14 font-serif">
      {/* Welcome Heading */}
      <h1 className="text-3xl sm:text-4xl text-[#111111] font-normal tracking-tight mb-10 sm:mb-12">
        Welcome. I am Shehan Kulathilake.
      </h1>

      {/* Two-Column About Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start mb-16 sm:mb-20">
        {/* Left Column: Bio Text */}
        <div className="md:col-span-7 space-y-5 text-[#222222] leading-relaxed text-[16.5px]">
          <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-3">
            About Shehan Kulathilake
          </h2>
          <p>
            Graph of efficient graph traversal algorithms in large datasets, with increasing
            populations for re-enhancing consensus-continuum. Data mentorship, with an
            emphasis on research-computational synergy, to build a lineation of efficient
            algorithms in large datasets.
          </p>
          <p>
            Shehan Kulathilake’s research and experiments focus on developing these scalable solutions,
            as mentioned, to the following programming methods, high-performance distributed
            graph processing, and memory-bounded edge computation.
          </p>
          <p className="text-[15.5px] text-[#444444]">
            Currently researching systems architectures and reproducible computational experiments.
            You can read through the ongoing research notes below or inspect algorithmic implementations in the code archive.
          </p>
        </div>

        {/* Right Column: Portrait Photo & Contact Button */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[280px] bg-[#f0eee6] border border-[#dedcd3] overflow-hidden shadow-xs">
            <img
              src={portraitImg}
              alt="Shehan Kulathilake portrait"
              className="w-full aspect-square object-cover"
              loading="eager"
            />
          </div>

          <button
            onClick={onOpenContact}
            className="mt-4 px-6 py-2 border border-[#8e8c82] hover:border-black bg-[#f7f6f1] hover:bg-[#eae8e0] text-[#1a1a1a] text-[14px] font-sans rounded-[2px] transition-all cursor-pointer focus:outline-none"
          >
            Contact Shehan Kulathilake
          </button>
        </div>
      </div>

      {/* Latest Posts Section */}
      <section className="pt-2">
        <div className="flex items-baseline justify-between mb-8 border-b border-[#e5e3dc] pb-3">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#111111] tracking-tight">
            Latest Posts
          </h2>
          <button
            onClick={onViewAllResearch}
            className="text-[14px] font-sans text-[#555555] hover:text-black underline underline-offset-2 transition-colors"
          >
            View all ({posts.length})
          </button>
        </div>

        <div className="space-y-9">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <button
                onClick={() => onSelectPost(post)}
                className="text-left w-full focus:outline-none"
              >
                <h3 className="text-xl sm:text-[22px] font-bold text-[#111111] group-hover:text-[#444444] transition-colors leading-snug">
                  {post.title}
                </h3>
              </button>
              <p className="mt-2 text-[#2d2d2d] leading-relaxed text-[15.5px] sm:text-[16px]">
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
      </section>
    </div>
  );
};
