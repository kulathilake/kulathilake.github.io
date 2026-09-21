import React from 'react';
import portraitImg from '../assets/images/profile_portrait_1790013893009.jpg';

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
            Technical Lead at Sysco LABS in Colombo, Sri Lanka, building software systems and helping engineering teams deliver dependable products.
          </p>
          <p>
            I have grown from a Junior Software Engineer into technical leadership through work across full-stack web development, distributed team collaboration, and modern application platforms.
          </p>
          <p>
            My professional interests include thoughtful system design, practical engineering mentorship, and turning complex technical requirements into maintainable software.
          </p>
          <p>
            Alongside my professional work, I am pursuing a Master's degree in Computer Science at the University of Colombo School of Computing.
          </p>

          <div className="pt-2">
            <h3 className="text-xl font-bold text-[#111111] mb-2 font-serif">
              Research Interests
            </h3>
            <ul className="list-disc list-inside space-y-1 text-[15.5px] text-[#333333] font-sans">
              <li>Technical leadership and engineering mentorship</li>
              <li>Full-stack web application development</li>
              <li>System design and maintainable software architecture</li>
              <li>Developer productivity and reliable delivery</li>
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

      {/* Resume Section */}
      <section className="pt-6 border-t border-[#e5e3dc]">
        <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-6">
          Resume
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <h3 className="text-xl font-bold text-[#111111] mb-3">Experience</h3>
            <div className="space-y-5 font-sans">
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Technical Lead</div>
                <div className="text-[15px] text-[#444444]">Sysco LABS Sri Lanka</div>
                <div className="text-[13.5px] text-[#666666]">Sep 2026 - Present</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Associate Technical Lead</div>
                <div className="text-[15px] text-[#444444]">Sysco LABS Sri Lanka</div>
                <div className="text-[13.5px] text-[#666666]">Aug 2024 - Sep 2026</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Senior Software Engineer</div>
                <div className="text-[15px] text-[#444444]">Sysco LABS Sri Lanka</div>
                <div className="text-[13.5px] text-[#666666]">Nov 2022 - Aug 2024</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Software Engineer</div>
                <div className="text-[15px] text-[#444444]">Sysco LABS Sri Lanka</div>
                <div className="text-[13.5px] text-[#666666]">Jan 2022 - Oct 2022</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Software Engineer</div>
                <div className="text-[15px] text-[#444444]">EC | Elysian Crest</div>
                <div className="text-[13.5px] text-[#666666]">Apr 2020 - Dec 2021</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Junior Software Engineer</div>
                <div className="text-[15px] text-[#444444]">Eyepax</div>
                <div className="text-[13.5px] text-[#666666]">Feb 2020 - Apr 2020</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111111] mb-3">Education</h3>
            <div className="space-y-5 font-sans">
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Master's degree, Computer Science</div>
                <div className="text-[15px] text-[#444444]">University of Colombo School of Computing</div>
                <div className="text-[13.5px] text-[#666666]">Jan 2023 - Present</div>
              </div>
              <div>
                <div className="text-[17px] font-bold text-[#111111]">Bachelor's degree, Information Systems</div>
                <div className="text-[15px] text-[#444444]">University of Colombo School of Computing</div>
                <div className="text-[13.5px] text-[#666666]">Jan 2017 - Feb 2020</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
