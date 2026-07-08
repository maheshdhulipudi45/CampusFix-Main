import React from "react";
import { MessageSquare, Eye, Shield, BellRing } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WhyUse = () => {
  const features = [
    {
      title: "Fast & Easy Reporting",
      description: "Report any electrical problem in a few simple steps. Our mobile-friendly forms capture crucial details instantly.",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-[#0052FF] bg-[#0052FF]/5 border-[#0052FF]/10",
    },
    {
      title: "Real-time Tracking",
      description: "Never wonder about the status of your complaint. Monitor progress live from ticket creation to technician sign-off.",
      icon: <Eye className="h-5 w-5" />,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Improved Safety",
      description: "Critical safety hazards are flagged and pushed to the top of technicians' queues for immediate containment.",
      icon: <Shield className="h-5 w-5" />,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Centralized Alerts",
      description: "CampusFix alerts students, technicians, and authorities simultaneously to keep everyone on the same page.",
      icon: <BellRing className="h-5 w-5" />,
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
  ];

  return (
    <div className="bg-white py-24 px-6 font-jakarta relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0052FF]">
          Core Values
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
          Why CampusFix?
        </h2>
        <p className="mt-4 text-base text-zinc-500 max-w-xl mx-auto">
          Simplifying electrical issue reporting and repair management across Aditya campuses.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white p-7 rounded-3xl border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <div className="flex flex-col items-start gap-3.5 mb-5">
              <div className={`p-3 rounded-2xl border flex items-center justify-center ${feature.color} shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-sm font-extrabold text-zinc-950 leading-tight">
                {feature.title}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed text-left">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyUse;