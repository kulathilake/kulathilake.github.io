import React from 'react';
import portraitImg from '../assets/images/profile_portrait_1790013893009.jpg';
import { PUBLICATIONS } from '../data/repositories';

interface AboutViewProps {
  onOpenContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenContact }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-10 sm:pt-14 font-serif">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start mb-14">
        {/* Left: Bio Details */}
        <div className="md:col-span-8 space-y-5 text-[#222222] text-[16.5px] leading-relaxed">
          <h1 className="text-3xl sm:text-4xl text-[#111111] font-normal tracking-tight mb-2">
            About Shehan Kulathilake
          </h1>
          <p className="text-[17px] font-medium text-[#333333]">
            Computer scientist investigating cache-conscious graph systems, memory-efficient data structures, and edge intelligence.
          </p>
          <p>
            Graph of efficient graph traversal algorithms in large datasets, with increasing populations
            for re-enhancing consensus-continuum. Data mentorship, with an emphasis on research-computational
            synergy, to build a lineation of efficient algorithms in large datasets.
          </p>
          <p>
            Shehan Kulathilake’s research and experiments focus on developing these scalable solutions, as mentioned,
            to modern programming methods, high-performance distributed graph processing, and hardware-in-the-loop
            neural architecture searches.
          </p>
          <p>
            My work is motivated by a simple design principle: high performance arises from understanding physical hardware limits—memory hierarchies, cache lines, and bus bandwidth—rather than relying on abstract runtime magic.
          </p>

          <div className="pt-2">
            <h3 className="text-xl font-bold text-[#111111] mb-2 font-serif">
              Research Interests
            </h3>
            <ul className="list-disc list-inside space-y-1 text-[15.5px] text-[#333333] font-sans">
              <li>High-throughput graph traversal algorithms (BFS, DFS, PageRank, Betweenness)</li>
              <li>Distributed vertex-cut and edge-cut partitioning frameworks</li>
              <li>Cache-line aligned and SIMD-accelerated search trees</li>
              <li>Quantized embedded model architectures on microcontrollers</li>
            </ul>
          </div>
        </div>

        {/* Right: Portrait & Contact */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="w-full max-w-[280px] bg-[#f0eee6] border border-[#dedcd3] overflow-hidden shadow-xs">
            <img
              src={portraitImg}
              alt="Shehan Kulathilake"
              className="w-full aspect-square object-cover"
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

      {/* Selected Publications Section */}
      <section className="pt-6 border-t border-[#e5e3dc]">
        <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-6">
          Selected Publications
        </h2>
        <div className="space-y-6">
          {PUBLICATIONS.map((pub, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[17px] font-bold text-[#111111]">
                {pub.title}
              </div>
              <div className="text-[14.5px] text-[#444444] font-sans">
                {pub.authors}
              </div>
              <div className="text-[13.5px] text-[#666666] font-sans italic">
                {pub.venue} ({pub.year})
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
