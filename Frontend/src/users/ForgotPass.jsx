import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, Zap } from "lucide-react";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    loading || setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 px-6 py-12 font-jakarta relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl border border-zinc-200/80 shadow-2xl p-8 relative z-10 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* HEADER */}
              <div className="text-center">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold mb-4 shadow-md shadow-blue-600/20">
                  <Zap className="h-5 w-5 fill-white stroke-none" />
                </div>
                <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight font-jakarta">
                  Reset Password
                </h2>
                <p className="text-xs text-zinc-400 mt-2">
                  Enter your registered official email to receive a recovery link.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative h-14 w-full">
                  <input
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all peer"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <label className="absolute left-11 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Official Email Address
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-600/10 flex items-center justify-center gap-2"
                >
                  {loading ? "Sending link..." : "Send Reset Link"}
                </button>
              </form>

              {/* BACK LINK */}
              <div className="text-center pt-4 border-t border-zinc-100">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-blue-600 transition-colors">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-6"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-6 shadow shadow-emerald-500/10 animate-pulse">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              
              <h3 className="text-xl font-extrabold text-zinc-950 tracking-tight">
                Reset Link Dispatched
              </h3>
              <p className="text-xs text-zinc-500 mt-3.5 leading-relaxed max-w-sm mx-auto">
                Check your inbox! We have successfully sent a password reset link to <strong>{email}</strong>.
              </p>

              <div className="mt-8 pt-4 border-t border-zinc-100">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                >
                  Back to Sign In <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPass;
