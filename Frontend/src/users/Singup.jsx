import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mail, Lock, User, Phone, IdCard, GraduationCap, ShieldCheck, ArrowRight, ArrowLeft, Building2, CheckCircle2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const allowedAdminEmails = [
  "24p31f00a8@acet.ac.in",
  "24p31f0003@acet.ac.in",
  "24p31f0011@acet.ac.in",
  "24p31f00h5@acet.ac.in",
];

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  
  const [formData, setFormData] = useState({
    accountType: "student",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    id: "",
    department: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAccountTypeChange = (type) => {
    setFormData({
      ...formData,
      accountType: type,
      id: "",
      department: "",
    });
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { label: "", color: "bg-zinc-200", width: "w-0" };
    if (p.length < 5) return { label: "Weak", color: "bg-rose-500", width: "w-1/3" };
    if (p.length < 8) return { label: "Moderate", color: "bg-amber-500", width: "w-2/3" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getPasswordStrength();

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName) {
      toast.error("Enter first name and last name");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.email || !formData.phoneNumber || !formData.id) {
      toast.error("Please fill in email, phone, and campus ID");
      return false;
    }
    if (formData.accountType === "student" && !formData.department) {
      toast.error("Choose your department");
      return false;
    }
    if (
      formData.accountType === "admin" &&
      !allowedAdminEmails.includes(formData.email)
    ) {
      toast.error("This email is not whitelisted for Admin registration");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      toast.error("Passwords are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.agreedToTerms) {
      toast.error("Please accept the Terms & Conditions");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountType: formData.accountType,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          id: formData.id,
          department: formData.accountType === "student" ? formData.department : "",
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        setIsLoading(false);
        return;
      }

      setShowSuccessAnim(true);
      setTimeout(() => navigate("/login"), 1800);
    } catch {
      toast.error("Server connection error");
      setIsLoading(false);
    }
  };

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

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-[#F8FAFC] font-jakarta relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* LEFT COLUMN: BEAUTIFUL ILLUSTRATION SPLIT */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative flex-col justify-between p-12 text-white"
        style={{
          backgroundImage: `url('./hbg1.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-zinc-950/90" />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur text-white border border-white/10 font-bold">
            <Zap className="h-5 w-5 fill-white stroke-none" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">CampusFix</span>
        </div>

        <div className="relative z-10 max-w-md my-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-8 shadow-2xl space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-xs font-semibold text-blue-200">
              <Building2 className="h-3.5 w-3.5 text-blue-300" /> V2.0 Enterprise Desk
            </span>
            <h2 className="text-2xl font-extrabold uppercase tracking-wide leading-tight">
              Create Your Campus Account
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Verify your student roll number or whitelisted administrator email tags to access services.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
          © {new Date().getFullYear()} Aditya Institutions
        </div>
      </div>

      {/* RIGHT COLUMN: SIGNUP CARD FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-3xl border border-zinc-200/60 shadow-xl p-8 sm:p-10 relative z-10"
        >
          <AnimatePresence mode="wait">
            {showSuccessAnim ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow shadow-emerald-500/10">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">
                    Registration Completed!
                  </h2>
                  <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    Account created successfully. Redirecting you to the sign-in screen...
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
                    Create Account
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Follow the wizard steps to complete signup.
                  </p>
                </div>

                {/* Progress dot steps */}
                <div className="flex items-center justify-between gap-2 max-w-xs mx-auto text-xs font-bold text-zinc-400">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all ${
                        step >= s
                          ? "bg-blue-600 border-blue-600 text-white shadow shadow-blue-500/20"
                          : "bg-white border-zinc-200 text-zinc-400"
                      }`}>
                        {s}
                      </div>
                      {s < 3 && <div className={`h-[2px] w-8 ${step > s ? "bg-blue-600" : "bg-zinc-200"}`} />}
                    </div>
                  ))}
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    
                    {/* Step 1: role & names */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Account Role</label>
                          <div className="relative flex bg-zinc-100 rounded-2xl p-1.5">
                            <button
                              type="button"
                              onClick={() => handleAccountTypeChange("student")}
                              className="w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5"
                              style={{ color: formData.accountType === "student" ? "#ffffff" : "#71717a" }}
                            >
                              <User className="h-3.5 w-3.5" />
                              Student
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAccountTypeChange("admin")}
                              className="w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5"
                              style={{ color: formData.accountType === "admin" ? "#ffffff" : "#71717a" }}
                            >
                              <ShieldCheck className="h-3.5 w-3.5" />
                              Admin
                            </button>

                            <motion.div
                              className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
                              animate={{ x: formData.accountType === "student" ? 0 : "100%" }}
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          </div>
                        </div>

                        <FloatingInput
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          icon={<User className="h-4 w-4" />}
                        />

                        <FloatingInput
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          icon={<User className="h-4 w-4" />}
                        />

                        <button
                          type="button"
                          onClick={() => validateStep1() && setStep(2)}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                          Continue <ArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: email & phone & roll */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-4"
                      >
                        <FloatingInput
                          label="Official Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          icon={<Mail className="h-4 w-4" />}
                        />

                        <FloatingInput
                          label="Mobile Number"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          icon={<Phone className="h-4 w-4" />}
                        />

                        <FloatingInput
                          label={formData.accountType === "student" ? "Student ID" : "Admin ID"}
                          name="id"
                          value={formData.id}
                          onChange={handleChange}
                          icon={<IdCard className="h-4 w-4" />}
                        />

                        {formData.accountType === "student" && (
                          <div className="relative h-14 w-full">
                            <select
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                              className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                              required
                            >
                              <option value="">Choose department</option>
                              <option value="engineering">Engineering</option>
                              <option value="science">Science</option>
                              <option value="business">Business</option>
                            </select>
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                            <label className="absolute left-11 top-2.5 text-[10px] font-bold text-blue-500 pointer-events-none uppercase">
                              Department
                            </label>
                          </div>
                        )}

                        <div className="flex gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-1/2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                          >
                            <ArrowLeft className="h-4 w-4" /> Back
                          </button>
                          <button
                            type="button"
                            onClick={() => validateStep2() && setStep(3)}
                            className="w-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2"
                          >
                            Next <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: password settings */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-4"
                      >
                        <FloatingInput
                          label="Choose Password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          icon={<Lock className="h-4 w-4" />}
                        />

                        {formData.password && (
                          <div className="pt-1">
                            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                              <div className={`h-full ${strength.color} ${strength.width} transition-all`} />
                            </div>
                            <span className="text-[9px] font-bold text-zinc-400 mt-1 block uppercase">Strength: {strength.label}</span>
                          </div>
                        )}

                        <FloatingInput
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          icon={<Lock className="h-4 w-4" />}
                        />

                        <div className="pt-2">
                          <label className="flex items-center text-xs text-zinc-500 select-none cursor-pointer">
                            <input
                              type="checkbox"
                              name="agreedToTerms"
                              checked={formData.agreedToTerms}
                              onChange={handleChange}
                              className="h-4 w-4 rounded-md border-zinc-300 text-blue-600 focus:ring-blue-500 mr-2.5"
                            />
                            I agree to the Terms & Conditions
                          </label>
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="w-1/3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                          >
                            <ArrowLeft className="h-4 w-4" /> Back
                          </button>
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 group"
                          >
                            {isLoading ? "Creating..." : "Create Account"}
                          </button>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </form>

                {/* Back to sign in link */}
                <p className="text-center text-xs text-zinc-400 mt-6 pt-4 border-t border-zinc-100">
                  Already have an account?{" "}
                  <Link to="/login" className="font-bold text-blue-600 hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
