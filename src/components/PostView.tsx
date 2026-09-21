import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Post } from '../types';
import { ArrowLeft, Check, Copy, Share2 } from 'lucide-react';

interface PostViewProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onSelectPost: (post: Post) => void;
}

export const PostView: React.FC<PostViewProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
}) => {
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeSnippet(code);
    setTimeout(() => setCopiedCodeSnippet(null), 2000);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="w-full max-w-4xl mx-auto px-6 pt-8 sm:pt-12 font-serif">
      {/* Top back navigation bar */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e5e3dc] font-sans text-[14px]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#555555] hover:text-black transition-colors focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notes</span>
        </button>

        <div className="flex items-center gap-4 text-[#666666]">
          <span className="text-xs font-mono text-[#888888] bg-[#eceae2] px-2 py-0.5 rounded">
            {post.filename}
          </span>
          <span>{post.readTime}</span>
          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1 hover:text-black transition-colors focus:outline-none cursor-pointer"
            title="Copy link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-emerald-700 text-xs">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="text-xs">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Post Header */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-[38px] font-bold text-[#111111] leading-[1.25] tracking-tight">
          {post.title}
        </h1>
        <div className="mt-3 text-[14.5px] font-sans text-[#666666] tracking-wide">
          <span>{post.formattedDate}</span>
          <span className="mx-2 text-[#999999]">|</span>
          <span>{post.tags.join(', ')}</span>
        </div>
      </header>

      {/* Markdown Rendered Content */}
      <div className="space-y-6 text-[#222222] text-[17px] leading-[1.75]">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl sm:text-[32px] font-bold text-[#111111] tracking-tight pt-6 pb-2 border-b border-[#e5e3dc]">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl sm:text-[25px] font-bold text-[#111111] tracking-tight pt-5 pb-1">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl sm:text-[21px] font-bold text-[#111111] tracking-tight pt-4">
                {children}
              </h3>
            ),
            p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 my-3 pl-2 text-[16.5px]">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1 my-3 pl-2 text-[16.5px]">
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-[#1c1c1c] pl-4 italic text-[#444444] my-4">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 text-[#111111] hover:text-[#555555]"
              >
                {children}
              </a>
            ),
            pre: ({ children }) => {
              // Custom styled code block container matching attached mockups
              return <div className="my-6 relative group">{children}</div>;
            },
            code: (props) => {
              const { className, children } = props;
              const isBlock = Boolean(className) || String(children).includes('\n');
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const codeString = String(children).replace(/\n$/, '');

              if (isBlock) {
                const isCopied = copiedCodeSnippet === codeString;
                return (
                  <div>
                    <div className="flex items-center justify-between px-4 py-2 bg-[#e4e2d9] border border-[#d8d6cd] rounded-t-[4px] text-xs font-mono text-[#555555]">
                      <span>{language || 'code'}</span>
                      <button
                        onClick={() => handleCopyCode(codeString)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-[#f7f6f1] hover:bg-white text-[#333333] border border-[#ccc9be] transition-colors focus:outline-none cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 sm:p-5 bg-[#eceae2] border-x border-b border-[#d8d6cd] rounded-b-[4px] overflow-x-auto text-[14px] leading-relaxed font-mono text-[#1a1a1a]">
                      <code>{codeString}</code>
                    </pre>
                  </div>
                );
              }

              return (
                <code className="px-1.5 py-0.5 bg-[#eceae2] border border-[#dedcd2] rounded text-[14px] font-mono text-[#111111]">
                  {children}
                </code>
              );
            },
            table: ({ children }) => (
              <div className="overflow-x-auto my-6 border border-[#d8d6cd] rounded">
                <table className="w-full text-left text-sm font-sans">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="bg-[#eceae2] p-2.5 font-bold border-b border-[#d8d6cd]">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="p-2.5 border-b border-[#eceae2]">{children}</td>
            ),
          }}
        >
          {post.content}
        </Markdown>
      </div>

      {/* Post-reading Navigation */}
      <nav className="mt-16 pt-8 border-t border-[#e5e3dc] font-sans text-[14px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              onClick={() => onSelectPost(prevPost)}
              className="p-4 text-left border border-[#dfddd5] hover:border-[#999999] bg-[#f9f8f4] transition-all focus:outline-none group rounded-[2px] cursor-pointer"
            >
              <div className="text-xs text-[#777777] uppercase tracking-wider mb-1">
                ← Previous Post
              </div>
              <div className="font-serif font-bold text-[#111111] group-hover:text-[#444444] line-clamp-1">
                {prevPost.title}
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextPost && (
            <button
              onClick={() => onSelectPost(nextPost)}
              className="p-4 text-right border border-[#dfddd5] hover:border-[#999999] bg-[#f9f8f4] transition-all focus:outline-none group rounded-[2px] cursor-pointer"
            >
              <div className="text-xs text-[#777777] uppercase tracking-wider mb-1">
                Next Post →
              </div>
              <div className="font-serif font-bold text-[#111111] group-hover:text-[#444444] line-clamp-1">
                {nextPost.title}
              </div>
            </button>
          )}
        </div>
      </nav>
    </article>
  );
};
