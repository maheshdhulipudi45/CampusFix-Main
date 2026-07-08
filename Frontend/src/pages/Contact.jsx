import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Phone, Mail, MapPin, AlertTriangle, Clock, Send } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.emailAddress || !formData.subject || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      setFormData({ fullName: "", emailAddress: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactCards = [
    {
      title: "Phone Support",
      icon: <Phone className="h-5 w-5 text-blue-600" />,
      info: ["+91 7658956116", "+91 9030445369", "24/7 Hotline"],
    },
    {
      title: "Email Support",
      icon: <Mail className="h-5 w-5 text-purple-600" />,
      info: ["support@campusfix.edu", "Reply within 2–4 hours"],
    },
    {
      title: "Campus Location",
      icon: <MapPin className="h-5 w-5 text-emerald-600" />,
      info: ["Maintenance Office", "Admin Block – Ground Floor"],
    },
    {
      title: "Emergency Hours",
      icon: <AlertTriangle className="h-5 w-5 text-rose-600" />,
      info: ["24/7 Critical Issues", "Priority response"],
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F8FAFC] border-t border-zinc-200/50 font-jakarta relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {/* Ambience patterns */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Support Desk
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Contact CampusFix Help
          </h2>
          <p className="mt-4 text-sm text-zinc-500">
            Get in touch with the electrical maintenance office for general inquiries, feedback, or assistance.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100">
                {card.icon}
              </div>
              <h3 className="font-bold text-zinc-950 text-sm mb-2">
                {card.title}
              </h3>
              {card.info.map((text, idx) => (
                <p key={idx} className="text-xs text-zinc-500 leading-normal">
                  {text}
                </p>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Form */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-xl"
          >
            <h3 className="text-lg font-bold text-zinc-950 mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    placeholder="Enter your email"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 mt-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending message..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Emergency Hotline Alert */}
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                <AlertTriangle className="h-24 w-24 text-rose-500" />
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  Emergency Hotline
                </h4>
                <p className="text-[10px] text-rose-600 mt-2.5 leading-relaxed">
                  For immediate electrical hazards, exposed wiring, or blackouts, call the emergency maintenance desk immediately.
                </p>
              </div>
              <a
                href="tel:+917658956116"
                className="w-full bg-rose-600 text-white py-2.5 rounded-xl text-center text-xs font-semibold hover:bg-rose-700 transition"
              >
                Call Emergency Line
              </a>
            </div>

            {/* Expected Response Times Card */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
              <h4 className="flex items-center gap-2 font-bold text-zinc-950 text-sm mb-4">
                <Clock className="h-4 w-4 text-blue-600" />
                Response Protocols
              </h4>
              <ul className="text-xs text-zinc-600 space-y-3">
                <li className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  <span className="font-semibold text-zinc-800">Emergency:</span>
                  <span>within 30 minutes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="font-semibold text-zinc-800">Critical:</span>
                  <span>within 1.5 hours</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="font-semibold text-zinc-800">Standard:</span>
                  <span>same-day service</span>
                </li>
              </ul>
            </div>

            {/* Google Maps Placeholder */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-4 shadow-sm overflow-hidden">
              <h4 className="flex items-center gap-2 font-bold text-zinc-950 text-sm mb-3">
                <MapPin className="h-4 w-4 text-blue-600" />
                Office Location
              </h4>
              <div className="w-full h-32 rounded-xl bg-zinc-50 border border-zinc-200 relative flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-blue-100/30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 flex flex-col items-center gap-1 text-center px-4">
                  <span className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs animate-bounce shadow shadow-blue-500/20">
                    📍
                  </span>
                  <p className="text-[10px] font-bold text-zinc-700">Aditya Admin Block, Ground Floor</p>
                  <p className="text-[9px] text-zinc-400">Main Maintenance Office Desk</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
