import React from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Bell, Users, AlertTriangle, TrendingUp, Smartphone, MapPin, Camera, Check } from "lucide-react";

/* ---------------- Animations ---------------- */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------------- Feature Data ---------------- */
const features = [
  {
    title: "Instant Reporting",
    description: "Submit complaints instantly with photo attachments and exact location tagging.",
    sub: ["Quick upload flow", "Camera support", "Detailed location fields"],
    icon: <Zap className="h-5 w-5" />,
    gradient: "from-blue-500/10 to-indigo-500/10 text-blue-600",
  },
  {
    title: "Real-time Tracking",
    description: "Track your complaint status from assignment to completion on a live timeline.",
    sub: ["Resolution timeline", "Live progress notifications", "Technician assignment info"],
    icon: <Clock className="h-5 w-5" />,
    gradient: "from-purple-500/10 to-pink-500/10 text-purple-600",
  },
  {
    title: "Smart Notifications",
    description: "Stay updated with automatic email alerts whenever a complaint's status changes.",
    sub: ["Email notifications", "Status transition alert", "Instant admin updates"],
    icon: <Bell className="h-5 w-5" />,
    gradient: "from-orange-500/10 to-red-500/10 text-orange-600",
  },
  {
    title: "Role-based Access",
    description: "Individual panels for students to report issues and admins to manage technical staff.",
    sub: ["Student control center", "Comprehensive Admin panel", "Distinct workflow lanes"],
    icon: <Users className="h-5 w-5" />,
    gradient: "from-emerald-500/10 to-teal-500/10 text-emerald-600",
  },
  {
    title: "Priority Handling",
    description: "Urgent hazards and safety concerns are automatically flagged for immediate response.",
    sub: ["Safety-critical focus", "High-priority triggers", "Accident prevention"],
    icon: <AlertTriangle className="h-5 w-5" />,
    gradient: "from-rose-500/10 to-orange-500/10 text-rose-600",
  },
  {
    title: "Operational Analytics",
    description: "Visualize response metrics, pending complaints, and resolution efficiencies.",
    sub: ["Complaint statistics", "Volume metrics", "Performance summaries"],
    icon: <TrendingUp className="h-5 w-5" />,
    gradient: "from-indigo-500/10 to-cyan-500/10 text-indigo-600",
  },
];

const PowerfulFeatures = () => {
  return (
    <section className="py-24 px-6 bg-white font-jakarta relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Feature Highlights
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Designed for Campus Efficiency
          </h2>
          <p className="mt-4 text-base text-zinc-500">
            A comprehensive set of tools built to optimize communication and response times between campus residents and technical teams.
          </p>
        </motion.div>

        {/* ---------- Features Grid ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 flex flex-col"
            >
              {/* Icon Container */}
              <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-zinc-950 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
                {feature.description}
              </p>

              {/* Sub features list */}
              <ul className="mt-6 pt-6 border-t border-zinc-100 space-y-2.5 flex-1">
                {feature.sub.map((point, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-600">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-50 text-green-600 flex-shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PowerfulFeatures;
