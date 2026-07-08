import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, Shield, Eye, Settings } from "lucide-react";

const slides = [
  {
    icon: <Settings className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=1600&auto=format&fit=crop",
    title: "Professional Campus Electrical Management",
    description: "Certified technicians maintaining safe campus infrastructure, keeping academic blocks fully powered.",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1600&auto=format&fit=crop",
    title: "Real-Time Monitoring & Tracking",
    description: "Live complaint status updates and system transparency from submission to technician sign-off.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1600&auto=format&fit=crop",
    title: "Preventive Infrastructure Audits",
    description: "Systematic monthly checks and scheduled inspections to prevent power failures before they arise.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1605809715103-62584177d8a6?q=80&w=1600&auto=format&fit=crop",
    title: "Emergency 24/7 Response",
    description: "Critical response protocol for electrical hazards, short circuits, and blackout emergencies.",
  },
];

const HeroSection2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="py-24 px-6 bg-white font-jakarta overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.03),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            System Operations
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            How We Protect Our Campus
          </h2>
          <p className="mt-4 text-base text-zinc-500">
            A comprehensive, digital-first approach to electrical maintenance and emergency response across all Aditya campus locations.
          </p>
        </motion.div>

        {/* Dynamic Bento Layout Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Navigation Tab Panel */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-3 order-2 lg:order-1">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300 border ${
                  idx === currentSlide
                    ? "bg-white border-zinc-200 shadow-md shadow-zinc-100/40 translate-x-2"
                    : "bg-transparent border-transparent hover:bg-zinc-100/50"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-colors ${
                    idx === currentSlide
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-200/60 text-zinc-600"
                  }`}
                >
                  {slide.icon}
                </div>
                <div>
                  <h4
                    className={`text-sm font-bold transition-colors ${
                      idx === currentSlide ? "text-zinc-900" : "text-zinc-500"
                    }`}
                  >
                    {slide.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                    {slide.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Screen Display Container */}
          <div className="lg:col-span-8 relative rounded-3xl border border-zinc-200/80 bg-white p-3 shadow-xl overflow-hidden order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-[6000ms] scale-105"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/10 to-transparent" />

                  {/* Absolute Caption Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur text-[10px] font-bold uppercase tracking-wider mb-2">
                      Topic {currentSlide + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-200 mt-1.5 leading-relaxed">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Arrow controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60 transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
