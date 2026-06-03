"use client";

import { useState } from "react";
import { Phone, MessageCircle, Sparkles, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactConcierge() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: "AI Assistant",
      onClick: () => {
        window.location.hash = "chat";
        setOpen(false);
      },
      color: "bg-primary",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      onClick: () => {
        window.open(
          "https://wa.me/923427160092?text=Hi%20Dr.%20Tanveer%2C%20I%27d%20like%20to%20book%20a%20physiotherapy%20appointment.",
          "_blank",
        );
        setOpen(false);
      },
      color: "bg-whatsapp",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Direct Call",
      onClick: () => {
        window.location.href = "tel:03427160092";
        setOpen(false);
      },
      color: "bg-ink",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {open && (
          <div className="flex flex-col items-end gap-3 mb-2">
            {actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 group cursor-pointer"
                onClick={action.onClick}
              >
                <span className="bg-white px-3 py-1.5 rounded-lg border border-border shadow-soft text-[10px] font-black uppercase tracking-widest text-ink opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </span>
                <div
                  className={`w-12 h-12 ${action.color} text-white rounded-full flex items-center justify-center shadow-premium hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-premium transition-all duration-500 ${open ? "bg-ink rotate-45" : "bg-primary"}`}
      >
        {open ? <Plus className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
        {!open && (
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
