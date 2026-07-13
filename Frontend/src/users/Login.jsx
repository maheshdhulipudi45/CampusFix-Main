import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Zap, ArrowRight, ShieldCheck, User, Eye, EyeOff, Building2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";


const FloatingInput = ({ label, name, type = "text", value, onChange, icon, children }) => (
  <div className="relative h-14 w-full">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="w-full h-full pt-4 pb-1 pl-11 pr-10 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all peer"
      required
    />
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
      {icon}
    </div>
    <label className="absolute left-11 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]">
      {label}
    </label>
    {children}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [loginRole, setLoginRole] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and Password required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: loginRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      const userId = data.user?._id || data._id || data.id || data.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      toast.success("Welcome back! Redirecting...");
      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      }, 800);
    } catch {
      toast.error("Server connection error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#F8FAFC] font-jakarta relative overflow-hidden py-12">
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar />

      {/* CENTERED LOGIN CARD FORM */}
      <div className="w-full flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-3xl border border-zinc-200/60 shadow-xl p-8 sm:p-10 relative z-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
              Welcome to CampusFix
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Sign in to manage and report maintenance issues.
            </p>
          </div>

          {/* ROLE SWITCH PILLED TOGGLE */}
          <div className="relative flex bg-zinc-100 rounded-2xl p-1.5 mb-6">
            <button
              type="button"
              onClick={() => setLoginRole("student")}
              className="w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5"
              style={{ color: loginRole === "student" ? "#ffffff" : "#71717a" }}
            >
              <User className="h-3.5 w-3.5" />
              Student Portal
            </button>
            <button
              type="button"
              onClick={() => setLoginRole("admin")}
              className="w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5"
              style={{ color: loginRole === "admin" ? "#ffffff" : "#71717a" }}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Portal
            </button>

            {/* Sliding Background */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm"
              animate={{ x: loginRole === "student" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </div>

          {/* FORM FIELDS */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              label="Official Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail className="h-4 w-4" />}
            />

            <FloatingInput
              label="Account Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              icon={<Lock className="h-4 w-4" />}
            >
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors z-20 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </FloatingInput>

            {/* REMEMBER ME & FORGOT PASSWORD LINK */}
            <div className="flex items-center justify-between text-xs pt-1 select-none">
              <label className="flex items-center text-zinc-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded-md border-zinc-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="font-bold text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 mt-4 group"
            >
              {isLoading ? "Signing in..." : `Sign In`}
              {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          {/* REGISTRATION */}
          <p className="text-center text-xs text-zinc-400 mt-6 pt-4 border-t border-zinc-100">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-bold text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
