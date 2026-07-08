import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Zap, Menu, X, LogOut, LayoutDashboard, FileSpreadsheet, User, 
  Home, Info, Mail, Bell, Search, ChevronDown, CheckCircle2, 
  AlertCircle, Wrench, Settings, Sun, Moon, ClipboardPlus, 
  ClipboardCheck, UserRound, CircleHelp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Student Profile details from API to display on mobile menu header
  const [studentDetails, setStudentDetails] = useState({
    name: "Campus User",
    id: "21B01A02",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!token;

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Load profile details dynamically
  useEffect(() => {
    if (!token || !userId) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/complaints/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStudentDetails({
            name: data[0].fullName || "Campus User",
            id: data[0].userId || "21B01A02",
          });
        }
      })
      .catch(() => {});
  }, [token, userId]);

  // Click outside listener for notifications, search, profile, and mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (searchQuery === "") {
          setIsSearchExpanded(false);
        }
      }
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsMenuOpen(false);
    setShowProfileMenu(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // Desktop Navigation Link Item
  const NavLinkItem = ({ path, label, icon }) => {
    const active = isActive(path);
    return (
      <Link
        to={path}
        className={`relative py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-0.5 ${
          active ? "text-blue-600" : "text-zinc-600 hover:text-zinc-950"
        }`}
      >
        {icon}
        <span>{label}</span>
        {active && (
          <motion.div
            layoutId="activeUnderline"
            className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-600 rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  // Mobile list-style menu item
  const MobileDrawerItem = ({ path, label, icon }) => {
    const active = isActive(path);
    return (
      <Link
        to={path}
        onClick={() => setIsMenuOpen(false)}
        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
          active 
            ? "bg-[#0052FF]/5 text-[#0052FF] shadow-sm border-l-4 border-[#0052FF] font-bold" 
            : "text-zinc-600 hover:bg-zinc-50/50 hover:text-zinc-950 hover:translate-x-1"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border transition-all duration-300 ${
            active ? "bg-gradient-to-r from-[#0052FF] to-[#635BFF] text-white border-[#0052FF]/10 shadow shadow-blue-500/10" : "bg-zinc-50 border-zinc-150 text-zinc-400"
          }`}>
            {icon}
          </div>
          <span className="text-xs font-bold tracking-tight uppercase tracking-wider">{label}</span>
        </div>
        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF]" />}
      </Link>
    );
  };

  const sampleNotifications = [
    { id: 1, title: "Complaint Fixed", desc: "Your classroom light defect has been resolved.", time: "10m ago" },
    { id: 2, title: "Technician Dispatched", desc: "Electrician assigned to ticket #CFX-109.", time: "1h ago" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/85 shadow-md py-2.5"
          : "bg-white/85 backdrop-blur-md border-b border-zinc-200/30 shadow-sm py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#0052FF] to-[#635BFF] text-white font-bold transition-transform group-hover:scale-105 group-hover:rotate-12 shadow-md shadow-blue-500/20">
            <Zap className="h-5 w-5 fill-white stroke-none" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-extrabold text-zinc-950 tracking-tight font-jakarta">
              CampusFix
            </h1>
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
              Electrical Service
            </p>
          </div>
        </Link>

        {/* DESKTOP CENTER NAVIGATION */}
        <div className="hidden md:flex items-center gap-1.5">
          {!isLoggedIn && (
            <>
              <NavLinkItem path="/home" label="Home" icon={<Home className="h-3.5 w-3.5" />} />
              <NavLinkItem path="/aboutsection" label="About" icon={<Info className="h-3.5 w-3.5" />} />
              <NavLinkItem path="/ourservices" label="Services" icon={<Wrench className="h-3.5 w-3.5" />} />
              <NavLinkItem path="/contact" label="Contact" icon={<Mail className="h-3.5 w-3.5" />} />
            </>
          )}

          {isLoggedIn && role === "student" && (
            <>
              <NavLinkItem path="/home" label="Home" icon={<Home className="h-3.5 w-3.5" />} />
              <NavLinkItem path="/complaint" label="Report Issue" icon={<Wrench className="h-3.5 w-3.5" />} />
              <NavLinkItem path="/my-complaints" label="Track Complaint" icon={<FileSpreadsheet className="h-3.5 w-3.5" />} />
            </>
          )}

          {isLoggedIn && role === "admin" && (
            <>
              <NavLinkItem path="/admin-dashboard" label="Dashboard" icon={<LayoutDashboard className="h-3.5 w-3.5" />} />
              <NavLinkItem path="/admin-complaints" label="Complaints" icon={<FileSpreadsheet className="h-3.5 w-3.5" />} />
            </>
          )}
        </div>

        {/* DESKTOP RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Expandable Search Input */}
          <div ref={searchRef} className="relative flex items-center">
            <motion.div
              animate={{ width: isSearchExpanded ? 200 : 36 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="h-9 flex items-center rounded-xl bg-zinc-100 border border-zinc-200/40 overflow-hidden"
            >
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="h-9 w-9 flex items-center justify-center text-zinc-500 hover:text-zinc-950 flex-shrink-0"
              >
                <Search className="h-4 w-4" />
              </button>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-zinc-900 pr-8"
              />
              {isSearchExpanded && searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          </div>

          {/* Notifications Icon and Popover */}
          {isLoggedIn && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="h-9 w-9 flex items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 transition-colors relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-zinc-200/80 rounded-2xl shadow-xl p-4 overflow-hidden z-50 text-left"
                  >
                    <h4 className="text-xs font-bold text-zinc-900 mb-3 uppercase tracking-wider">Notifications</h4>
                    <div className="space-y-3">
                      {sampleNotifications.map((n) => (
                        <div key={n.id} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-zinc-50 transition-all cursor-pointer">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-zinc-950">{n.title}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">{n.desc}</p>
                            <p className="text-[9px] text-zinc-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="h-9 w-9 flex items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Profile Dropdown */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-[#0052FF] to-[#635BFF] text-white shadow-md shadow-blue-500/10 hover:opacity-95 transition-all duration-300"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pr-2.5 rounded-xl border border-zinc-200/60 bg-zinc-50/50 hover:bg-zinc-100/50 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[#0052FF] to-[#635BFF] text-white font-extrabold text-xs uppercase shadow shadow-[#0052FF]/20">
                  {role[0]}
                </div>
                <span className="text-xs font-bold text-zinc-700 capitalize">{role}</span>
                <ChevronDown className="h-3 w-3 text-zinc-400 transition-transform" style={{ transform: showProfileMenu ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200/80 rounded-2xl shadow-xl p-2 z-50 text-left"
                  >
                    <div className="p-3 border-b border-zinc-100 mb-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Account type</p>
                      <p className="text-xs font-bold text-zinc-950 capitalize">{role}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate(role === "admin" ? "/admin-dashboard" : "/home");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors text-left"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5 text-zinc-400" /> Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/profile");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors text-left"
                    >
                      <User className="h-3.5 w-3.5 text-zinc-400" /> Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/profile");
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors text-left"
                    >
                      <Settings className="h-3.5 w-3.5 text-zinc-400" /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left border-t border-zinc-100 mt-1"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          ref={hamburgerRef}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
          className="md:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>

    {/* PREMIUM 2026 ENTERPRISE MOBILE TOP SHEET (Rendered as sibling to nav to avoid contain block clipping) */}
    <AnimatePresence>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-start">
          
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Slide-down top sheet container */}
          <motion.div
            ref={menuRef}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative w-full bg-white rounded-b-[24px] shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Header Profile bar */}
            <div className="bg-gradient-to-r from-[#0052FF] to-[#635BFF] pt-9 pb-5 px-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                {isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white text-[#0052FF] flex items-center justify-center font-extrabold text-base border-2 border-white/20 shadow relative">
                      {role[0].toUpperCase()}
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white animate-pulse" />
                    </div>
                    <div className="text-left">
                      <p className="font-extrabold text-sm leading-tight">{studentDetails.name}</p>
                      <p className="text-[10px] text-blue-100/80 font-bold uppercase tracking-wider mt-0.5">ID: {studentDetails.id}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                      <Zap className="h-4.5 w-4.5 fill-white stroke-none" />
                    </div>
                    <span className="font-extrabold text-xs tracking-wider uppercase">CampusFix Mobile</span>
                  </div>
                )}

                {/* Close button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="h-8 w-8 rounded-full bg-white/15 border border-white/10 flex items-center justify-center transition-transform hover:rotate-90 duration-300"
                >
                  <X className="h-4.5 w-4.5 text-white" />
                </button>
              </div>
            </div>

            {/* Mobile Adapted List Menu */}
            <div className="flex flex-col gap-1.5 p-5 overflow-y-auto max-h-[50vh] bg-zinc-50/50">
              <h4 className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest px-3 mb-1 select-none">Main Menu</h4>
              
              {!isLoggedIn ? (
                <>
                  <MobileDrawerItem path="/home" label="Home" icon={<Home className="h-4.5 w-4.5" />} />
                  <MobileDrawerItem path="/aboutsection" label="About" icon={<Info className="h-4.5 w-4.5" />} />
                  <MobileDrawerItem path="/ourservices" label="Services" icon={<Wrench className="h-4.5 w-4.5" />} />
                  <MobileDrawerItem path="/contact" label="Contact" icon={<Mail className="h-4.5 w-4.5" />} />
                </>
              ) : (
                <>
                  <MobileDrawerItem path="/home" label="Home" icon={<Home className="h-4.5 w-4.5" />} />
                  <MobileDrawerItem path="/complaint" label="Report Issue" icon={<ClipboardPlus className="h-4.5 w-4.5" />} />
                  <MobileDrawerItem 
                    path={role === "admin" ? "/admin-complaints" : "/my-complaints"} 
                    label="Track Complaint" 
                    icon={<ClipboardCheck className="h-4.5 w-4.5" />} 
                  />
                  <MobileDrawerItem 
                    path={role === "admin" ? "/admin-dashboard" : "/home"} 
                    label="Dashboard" 
                    icon={<LayoutDashboard className="h-4.5 w-4.5" />} 
                  />
                </>
              )}

              {isLoggedIn && (
                <>
                  <div className="h-[1px] bg-zinc-200/60 my-2" />
                  <h4 className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest px-3 mb-1 select-none">Account & Settings</h4>
                  <MobileDrawerItem path="/profile" label="User Profile" icon={<UserRound className="h-4.5 w-4.5" />} />
                  <MobileDrawerItem path="/profile" label="System Alerts" icon={<Bell className="h-4.5 w-4.5" />} />
                </>
              )}

              <div className="h-[1px] bg-zinc-200/60 my-2" />
              <h4 className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest px-3 mb-1 select-none">Support</h4>
              <MobileDrawerItem path="/contact" label="Help & Support" icon={<CircleHelp className="h-4.5 w-4.5" />} />
            </div>

            {/* Sticky bottom Footer info and logout */}
            <div className="p-4 border-t border-zinc-200/60 bg-white flex flex-col gap-4">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-extrabold uppercase px-2">
                <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded capitalize">Role: {role || "Guest"}</span>
                <span>Session: Active</span>
                <span>CampusFix v2.0</span>
              </div>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-rose-500/10 hover:shadow-lg hover:shadow-rose-500/20 active:scale-[0.99] transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  Logout Account
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-blue-500/10 hover:from-blue-500 hover:to-indigo-500 transition-all text-center"
                >
                  Sign In to Portal
                </Link>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
  );
};

export default Navbar;
