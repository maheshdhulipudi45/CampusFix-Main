import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Mail, Phone, Clock, MapPin, Globe, Send } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-zinc-50 border-t border-zinc-200/80 overflow-hidden font-jakarta">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      {/* Main Footer Grid */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10"
      >
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20">
              <Zap className="h-5 w-5 fill-white stroke-none" />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-bold text-zinc-950 tracking-tight">CampusFix</h1>
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Electrical Service
              </p>
            </div>
          </Link>

          <p className="text-sm text-zinc-500 leading-relaxed text-justify max-w-sm">
            CampusFix is the internal electrical complaint and maintenance management platform built exclusively for Aditya Educational Institutions, keeping academic campus infrastructures running flawlessly.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2.5 pt-2">
            {[
              {
                icon: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                url: "#",
              },
              {
                icon: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
                url: "#",
              },
              {
                icon: (
                  <svg className="h-4 w-4 fill-none stroke-currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                url: "#",
              },
              { icon: <Globe className="h-4 w-4" />, url: "https://aditya.ac.in" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-blue-600 hover:border-blue-600/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-950 uppercase tracking-wider">
            Quick Access
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Home Base", to: "/home" },
              { label: "Report Issue", to: "/complaint" },
              { label: "My Complaints", to: "/my-complaints" },
              { label: "Contact Support", to: "/contact" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.to}
                  className="text-zinc-500 hover:text-zinc-950 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact details */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-950 uppercase tracking-wider">
            Service Desk
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex gap-2.5">
              <Phone className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-zinc-400 text-xs">Helpdesk Line</p>
                <p className="font-semibold text-zinc-800">+91 7658956116</p>
              </div>
            </li>
            <li className="flex gap-2.5">
              <Mail className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-zinc-400 text-xs">Support Email</p>
                <p className="font-semibold text-zinc-800">campusfix@aditya.ac.in</p>
              </div>
            </li>
            <li className="flex gap-2.5">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-zinc-400 text-xs">Hours & Operations</p>
                <p className="font-semibold text-zinc-800">Mon-Sat (8AM - 6PM)</p>
                <p className="text-[10px] text-orange-500 font-medium">Emergency: 24/7 Support</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-950 uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Subscribe for campus maintenance updates and guidelines.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white pl-4 pr-10 py-2.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-green-600 font-semibold animate-pulse">
                ✓ Thanks for subscribing!
              </p>
            )}
          </form>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-200/60 bg-zinc-100/50 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 text-center md:text-left">
            © {new Date().getFullYear()} Aditya Educational Institutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <Link to="#" className="hover:text-zinc-600 transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-zinc-600 transition">Terms of Service</Link>
            <Link to="/aboutsection" className="hover:text-zinc-600 transition">System Overview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
