import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, MapPin, Calendar, User, Mail, Phone, Inbox, Settings } from "lucide-react";

const statusStyle = {
  Pending: {
    border: "border-l-amber-500",
    badge: "bg-amber-50 border-amber-200 text-amber-700",
    icon: <AlertCircle className="h-4 w-4 text-amber-600" />,
  },
  "In Progress": {
    border: "border-l-blue-500",
    badge: "bg-blue-50 border-blue-200 text-blue-700",
    icon: <Clock className="h-4 w-4 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />,
  },
  Fixed: {
    border: "border-l-emerald-500",
    badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  },
};

const AdminComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/complaints`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setComplaints(data);
      }
    } catch (err) {
      console.log("Failed to load complaints:", err.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchComplaints();
    } catch (err) {
      console.log("Failed to update status:", err.message);
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    if (filter === "all") return true;
    if (filter === "pending") return c.status === "Pending";
    if (filter === "progress") return c.status === "In Progress";
    if (filter === "fixed") return c.status === "Fixed";
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 py-12 px-6 font-jakarta relative overflow-hidden">
      {/* Ambience patterns */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200/80">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight flex items-center gap-2">
              📋 Admin Complaints Registry
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Review issues, assign work orders, and track resolution audits across Aditya campuses.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 mb-8 bg-zinc-200/50 p-1 rounded-2xl max-w-md">
          {[
            { label: "All Tickets", id: "all" },
            { label: "Pending", id: "pending" },
            { label: "In Progress", id: "progress" },
            { label: "Resolved", id: "fixed" },
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

        {/* COMPLAINTS CONTAINER */}
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
                <h4 className="text-sm font-bold text-zinc-900">No complaints available</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                  No electrical complaints are listed in this category at this time.
                </p>
              </motion.div>
            ) : (
              filteredComplaints.map((c, index) => {
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
                    className={`bg-white rounded-3xl border-l-8 ${styleObj.border} border-y border-r border-zinc-200/80 p-6 md:p-8 shadow-md hover:shadow-xl hover:border-zinc-300 transition-all duration-300 relative overflow-hidden`}
                  >
                    {/* TOP ROW */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                          TICKET-{index + 1}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${styleObj.badge}`}>
                          {styleObj.icon}
                          {c.status}
                        </span>
                      </div>

                      {/* STATUS CHANGER DROPDOWN */}
                      <div className="flex items-center gap-2">
                        <Settings className="h-3.5 w-3.5 text-zinc-400" />
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c._id, e.target.value)}
                          className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Fixed">Fixed</option>
                        </select>
                      </div>
                    </div>

                    {/* ISSUE TITLE */}
                    <h3 className="text-base font-extrabold text-zinc-950 mt-1 capitalize">
                      {c.issueType} Malfunction
                    </h3>

                    {/* LOCATION DETAILS */}
                    <div className="flex items-center gap-2 text-xs text-zinc-700 bg-zinc-50 py-2 px-3 rounded-xl border border-zinc-100 w-fit mt-3 mb-5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                      <span className="font-medium">
                        {c.locationType === "hostel"
                          ? `Hostel: ${c.hostelType} | Block: ${c.block} | Floor: ${c.floor} | Room: ${c.roomNo}`
                          : `Building: ${c.collegeBuilding} | Room: ${c.roomNo}`}
                      </span>
                    </div>

                    {/* REPORTER INFO GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100 mb-5 text-xs">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="truncate"><strong>Name:</strong> {c.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="truncate"><strong>Email:</strong> {c.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="truncate"><strong>Phone:</strong> {c.phoneNumber}</span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-1.5 mb-6 text-xs sm:text-sm">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Description</span>
                      <p className="text-zinc-500 leading-relaxed text-justify">
                        {c.problemDescription}
                      </p>
                    </div>

                    {/* ATTACHMENT IMAGE (If present) */}
                    {c.image && (
                      <div className="mb-6 rounded-2xl overflow-hidden border border-zinc-200 max-w-sm aspect-video bg-zinc-50">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${c.image}`}
                          alt="Evidence attachment"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* TIMELINE META DETAILS */}
                    <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Submitted: {new Date(c.createdAt).toLocaleDateString()} at {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>
                        Last Updated: {new Date(c.updatedAt).toLocaleDateString()} at {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

export default AdminComplaintList;
