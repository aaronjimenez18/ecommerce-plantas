"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

export default function Journal() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-surface-container-lowest"
      id="journal"
    >
      <motion.div variants={staggerContainer} className="max-w-4xl mx-auto text-center">
        <motion.span variants={fadeUp} className="font-sans text-[11px] text-secondary font-bold uppercase tracking-[0.2em] mb-6 block">
          {t.journal.badge}
        </motion.span>
        <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-[72px] text-primary mb-8 leading-[1.05] tracking-[-0.02em]">
          {t.journal.title1}
          <br />
          <span className="italic text-secondary font-normal">{t.journal.title2}</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-16 leading-[1.7]">
          {t.journal.desc}
        </motion.p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto p-8 glass-panel rounded-[2rem] flex flex-col items-center justify-center space-y-3"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                className="material-symbols-outlined text-4xl text-primary"
              >
                check_circle
              </motion.span>
              <p className="font-serif text-xl text-primary font-medium">{t.journal.success}</p>
              <p className="font-sans text-sm text-secondary">{t.journal.successDesc}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStatus("idle")}
                className="mt-2 text-[11px] text-on-tertiary-container font-bold uppercase tracking-wider gold-underline"
              >
                {t.journal.subscribeAnother}
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center w-full max-w-xl mx-auto gap-6 sm:gap-8"
            >
              <motion.div
                className="w-full border-b border-outline-variant pb-3 relative group transition-colors duration-300 hover:border-primary focus-within:border-primary"
                whileFocus={{ scale: 1.01 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full bg-transparent border-none p-0 font-sans text-lg text-primary placeholder:text-outline focus:ring-0 focus:outline-none text-center sm:text-left disabled:opacity-50"
                  placeholder={t.journal.placeholder}
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="whitespace-nowrap pb-3 text-primary font-sans font-bold text-[13px] hover:text-on-tertiary-fixed-variant transition-colors border-b border-transparent hover:border-gold uppercase tracking-[0.1em] disabled:opacity-50"
              >
                {status === "loading" ? (
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                    {t.journal.loading}
                  </motion.span>
                ) : (
                  t.journal.button
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
