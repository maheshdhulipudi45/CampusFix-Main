import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Wind, Play, Zap, ShieldAlert, Clock, Check, Calendar, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

/* ---------------- Services Data ---------------- */
const serviceCards = [
  {
    title: "Lighting Solutions",
    priority: "HIGH",
    time: "30 min response",
    desc: "Complete lighting maintenance including bulb replacement, ballast repairs, and emergency lighting checks.",
    services: ["Bulb replacement", "Emergency lighting", "LED upgrades", "Panel connection fixes"],
    icon: <Lightbulb className="h-5 w-5" />,
    priorityClass: "bg-red-50 text-red-700 border-red-100",
  },
  {
    title: "Ventilation Systems",
    priority: "MEDIUM",
    time: "1 hour response",
    desc: "Ceiling fan installation, repair, Speed regulator fixes, and exhaust ventilation maintenance.",
    services: ["Ceiling fans", "Motor repair", "Exhaust systems", "Speed control fixes"],
    icon: <Wind className="h-5 w-5" />,
    priorityClass: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    title: "AV & Classroom Tech",
    priority: "MEDIUM",
    time: "45 min response",
    desc: "Power feed repairs, projector wiring, smart board inputs, and audio speaker connection fixes.",
    services: ["Projector power", "Cable management", "Screen motor fixes", "Amplifier power lines"],
    icon: <Play className="h-5 w-5" />,
    priorityClass: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    title: "Power Outlets & Wiring",
    priority: "HIGH",
    time: "1.5 hrs response",
    desc: "Short circuit detection, socket replacement, network hub power feeds, and circuit breaker checks.",
    services: ["Socket replacement", "Breaker diagnostics", "Load balancing", "Extension wiring"],
    icon: <Zap className="h-5 w-5" />,
    priorityClass: "bg-red-50 text-red-700 border-red-100",
  },
  {
    title: "Safety & Warning Alarms",
    priority: "CRITICAL",
    time: "Immediate response",
    desc: "Critical fire alarm power wiring, emergency exit panel backups, and server room temperature alarm checks.",
    services: ["Exit route lighting", "Fire alarm loops", "Server backup feeds", "Smoke detector power"],
    icon: <ShieldAlert className="h-5 w-5" />,
    priorityClass: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    title: "Preventive Inspections",
    priority: "LOW",
    time: "Scheduled weekly",
    desc: "Routine electrical checks, distribution board thermography audits, and load diagnostics.",
    services: ["Distribution checks", "Thermal insulation test", "Load tests", "Safety earthing checks"],
    icon: <Clock className="h-5 w-5" />,
    priorityClass: "bg-green-50 text-green-700 border-green-100",
  },
];

const OurServices = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-white font-jakarta relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Maintenance Scope
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Our Service Categories
          </h2>
          <p className="mt-4 text-base text-zinc-500">
            Professional electrical services covering all classrooms, student hostels, and labs across campuses.
          </p>
        </motion.div>

        {/* ---------- Service Cards ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceCards.map((card, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-7 border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="h-11 w-11 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-950">
                      {card.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${card.priorityClass}`}>
                        {card.priority}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {card.time}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-6">
                  {card.desc}
                </p>

                {/* Sub Services */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-zinc-100 mb-8">
                  {card.services.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-medium text-zinc-600">
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="truncate">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="flex-1 border border-zinc-200 text-zinc-700 py-2.5 rounded-xl text-xs font-semibold hover:bg-zinc-50 transition flex items-center justify-center gap-1.5"
                >
                  <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                  Inquire
                </button>
                <button
                  onClick={() => navigate("/complaint")}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl text-xs font-semibold hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow shadow-blue-500/10"
                >
                  File Complaint
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- Process Timeline ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-28"
        >
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
              System Workflow
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-zinc-950 tracking-tight">
              Simple 4-Step Resolution Lifecycle
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {[
              { num: "01", step: "Report Issue", detail: "Student or faculty logs details and photo proof online." },
              { num: "02", step: "System Review", detail: "Admins assess priority level and assign matching technician." },
              { num: "03", step: "Dispatch", detail: "Technician receives ticket and visits the physical site." },
              { num: "04", step: "Verify Fix", detail: "Technician reports fix, and resolution notification mail goes out." },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={item}
                className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 text-4xl font-extrabold text-zinc-100 font-jakarta pointer-events-none select-none">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-zinc-950 mt-4">
                  {step.step}
                </h4>
                <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                  {step.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
