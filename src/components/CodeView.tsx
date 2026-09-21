import React, { useState } from 'react';
import { CODE_REPOSITORIES } from '../data/repositories';
import { Check, Copy, ExternalLink, GitFork, Star, Terminal } from 'lucide-react';

export const CodeView: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyClone = (name: string, index: number) => {
    navigator.clipboard.writeText(`git clone https://github.com/kulathilake/${name}.git`);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-10 sm:pt-14 font-serif">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl text-[#111111] font-normal tracking-tight mb-3">
          Code &amp; Open Source
        </h1>
        <p className="text-[16.5px] text-[#444444] font-sans">
          Experimental libraries, micro-benchmarks, and algorithmic implementations accompanying published notes.
        </p>
      </header>

      <div className="space-y-8 font-sans">
        {CODE_REPOSITORIES.map((repo, idx) => (
          <div
            key={repo.name}
            className="p-5 bg-[#faf9f5] border border-[#e2e0d7] rounded-[2px] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-medium text-[16px] text-[#111111]">
                  {repo.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#eceae2] text-[#555555]">
                  {repo.language}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#666666]">
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks}
                </span>
                <span>Updated {repo.lastUpdated}</span>
              </div>
            </div>

            <p className="text-[15px] text-[#333333] mb-4 font-serif leading-relaxed">
              {repo.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#edebe4] text-xs">
              <div className="flex items-center gap-2 font-mono text-[#555555] bg-[#f0eee7] px-2.5 py-1 rounded">
                <Terminal className="w-3.5 h-3.5 text-[#777777]" />
                <span className="truncate max-w-[240px] sm:max-w-none">
                  git clone https://github.com/kulathilake/{repo.name}.git
                </span>
                <button
                  onClick={() => handleCopyClone(repo.name, idx)}
                  className="hover:text-black ml-1 focus:outline-none"
                  title="Copy clone command"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#444444] hover:text-black underline underline-offset-2 transition-colors"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
