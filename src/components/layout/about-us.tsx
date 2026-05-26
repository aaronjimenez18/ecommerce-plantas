"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, slideRight, slideLeft, badgeReveal } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

export default function AboutUs() {
  const { t } = useI18n();
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 lg:px-20 bg-surface"
      id="historia"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-10 sm:gap-12 lg:gap-24">
        <motion.div variants={slideRight} className="flex-1 w-full relative">
          <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-xl z-10">
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              alt="Invernadero Plantas Jimenez"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8HvuwxgrAZuvYz2JkQVfWWixGfGr-923oGDr3Urd07dcAVwz3y6gnvItfuX3JjUHQebXO2SwwWSrCRLdDqDcwxcYUOIBKypFzRZKTpAV_BImp_S95obpe2gQ9EyAvtasMeZQeAt4Ur488G_EN8b_oHSIr0v5vKSzLbPAs3DFIOHgz9MTFmU7UvTivqp1ovRXx_M8HADgJkRAuHDACIhHhYqr4VNue7ogNsUbft30WyMI7orB0so2gT32RlKab3oVkc7n47-c7ulCM"
            />
          </div>
          <motion.div
            variants={badgeReveal}
            className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-primary-container rounded-full flex flex-col items-center justify-center z-20 ring-[4px] sm:ring-[5px] ring-background shadow-xl"
          >
            <p className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-on-primary-container/70">{t.about.desde}</p>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-tertiary-fixed-dim leading-none mt-0.5">1985</p>
          </motion.div>
        </motion.div>

        <motion.div variants={slideLeft} className="flex-1">
          <motion.span variants={fadeUp} className="font-sans text-[11px] text-on-tertiary-container font-bold uppercase tracking-[0.15em] mb-4 sm:mb-5 block">
            {t.about.badge}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl md:text-[48px] text-primary mb-5 sm:mb-7 leading-[1.1] tracking-[-0.01em]">
            {t.about.title1}
            <br />
            <span className="italic text-secondary font-normal">{t.about.title2}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm sm:text-base text-on-surface-variant mb-4 sm:mb-5 leading-[1.75]">
            {t.about.p1}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-sm sm:text-base text-on-surface-variant mb-6 sm:mb-8 leading-[1.75]">
            {t.about.p2}
          </motion.p>
          <motion.a
            variants={fadeUp}
            whileHover={{ x: 5 }}
            href="/blog"
            className="inline-flex items-center text-primary font-sans font-bold text-[13px] gold-underline hover:text-on-tertiary-fixed-variant transition-colors"
          >
            {t.about.cta}
            <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
