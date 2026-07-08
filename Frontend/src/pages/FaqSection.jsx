import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How fast will an electrician attend to my complaint?",
    a: "Emergency hazards (like sparks or burning smell) are prioritized and dispatched immediately (within 30 minutes). Standard requests like lights or fans are usually attended to on the same day.",
  },
  {
    q: "Do I need to pay for any electrical repairs?",
    a: "No, all maintenance and standard electrical repairs inside hostels, classrooms, and labs are fully funded by the Aditya Institutional administration.",
  },
  {
    q: "Can I upload a picture of the electrical issue?",
    a: "Yes. When submitting the complaint form, you can optionally drag/drop or select an image from your camera roll. This helps technicians diagnose and bring the correct tools.",
  },
  {
    q: "How will I know when my ticket status is updated?",
    a: "You will see live status updates ('Pending', 'In Progress', 'Fixed') directly on your 'My Complaints' dashboard page. In addition, an email notification is automatically triggered.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-white border-t border-zinc-200/50 font-jakarta relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            System FAQs
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-zinc-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm text-zinc-500">
            Find quick answers to common queries regarding complaint logging, response time, and technician support.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-50 rounded-2xl border border-zinc-200/60 overflow-hidden transition-all duration-300 hover:border-zinc-300"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none"
                >
                  <span className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="h-4 w-4 text-zinc-400 flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-zinc-500 leading-relaxed border-t border-zinc-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
