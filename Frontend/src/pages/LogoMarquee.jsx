import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const LogoMarquee = () => {
  const colleges = [
    "Aditya Engineering College (AEC)",
    "Aditya College of Engineering & Technology (ACET)",
    "Aditya College of Engineering (ACOE)",
    "Aditya Global Business School (AGBS)",
    "Aditya Pharmacy College (APC)",
  ];

  return (
    <section className="py-12 bg-white border-t border-zinc-200/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Trusted by Aditya Campus Divisions
        </p>
      </div>

      <div className="relative flex items-center w-full overflow-hidden">
        {/* Shadow overlays for smooth scrolling edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex whitespace-nowrap gap-16 py-2"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {[...colleges, ...colleges].map((college, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-zinc-400 font-jakarta font-semibold text-sm select-none">
              <GraduationCap className="h-4 w-4 text-zinc-300" />
              <span>{college}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
