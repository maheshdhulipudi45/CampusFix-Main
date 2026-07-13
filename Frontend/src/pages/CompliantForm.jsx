import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserRound, MapPinned, Bolt, ImagePlus, ClipboardCheck, 
  CircleCheckBig, Upload, Camera, ArrowLeft, ArrowRight, 
  X, CheckCircle2, AlertTriangle, Lightbulb, Wind, Play, 
  Sparkles, Layers, ShieldCheck, MapPin, Building,
  Mail, Phone, Zap, Settings
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";


const FloatingInput = ({ label, name, type = "text", required = true, icon, value, onChange }) => (
  <div className="relative h-[60px] w-full">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all peer"
      required={required}
    />
    {icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
        {icon}
      </div>
    )}
    <label className="absolute left-11 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 pointer-events-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]">
      {label}
    </label>
  </div>
);

const Complaint = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  // Image upload simulation states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId") || "",
    fullName: "",
    email: "",
    phoneNumber: "",
    locationType: "",
    hostelType: "",
    block: "",
    floor: "",
    roomNo: "",
    collegeBuilding: "",
    complaintCategory: "",
    issueType: "",
    problemDescription: "",
  });

  const textareaRef = useRef(null);

  // Auto-resize description textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.problemDescription]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      complaintCategory: e.target.value,
      issueType: "",
    });
  };

  const simulateProgress = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
          return 100;
        }
        return prev + 20;
      });
    }, 120);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) simulateProgress(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) simulateProgress(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      toast.error("Please fill all reporter details");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.locationType) {
      toast.error("Please choose a location type");
      return false;
    }
    if (formData.locationType === "hostel") {
      if (!formData.hostelType || !formData.block || !formData.floor || !formData.roomNo) {
        toast.error("Please fill all hostel details");
        return false;
      }
    } else if (formData.locationType === "college") {
      if (!formData.collegeBuilding || !formData.roomNo) {
        toast.error("Please fill all academic building details");
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.complaintCategory) {
      toast.error("Please select a complaint category");
      return false;
    }
    if (!formData.issueType) {
      toast.error("Please select an issue type");
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.problemDescription) {
      toast.error("Please write a problem description");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) =>
        data.append(key, formData[key])
      );
      if (image) data.append("image", image);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/complaints`, {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        // Generate a mock complaint ID reference for the success screen
        const randomId = "CFX-" + Math.floor(100000 + Math.random() * 900000);
        setComplaintId(randomId);
        setIsSubmittedSuccessfully(true);
      } else {
        toast.error("Failed to submit request. Try again.");
        setLoading(false);
      }
    } catch {
      toast.error("Server connection error");
      setLoading(false);
    }
  };

  // Stepper Config
  const steps = [
    { label: "Reporter", icon: <UserRound className="h-4 w-4" />, id: 1 },
    { label: "Location", icon: <MapPinned className="h-4 w-4" />, id: 2 },
    { label: "Issue", icon: <Bolt className="h-4 w-4" />, id: 3 },
    { label: "Upload", icon: <ImagePlus className="h-4 w-4" />, id: 4 },
    { label: "Review", icon: <ClipboardCheck className="h-4 w-4" />, id: 5 },
  ];





  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 flex flex-col items-center justify-center py-12 px-6 font-jakarta relative overflow-hidden">
      <ToastContainer autoClose={1000} hideProgressBar />

      {/* Background shape overlays */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      {/* Main Container Wrapper */}
      <div className="w-full max-w-3xl relative z-10">
        
        {/* WARNING PROTOCOL */}
        <div className="bg-rose-50 border border-rose-100/50 rounded-2xl overflow-hidden py-2 px-4 flex items-center gap-2 mb-6">
          <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0 animate-pulse" />
          <div className="overflow-hidden relative w-full h-5">
            <div
              className="absolute whitespace-nowrap text-rose-700 text-xs font-semibold"
              style={{ animation: "marquee 18s linear infinite" }}
            >
              Please submit complaints responsibly. False, prank, or duplicate submissions will be flagged for administrative disciplinary review.
            </div>
          </div>
        </div>

        {/* STEPPER WIDGET */}
        {!isSubmittedSuccessfully && (
          <div className="relative w-full flex items-start justify-between mb-10 px-1 select-none">
            {/* Horizontal progress background line */}
            <div className="absolute left-6 right-6 top-[18px] h-[2px] bg-zinc-200 -z-10" />
            {/* Active progress green/blue indicator line */}
            <div 
              className="absolute left-6 top-[18px] h-[2px] bg-blue-600 -z-10 transition-all duration-500 ease-out" 
              style={{ width: `${((step - 1) / (steps.length - 1)) * 84}%` }}
            />

            {steps.map((s, idx) => {
              const isActiveStep = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div key={s.id} className="flex flex-col items-center flex-1 min-w-0 text-center relative">
                  {/* Icon circle wrapper */}
                  <motion.div 
                    animate={{ scale: isActiveStep ? 1.1 : 1 }}
                    className={`h-9 w-9 rounded-xl flex items-center justify-center border font-bold text-xs transition-all duration-300 relative ${
                      isActiveStep
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/10"
                        : isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white shadow shadow-emerald-500/10"
                        : "bg-white border-zinc-200 text-zinc-400"
                    }`}
                  >
                    {isCompleted ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CircleCheckBig className="h-4.5 w-4.5" />
                      </motion.div>
                    ) : (
                      s.icon
                    )}
                  </motion.div>

                  {/* Title label */}
                  <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-2 px-1 break-words max-w-[68px] leading-tight transition-colors duration-300 ${
                    isActiveStep ? "text-blue-600 font-extrabold" : isCompleted ? "text-emerald-600" : "text-zinc-400"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* MULTI STEP WIZARD CARD */}
        <div className="bg-white rounded-[24px] border border-zinc-200/80 shadow-2xl p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* SUCCESS SCREEN */}
            {isSubmittedSuccessfully ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow shadow-emerald-500/10 animate-bounce">
                  <CircleCheckBig className="h-8 w-8" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">
                    Issue Successfully Logged
                  </h2>
                  <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    A work ticket has been dispatched to campus electricians. You can track progress updates on your dashboard.
                  </p>
                </div>

                {/* Complaint ID Card */}
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 max-w-sm mx-auto flex items-center justify-between text-left shadow-inner">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Complaint Reference ID</span>
                    <p className="text-sm font-extrabold text-zinc-950 mt-1">{complaintId}</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-zinc-100 max-w-md mx-auto">
                  <button
                    onClick={() => navigate("/my-complaints")}
                    className="flex-1 min-w-[140px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Track Complaint
                  </button>
                  <button
                    onClick={() => navigate("/home")}
                    className="flex-1 min-w-[140px] border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Return Home
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                
                {/* STEP 1: REPORTER INFO */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-zinc-100 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-zinc-950">Reporter Information</h3>
                        <p className="text-xs text-zinc-400 mt-1">Provide contact details for update alerts.</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <UserRound className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <FloatingInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} icon={<UserRound className="h-4 w-4" />} />
                      <FloatingInput label="Official Email Address" name="email" type="email" value={formData.email} onChange={handleChange} icon={<Mail className="h-4 w-4" />} />
                      <FloatingInput label="Mobile Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} icon={<Phone className="h-4 w-4" />} />
                    </div>

                    <button
                      type="button"
                      onClick={() => validateStep1() && setStep(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 group"
                    >
                      Continue to Location <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: LOCATION DETAILS */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-zinc-100 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-zinc-950">Location Selection</h3>
                        <p className="text-xs text-zinc-400 mt-1">Specify which campus block contains the issue.</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <MapPinned className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      
                      <div className="relative h-[60px] w-full">
                        <select
                          name="locationType"
                          value={formData.locationType}
                          onChange={handleChange}
                          className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                          required
                        >
                          <option value="">Select General Location</option>
                          <option value="hostel">Hostel Block</option>
                          <option value="college">Academic Building</option>
                        </select>
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <label className="absolute left-11 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Location Type</label>
                      </div>

                      {/* Hostel Details */}
                      {formData.locationType === "hostel" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative h-[60px] w-full col-span-2">
                            <select
                              name="hostelType"
                              value={formData.hostelType}
                              onChange={handleChange}
                              className="w-full h-full pt-4 pb-1 pl-4 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                              required
                            >
                              <option value="">Select Hostel</option>
                              <option value="boys">Boys Hostel</option>
                              <option value="girls">Girls Hostel</option>
                            </select>
                            <label className="absolute left-4 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Hostel Group</label>
                          </div>

                          <div className="relative h-[60px] w-full">
                            <select
                              name="block"
                              value={formData.block}
                              onChange={handleChange}
                              className="w-full h-full pt-4 pb-1 pl-4 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                              required
                            >
                              <option value="">Select Block</option>
                              {["A", "B", "C", "D", "E", "F", "G", "H"].map((b) => (
                                <option key={b} value={b}>{b} Block</option>
                              ))}
                            </select>
                            <label className="absolute left-4 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Hostel Block</label>
                          </div>

                          <div className="relative h-[60px] w-full">
                            <select
                              name="floor"
                              value={formData.floor}
                              onChange={handleChange}
                              className="w-full h-full pt-4 pb-1 pl-4 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                              required
                            >
                              <option value="">Select Floor</option>
                              {[1, 2, 3, 4, 5].map((f) => (
                                <option key={f} value={`${f}nd`}>{f}nd Floor</option>
                              ))}
                            </select>
                            <label className="absolute left-4 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Floor</label>
                          </div>

                          <div className="col-span-2">
                            <FloatingInput label="Room Number" name="roomNo" value={formData.roomNo} onChange={handleChange} icon={<Building className="h-4 w-4" />} />
                          </div>
                        </div>
                      )}

                      {/* College Details */}
                      {formData.locationType === "college" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative h-[60px] w-full">
                            <select
                              name="collegeBuilding"
                              value={formData.collegeBuilding}
                              onChange={handleChange}
                              className="w-full h-full pt-4 pb-1 pl-4 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                              required
                            >
                              <option value="">Select Building</option>
                              <option value="RTB">RTB Block</option>
                              <option value="Visvesvaraya">Visvesvaraya Bhavan</option>
                              <option value="Cotton">Cotton Bhavan</option>
                              <option value="CV Raman">CV Raman</option>
                            </select>
                            <label className="absolute left-4 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Building Name</label>
                          </div>

                          <FloatingInput label="Room / Lab Number" name="roomNo" value={formData.roomNo} onChange={handleChange} icon={<Building className="h-4 w-4" />} />
                        </div>
                      )}

                    </div>

                    <div className="flex gap-3 pt-4 border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => validateStep2() && setStep(3)}
                        className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-1.5 group"
                      >
                        Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CATEGORY SELECTION DROPDOWNS */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-zinc-100 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-zinc-950">Select Defect Type</h3>
                        <p className="text-xs text-zinc-400 mt-1">Select the category and issue type matching the defect.</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Bolt className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      
                      {/* Dropdown 1: Complaint Category */}
                      <div className="relative h-[60px] w-full">
                        <select
                          name="complaintCategory"
                          value={formData.complaintCategory}
                          onChange={handleCategoryChange}
                          className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                          required
                        >
                          <option value="">Select Complaint Category</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Plumbing">Plumbing</option>
                          <option value="Others">Others</option>
                        </select>
                        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                        <label className="absolute left-11 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Complaint Category</label>
                      </div>

                      {/* Dropdown 2: Dependent Issue Type */}
                      {formData.complaintCategory === "Electrical" && (
                        <div className="relative h-[60px] w-full">
                          <select
                            name="issueType"
                            value={formData.issueType}
                            onChange={handleChange}
                            className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                            required
                          >
                            <option value="">Select Electrical Issue</option>
                            <option value="Fan">Fan</option>
                            <option value="Tube Light">Tube Light</option>
                            <option value="Bulb">Bulb</option>
                            <option value="Switch Board">Switch Board</option>
                            <option value="Power Socket">Power Socket</option>
                            <option value="Wiring">Wiring</option>
                            <option value="Power Failure">Power Failure</option>
                            <option value="Fuse">Fuse</option>
                            <option value="MCB">MCB</option>
                            <option value="Other">Other</option>
                          </select>
                          <Settings className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                          <label className="absolute left-11 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Electrical Issue</label>
                        </div>
                      )}

                      {formData.complaintCategory === "Plumbing" && (
                        <div className="relative h-[60px] w-full">
                          <select
                            name="issueType"
                            value={formData.issueType}
                            onChange={handleChange}
                            className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                            required
                          >
                            <option value="">Select Plumbing Issue</option>
                            <option value="Water Leakage">Water Leakage</option>
                            <option value="Water Tap">Water Tap</option>
                            <option value="Pipe Leakage">Pipe Leakage</option>
                            <option value="Water Cooler">Water Cooler</option>
                            <option value="Drinking Water">Drinking Water</option>
                            <option value="Washroom">Washroom</option>
                            <option value="Drainage">Drainage</option>
                            <option value="Toilet Flush">Toilet Flush</option>
                            <option value="Water Tank">Water Tank</option>
                            <option value="Other">Other</option>
                          </select>
                          <Settings className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                          <label className="absolute left-11 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Plumbing Issue</label>
                        </div>
                      )}

                      {formData.complaintCategory === "Others" && (
                        <div className="relative h-[60px] w-full">
                          <select
                            name="issueType"
                            value={formData.issueType}
                            onChange={handleChange}
                            className="w-full h-full pt-4 pb-1 pl-11 pr-4 rounded-2xl border border-zinc-200 bg-white text-sm text-zinc-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                            required
                          >
                            <option value="">Select Other Issue</option>
                            <option value="Furniture Damage">Furniture Damage</option>
                            <option value="Broken Chair">Broken Chair</option>
                            <option value="Broken Desk">Broken Desk</option>
                            <option value="Door">Door</option>
                            <option value="Window">Window</option>
                            <option value="Ceiling Damage">Ceiling Damage</option>
                            <option value="Wall Damage">Wall Damage</option>
                            <option value="Cleaning Issue">Cleaning Issue</option>
                            <option value="Internet Issue">Internet Issue</option>
                            <option value="Other">Other</option>
                          </select>
                          <Settings className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                          <label className="absolute left-11 top-2.5 text-[10px] font-bold text-blue-500 uppercase">Other Issue</label>
                        </div>
                      )}

                    </div>

                    <div className="flex gap-3 pt-4 border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-1/3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => validateStep3() && setStep(4)}
                        className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-1.5 group"
                      >
                        Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: DRAG & DROP FILE UPLOAD */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-zinc-100 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-zinc-950">Upload Evidence</h3>
                        <p className="text-xs text-zinc-400 mt-1">Attach a photograph of the fault for diagnostic inspection.</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ImagePlus className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Drag and Drop Box */}
                    <div className="space-y-2">
                      {!imagePreview && !isUploading ? (
                        <label
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 hover:border-zinc-400/80 rounded-[20px] p-8 cursor-pointer hover:bg-zinc-50/50 transition-all"
                        >
                          <Camera className="h-8 w-8 text-zinc-400 mb-3" />
                          <span className="text-xs font-semibold text-zinc-700">Drag & drop photo here or click to browse</span>
                          <span className="text-[10px] text-zinc-400 mt-2">Supports JPG, PNG up to 5MB</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      ) : isUploading ? (
                        <div className="border border-zinc-200 rounded-[20px] p-8 flex flex-col items-center justify-center space-y-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
                            <Upload className="h-4 w-4 animate-bounce text-blue-500" />
                            <span>Uploading photo... {uploadProgress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <div className="relative rounded-[20px] overflow-hidden border border-zinc-200 max-w-sm aspect-video bg-zinc-50 shadow-sm mx-auto">
                          <img
                            src={imagePreview}
                            alt="Defect Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute right-3 top-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-1/3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={() => validateStep4() && setStep(5)}
                        className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-1.5 group"
                      >
                        Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: REVIEW & SEND */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-zinc-100 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-zinc-950">Review & Submit</h3>
                        <p className="text-xs text-zinc-400 mt-1">Briefly outline the defect details and submit your request.</p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ClipboardCheck className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-bold text-zinc-400 uppercase tracking-wider">Problem Description</label>
                        <span className="font-bold text-zinc-400">{formData.problemDescription.length} / 500</span>
                      </div>
                      <textarea
                        ref={textareaRef}
                        name="problemDescription"
                        value={formData.problemDescription}
                        onChange={handleChange}
                        maxLength={500}
                        placeholder="Provide details about the issue (e.g. fan speeds regulator broken, wiring short-circuited)..."
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none min-h-[80px] overflow-hidden"
                        required
                      />
                    </div>

                    {/* Summary Info Cards */}
                    <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-bold text-zinc-400 uppercase tracking-wider block">Location</span>
                        <span className="text-zinc-800 capitalize mt-1 block">
                          {formData.locationType === "hostel"
                            ? `${formData.hostelType} Hostel • Block ${formData.block} • Room ${formData.roomNo}`
                            : `${formData.collegeBuilding} Building • Room ${formData.roomNo}`}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-zinc-400 uppercase tracking-wider block">Category & Issue</span>
                        <span className="text-zinc-800 capitalize mt-1 block font-bold">{formData.complaintCategory} - {formData.issueType}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="w-1/3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 group"
                      >
                        {loading ? "Submitting Request..." : "File Complaint"}
                        {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Complaint;
