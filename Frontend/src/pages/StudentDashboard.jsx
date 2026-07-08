import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, ListTodo, User, Zap, ArrowUpRight, HelpCircle, FileText } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 py-12 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 font-jakarta relative overflow-hidden">
      {/* Ambience grids */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{currentDate}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mt-2 tracking-tight flex items-center gap-2">
                🎓 Welcome to Your Dashboard
              </h1>
              <p className="text-sm text-zinc-500 mt-2.5 max-w-xl leading-relaxed">
                CampusFix is Aditya's dedicated electrical complaint desk. Raise complaints or track the progress of active tasks reported by you.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2.5 bg-zinc-50 border border-zinc-100 px-4 py-2.5 rounded-2xl">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                S
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-800">Student Account</p>
                <p className="text-[10px] text-zinc-400">Authorized Access</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Submit Complaint Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            onClick={() => navigate("/complaint")}
            className="group cursor-pointer rounded-3xl p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient background grid */}
            <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-2xl group-hover:scale-110 transition-transform duration-300" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="h-11 w-11 rounded-2xl bg-white/10 text-white border border-white/10 flex items-center justify-center">
                <PlusCircle className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
            </div>

            <h2 className="text-xl font-bold tracking-tight">
              Submit Complaint
            </h2>
            <p className="text-xs text-blue-100/80 mt-3.5 leading-relaxed">
              Encountered an electrical defect? Fill out location details, outline the issue, and attach a photo to dispatch a maintenance technician.
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs text-white font-bold">
              <span>Report issue now</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </motion.div>

          {/* My Complaints Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            onClick={() => navigate("/my-complaints")}
            className="group cursor-pointer rounded-3xl p-8 bg-white border border-zinc-200/80 shadow-lg hover:shadow-xl hover:border-zinc-300 transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient background grid */}
            <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-purple-500/5 blur-2xl group-hover:scale-110 transition-transform duration-300" />

            <div className="flex justify-between items-start mb-6">
              <div className="h-11 w-11 rounded-2xl bg-zinc-50 text-zinc-950 border border-zinc-100 flex items-center justify-center">
                <ListTodo className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
            </div>

            <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
              My Complaints
            </h2>
            <p className="text-xs text-zinc-500 mt-3.5 leading-relaxed">
              Review and track all electrical complaints submitted by your account. Monitor live updates and read technician comments once resolved.
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-xs text-blue-600 font-bold">
              <span>Track complaint status</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </motion.div>

        </div>

        {/* Guidelines Help Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-zinc-100/50 rounded-2xl border border-zinc-200/40 p-5 flex items-center gap-4 text-xs text-zinc-500"
        >
          <HelpCircle className="h-5 w-5 text-zinc-400 flex-shrink-0" />
          <p className="leading-relaxed">
            Need urgent assistance? Critical hazards (like exposed wires, burning smells, or water leakages near switchboards) must be immediately reported to your hostel warden or the emergency helpdesk at <strong>+91 7658956116</strong>.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default StudentDashboard;
