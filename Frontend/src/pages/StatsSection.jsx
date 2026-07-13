import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Clock, Users, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const StatsSection = () => {
  const [statsData, setStatsData] = useState({
    users: 0,
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStatsData({
          users: data.users || 0,
          total: data.total || 0,
          pending: data.pending || 0,
          inProgress: data.inProgress || 0,
          resolved: data.resolved || 0,
        });
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      value: statsData.users,
      label: "Total Registered Users",
      desc: "Count of all registered user accounts.",
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      value: statsData.total,
      label: "Total Complaints",
      desc: "Total defects submitted to the platform.",
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      value: statsData.pending,
      label: "Pending Complaints",
      desc: "Issues currently awaiting review.",
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      value: statsData.inProgress,
      label: "In Progress",
      desc: "Issues actively being worked on.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
      value: statsData.resolved,
      label: "Resolved Complaints",
      desc: "Defects successfully fixed and closed.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-200/50 font-jakarta relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Platform Stats
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Proven Campus Reliability
          </h2>
          <p className="mt-4 text-base text-zinc-500">
            Real metrics tracking our operational efficiency and response times across Aditya educational blocks.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-3xl font-extrabold text-zinc-950 tracking-tight">
                  {stat.value}
                </h3>
                <h4 className="text-xs font-bold text-zinc-800 mt-2 uppercase tracking-wide">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;
