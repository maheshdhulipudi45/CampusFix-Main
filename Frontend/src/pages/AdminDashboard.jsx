import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, FileSpreadsheet, Clock, CheckCircle2, ShieldCheck, UserCheck, ArrowRight, Settings } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => console.log("Failed to load stats"));
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 px-6 py-12 font-jakarta relative overflow-hidden">
      {/* Blurred accent background */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                System Overview
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-4 tracking-tight flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-zinc-800" /> Admin Dashboard
              </h1>
              <p className="text-sm text-zinc-500 mt-2.5 max-w-xl leading-relaxed">
                Oversee campus electrical operations, analyze technician response cycles, and control the lifecycle of reported issues.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2.5 bg-zinc-50 border border-zinc-100 px-4 py-2.5 rounded-2xl">
              <div className="h-8 w-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-800">Admin Control</p>
                <p className="text-[10px] text-zinc-400">Total System Access</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Complaints"
            value={stats.total}
            icon={<FileSpreadsheet className="h-5 w-5 text-blue-600" />}
            colorClass="border-blue-500/30 bg-white"
          />
          <StatCard
            title="Pending Complaints"
            value={stats.pending}
            icon={<Clock className="h-5 w-5 text-amber-500 animate-pulse" />}
            colorClass="border-amber-500/30 bg-white"
          />
          <StatCard
            title="Resolved Complaints"
            value={stats.resolved}
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
            colorClass="border-emerald-500/30 bg-white"
          />
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Manage Tickets"
            desc="Review all active electrical issues, allocate priorities, and assign local electricians."
            icon={<FileSpreadsheet className="h-6 w-6 text-blue-600" />}
            onClick={() => navigate("/admin-complaints")}
          />
          <ActionCard
            title="Update Status"
            desc="Mark complaints as in-progress or fixed and issue email notifications to reporters."
            icon={<Settings className="h-6 w-6 text-purple-600" />}
            onClick={() => navigate("/admin-complaints")}
          />
          <ActionCard
            title="User Directories"
            desc="Monitor registered accounts, whitelisted email tags, and system auth logs."
            icon={<UserCheck className="h-6 w-6 text-emerald-600" />}
            onClick={() => navigate("/admin-complaints")}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, colorClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-3xl p-6 border border-zinc-200/80 shadow-sm ${colorClass} flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{title}</span>
        <div className="h-8 w-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      </div>
      <h2 className="text-3xl font-extrabold text-zinc-950 mt-6 tracking-tight">
        {value}
      </h2>
    </motion.div>
  );
};

const ActionCard = ({ title, desc, icon, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-3xl p-7 border border-zinc-200/80 shadow-md hover:shadow-lg hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between group h-56"
    >
      <div>
        <div className="h-10 w-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-5 flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-base font-bold text-zinc-950 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 mt-2.5 leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Go to section</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
