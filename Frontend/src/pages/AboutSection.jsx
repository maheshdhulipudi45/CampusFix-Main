import React from "react";
import { motion } from "framer-motion";
import { Wrench, Eye, Zap, Shield, User, GraduationCap, Building2, CheckCircle2 } from "lucide-react";

/* ---------------- Animations ---------------- */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------------- Feature Data ---------------- */
const features = [
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Expert Technicians",
    desc: "Certified professionals handle every electrical issue with safety and precision.",
    gradient: "from-blue-500/10 to-indigo-500/10 text-blue-600",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Live Status Tracking",
    desc: "Monitor your electrical complaint progress in real time from submission to fix.",
    gradient: "from-purple-500/10 to-pink-500/10 text-purple-600",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Response Time",
    desc: "Automated routing algorithms assign complaints to nearby electricians instantly.",
    gradient: "from-orange-500/10 to-amber-500/10 text-orange-600",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure System",
    desc: "All campus issues, users, and resolution audits are kept entirely private.",
    gradient: "from-emerald-500/10 to-teal-500/10 text-emerald-600",
  },
];

const users = [
  {
    icon: <User className="h-6 w-6 text-blue-600" />,
    title: "Students",
    desc: "Submit electrical complaints in hostels, classrooms, libraries, or labs in seconds.",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
    title: "Faculty & Staff",
    desc: "Ensure an uninterrupted, safe educational environment for lectures and research.",
  },
  {
    icon: <Building2 className="h-6 w-6 text-emerald-600" />,
    title: "Administration",
    desc: "Oversee the overall health of campus facilities, response times, and technician performance.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-200/50 font-jakarta relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* -------- Mission -------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28"
        >
          <motion.div variants={item} className="space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              Modernizing Campus Facilities Management
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed">
              CampusFix modernizes campus electrical maintenance by providing a centralized digital system that bridges the gap between campus residents and technical teams.
            </p>
            <p className="text-base text-zinc-500 leading-relaxed">
              Our mission is to establish safety, complete transparency, and accelerated response times to ensure educational activities go on uninterrupted.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
            <h3 className="text-xl font-bold text-zinc-950 mb-6">
              Why CampusFix?
            </h3>
            <ul className="space-y-4">
              {[
                "Instant and effortless complaint submissions",
                "Continuous tracking from dashboard interface",
                "Advanced tracking of technician response times",
                "Proactive maintenance planning for campus security",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* -------- Core Features -------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-28"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-7 border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient}`}>
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-zinc-950">
                {f.title}
              </h3>
              <p className="mt-3 text-zinc-500 text-xs leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* -------- Who Can Use -------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={item} className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
              System Roles
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-zinc-950 tracking-tight">
              Built for the Entire Campus
            </h2>
            <p className="mt-4 text-base text-zinc-500">
              CampusFix offers individual portal features tailored to optimize the experience of all campus personnel.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {users.map((u, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 border border-zinc-200/80 shadow-sm hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100">
                  {u.icon}
                </div>
                <h3 className="text-base font-bold text-zinc-950">
                  {u.title}
                </h3>
                <p className="mt-3 text-zinc-500 text-xs leading-relaxed">
                  {u.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
