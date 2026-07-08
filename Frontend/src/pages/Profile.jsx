import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, IdCard, Award, ShieldAlert, FileText, CheckCircle2, Calendar, Settings } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "Student";
  const userId = localStorage.getItem("userId");

  const [userInfo, setUserInfo] = useState({
    name: "Campus User",
    email: "user@aditya.ac.in",
    phone: "+91 9876543210",
    id: "21B01A02",
  });
  
  const [userComplaints, setUserComplaints] = useState([]);

  useEffect(() => {
    if (!userId) return;

    // Fetch user complaints to count stats and show history
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUserComplaints(data);
          // If we have complaints, extract user details from the first one
          if (data.length > 0) {
            setUserInfo({
              name: data[0].fullName || "Campus User",
              email: data[0].email || "user@aditya.ac.in",
              phone: data[0].phoneNumber || "+91 9876543210",
              id: data[0].userId || "21B01A02",
            });
          }
        }
      })
      .catch(() => console.log("Failed to fetch profile stats"));
  }, [userId]);

  const totalComplaints = userComplaints.length;
  const pendingComplaints = userComplaints.filter((c) => c.status === "Pending").length;
  const fixedComplaints = userComplaints.filter((c) => c.status === "Fixed").length;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 py-12 px-6 font-jakarta relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* PROFILE COVER BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-48 sm:h-56 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 sm:left-8 flex items-center gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-extrabold text-2xl border-4 border-white/20 shadow-md">
              {role[0].toUpperCase()}
            </div>
            <div className="text-white">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{userInfo.name}</h1>
              <p className="text-xs text-blue-100 font-semibold capitalize bg-white/10 px-2 py-0.5 rounded border border-white/10 w-fit mt-1.5">{role} Account</p>
            </div>
          </div>
        </motion.div>

        {/* METRICS & QUICK DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Settings className="h-3.5 w-3.5" /> Details
              </h3>
              <div className="space-y-3.5 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  <span className="truncate">{userInfo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  <span className="truncate">{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  <span className="truncate">{userInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  <span className="truncate">{userInfo.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* STATISTICS */}
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Complaint Stats</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-2xl">
                  <p className="text-xl font-extrabold text-zinc-950">{totalComplaints}</p>
                  <p className="text-[9px] font-bold text-zinc-400 mt-1 uppercase">Total</p>
                </div>
                <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-2xl">
                  <p className="text-xl font-extrabold text-amber-600">{pendingComplaints}</p>
                  <p className="text-[9px] font-bold text-amber-400 mt-1 uppercase">Active</p>
                </div>
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                  <p className="text-xl font-extrabold text-emerald-600">{fixedComplaints}</p>
                  <p className="text-[9px] font-bold text-emerald-400 mt-1 uppercase">Fixed</p>
                </div>
              </div>
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" /> Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-800">Quick Reporter</p>
                    <p className="text-[9px] text-zinc-400">Lodged first successful issue request</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    🛡
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-800">Campus Guardian</p>
                    <p className="text-[9px] text-zinc-400">Contributed to campus safety audits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* TIMELINE COMPLAINT HISTORY */}
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-md mt-8">
          <h3 className="text-sm font-extrabold text-zinc-950 mb-6 flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-zinc-800" /> Recent Ticket Timeline
          </h3>

          {userComplaints.length === 0 ? (
            <p className="text-xs text-zinc-400 text-center py-6">
              No recent complaints logged on this account.
            </p>
          ) : (
            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-100">
              {userComplaints.slice(0, 3).map((c, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 text-white font-bold text-xs shadow-sm ${
                    c.status === "Fixed" ? "bg-emerald-500" : "bg-blue-600"
                  }`}>
                    {c.status === "Fixed" ? "✓" : "!"}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                    <h4 className="text-xs font-bold text-zinc-800 mt-0.5 capitalize">{c.issueType} malfunction reported</h4>
                    <p className="text-[11px] text-zinc-500 mt-1 max-w-xl leading-relaxed">{c.problemDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
