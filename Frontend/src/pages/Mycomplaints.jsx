import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, MapPin, Calendar, RefreshCw, FileText, ChevronRight, Inbox } from "lucide-react";

const statusStyle = {
  Pending: {
    bg: "bg-amber-50/80 border-amber-200/60 text-amber-700",
    icon: <AlertCircle className="h-4 w-4 text-amber-600" />,
    step: 1,
  },
  "In Progress": {
    bg: "bg-blue-50/80 border-blue-200/60 text-blue-700",
    icon: <Clock className="h-4 w-4 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />,
    step: 2,
  },
  Fixed: {
    bg: "bg-emerald-50/80 border-emerald-200/60 text-emerald-700",
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
    step: 3,
  },
};

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userId = localStorage.getItem("userId");

  const fetchComplaints = async (showIndicator = false) => {
    if (showIndicator) setIsRefreshing(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/complaints/user/${userId}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setComplaints(data);
      }
    } catch (err) {
      console.log("Failed to fetch complaints:", err.message);
    } finally {
      if (showIndicator) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchComplaints(true);
    const interval = setInterval(() => fetchComplaints(false), 4000);
    return () => clearInterval(interval);
  }, [userId]);

  const filteredComplaints = complaints.filter((c) => {
    if (filter === "all") return true;
    if (filter === "pending") return c.status === "Pending";
    if (filter === "progress") return c.status === "In Progress";
    if (filter === "fixed") return c.status === "Fixed";
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 py-12 px-6 font-jakarta relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200/80">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight flex items-center gap-2">
              <FileText className="h-6 w-6 text-zinc-800" /> My Complaints
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Live updates of electrical issues raised by your student account.
            </p>
          </div>
          <button
            onClick={() => fetchComplaints(true)}
            className="flex items-center gap-2 self-start sm:self-center px-4 py-2 border border-zinc-200 bg-white rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition shadow-sm"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-zinc-400 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Syncing..." : "Sync status"}
          </button>
        </div>

        {/* FILTER NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 mb-8 bg-zinc-200/50 p-1 rounded-2xl max-w-md">
          {[
            { label: "All Tickets", id: "all" },
            { label: "Pending", id: "pending" },
            { label: "In Progress", id: "progress" },
            { label: "Fixed", id: "fixed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all duration-300 ${
                filter === tab.id
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* COMPLAINTS LIST */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredComplaints.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border border-zinc-200/80 p-12 text-center shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 border border-zinc-100">
                  <Inbox className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900">No complaints found</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                  {filter === "all"
                    ? "You haven't reported any electrical issues yet."
                    : "No complaints match this filter category right now."}
                </p>
              </motion.div>
            ) : (
              filteredComplaints.map((c) => {
                const currentStatus = c.status || "Pending";
                const styleObj = statusStyle[currentStatus] || statusStyle.Pending;
                return (
                  <motion.div
                    key={c._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl border border-zinc-200/80 p-6 md:p-8 shadow-md hover:shadow-xl hover:border-zinc-300 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* TOP ROW */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                          {c.issueType}
                        </span>
                        <h3 className="text-base font-bold text-zinc-950 mt-1.5 capitalize">
                          {c.issueType} Malfunction
                        </h3>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${styleObj.bg}`}>
                        {styleObj.icon}
                        {c.status}
                      </span>
                    </div>

                    {/* LOCATION MAP-PIN */}
                    <div className="flex items-center gap-2 text-xs text-zinc-700 bg-zinc-50 py-2 px-3 rounded-xl border border-zinc-100 w-fit mb-4">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                      <span>
                        {c.locationType === "hostel"
                          ? `Hostel: ${c.hostelType} | Block: ${c.block} | Floor: ${c.floor} | Room: ${c.roomNo}`
                          : `Building: ${c.collegeBuilding} | Room: ${c.roomNo}`}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-2xl text-justify mb-6">
                      {c.problemDescription}
                    </p>

                    {/* IMAGE REVIEW (If uploaded) */}
                    {c.image && (
                      <div className="mb-6 rounded-2xl overflow-hidden border border-zinc-200 max-w-xs aspect-video bg-zinc-50">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${c.image}`}
                          alt="Uploaded evidence"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* RESOLUTION LIFECYCLE TIMELINE VISUAL */}
                    <div className="pt-6 border-t border-zinc-100 grid grid-cols-3 gap-2 relative">
                      {[
                        { label: "Submitted", step: 1 },
                        { label: "In Progress", step: 2 },
                        { label: "Resolved", step: 3 },
                      ].map((t) => {
                        const isCurrentOrPassed = styleObj.step >= t.step;
                        const isCurrent = styleObj.step === t.step;
                        return (
                          <div key={t.step} className="flex flex-col items-center text-center relative z-10">
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold border transition-colors ${
                                isCurrentOrPassed
                                  ? isCurrent
                                    ? "bg-blue-600 text-white border-blue-600 shadow shadow-blue-500/30"
                                    : "bg-emerald-500 text-white border-emerald-500"
                                  : "bg-white text-zinc-300 border-zinc-200"
                              }`}
                            >
                              {isCurrentOrPassed && !isCurrent ? "✓" : t.step}
                            </div>
                            <span
                              className={`text-[10px] font-bold mt-2 transition-colors ${
                                isCurrentOrPassed ? "text-zinc-800" : "text-zinc-300"
                              }`}
                            >
                              {t.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* DATES ROW */}
                    <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Reported: {new Date(c.createdAt).toLocaleDateString()} at {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>
                        Updated: {new Date(c.updatedAt).toLocaleDateString()} at {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default MyComplaints;
