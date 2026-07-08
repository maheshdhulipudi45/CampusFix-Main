import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

const CtaSection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <section className="py-20 px-6 bg-white font-jakarta relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-12 shadow-2xl overflow-hidden text-center"
        >
          {/* Blurred decorative backgrounds */}
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/10 mb-6 shadow-inner">
            <Zap className="h-6 w-6 fill-white stroke-none" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight max-w-xl mx-auto leading-tight">
            Keep Campus Electrical Systems Powered & Safe
          </h2>
          <p className="text-sm text-blue-100 mt-4 max-w-md mx-auto leading-relaxed">
            Report any outages, loose connections, or broken fixtures instantly. Our maintenance desk operates 24/7.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => (token ? navigate("/complaint") : navigate("/login"))}
              className="px-6 py-3 text-xs font-bold rounded-xl bg-white text-blue-700 shadow hover:bg-zinc-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1"
            >
              Report Electrical Issue <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/my-complaints")}
              className="px-6 py-3 text-xs font-bold rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Track Complaint
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
