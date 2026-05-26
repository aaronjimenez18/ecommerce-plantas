"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useI18n();
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-surface border-t border-outline-variant/30 pt-20 sm:pt-24 pb-8 px-4 sm:px-6 md:px-12 lg:px-20"
    >
      <motion.div
        variants={staggerContainer}
        className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 sm:gap-12 mb-16 sm:mb-20"
      >
        <motion.div variants={fadeUp} className="w-full md:w-1/3">
          <motion.a
            href="/"
            whileHover={{ opacity: 0.8 }}
            className="font-serif text-2xl sm:text-[28px] font-semibold text-primary block mb-4 sm:mb-5 transition-opacity"
          >
            Plantas Jiménez
          </motion.a>
          <p className="font-sans text-sm sm:text-[15px] text-secondary leading-[1.7] max-w-sm">
            {t.footer.desc}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-12 sm:gap-16 md:gap-24">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="font-sans text-[11px] font-bold text-primary uppercase tracking-[0.15em] mb-1 sm:mb-2">{t.footer.explore}</h4>
            {[
              { label: t.nav.inicio, href: "/" },
              { label: t.nav.coleccion, href: "/productos" },
              { label: t.nav.blog, href: "/blog" },
              { label: t.nav.cuidados, href: "/cuidados" },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ x: 4 }}
                className="font-sans text-sm sm:text-[15px] text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="font-sans text-[11px] font-bold text-primary uppercase tracking-[0.15em] mb-1 sm:mb-2">{t.footer.nosotros}</h4>
            {[t.footer.historia, t.footer.faq, t.footer.garantia].map((item) => (
              <motion.a
                key={item}
                href={item === "Historia" ? "/#historia" : "#"}
                whileHover={{ x: 4 }}
                className="font-sans text-sm sm:text-[15px] text-secondary hover:text-primary transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-outline-variant/20"
      >
        <p className="font-sans text-xs sm:text-[13px] text-secondary text-center sm:text-left">
          © 2026 Plantas Jiménez. {t.footer.copyright}
        </p>
        <div className="flex gap-6 sm:gap-8">
          {[t.footer.terms, t.footer.contact].map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ opacity: 0.7 }}
              className="font-sans text-xs sm:text-[13px] font-semibold text-secondary hover:text-primary transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.footer>
  );
}
