"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "@/features/cart/context/cart-context";
import { useI18n } from "@/lib/i18n/context";
import { staggerContainer, fadeUp } from "@/lib/utils/animations";

export default function Hero() {
  const { addToCart } = useCart();
  const { t } = useI18n();

  const handleAddFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: "hortensia-magica",
      name: "Hortensia Mágica",
      price: 55,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAv5t83TvDHo1nXr5ba1MgcGg5rIyADmUG7fcfsY5dhKIaL0Kt2IxFBzk5OBLswAZLE005ZVe2xuzCQ0TtOqV3ZhSyM2hubaNw1Kp6u6VZuODSutqAYU7ebXrlY88LiMrvGMmuHconMQfP0btMMc3IoVLZXBI26vUjJVBFBmpKWkzkaXFMp5GkrHciS-4yik1qF_49uYbyoDG9HtiCpUqWqfldUbs0vzs8K1NmTFHeNa45wyhNQ713u6u_DiX7f2PYfsl9Zigq9Oc7b",
    });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface-container-lowest z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-10 sm:gap-12 lg:gap-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-primary-fixed/40 text-on-primary-fixed font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.08em] uppercase mb-6 sm:mb-0">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[76px] text-primary leading-[1.05] tracking-[-0.02em] mt-6"
          >
            {t.hero.title1}
            <br className="hidden md:block" />
            <span className="text-secondary italic font-normal">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-sans text-sm sm:text-base md:text-lg text-on-surface-variant max-w-lg leading-[1.7] mt-5 sm:mt-6"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 w-full sm:w-auto"
          >
            <a
              href="/productos"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-on-primary rounded-full font-sans font-bold text-[12px] sm:text-[13px] tracking-wide hover:bg-on-primary-fixed-variant transition-colors duration-300 ambient-shadow"
            >
              {t.hero.cta}
            </a>
            <a
              href="/cuidados"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 border border-outline-variant text-primary rounded-full font-sans font-medium text-[12px] sm:text-[13px] tracking-wide hover:bg-surface-container hover:border-outline transition-all duration-300"
            >
              <span className="material-symbols-outlined mr-2 text-lg">play_circle</span>
              {t.hero.cta2}
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex gap-8 sm:gap-12 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-outline-variant/30 w-full justify-center md:justify-start"
          >
            <div>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary font-medium">50+</p>
              <p className="font-sans text-[10px] sm:text-[11px] text-secondary font-bold uppercase tracking-[0.1em] mt-1">{t.hero.stat1}</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary font-medium">100%</p>
              <p className="font-sans text-[10px] sm:text-[11px] text-secondary font-bold uppercase tracking-[0.1em] mt-1">{t.hero.stat2}</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex-1 w-full relative max-w-lg md:max-w-none"
        >
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-[3/4] shadow-2xl z-10 w-full md:w-[85%] md:ml-auto">
            <motion.img
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
              alt="Hortensia de temporada"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-[1200ms] ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv5t83TvDHo1nXr5ba1MgcGg5rIyADmUG7fcfsY5dhKIaL0Kt2IxFBzk5OBLswAZLE005ZVe2xuzCQ0TtOqV3ZhSyM2hubaNw1Kp6u6VZuODSutqAYU7ebXrlY88LiMrvGMmuHconMQfP0btMMc3IoVLZXBI26vUjJVBFBmpKWkzkaXFMp5GkrHciS-4yik1qF_49uYbyoDG9HtiCpUqWqfldUbs0vzs8K1NmTFHeNa45wyhNQ713u6u_DiX7f2PYfsl9Zigq9Oc7b"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 glass-panel rounded-2xl p-3 sm:p-4 flex justify-between items-center"
            >
              <div className="min-w-0 flex-1 mr-2">
                <p className="font-sans text-on-tertiary-container uppercase tracking-[0.15em] text-[8px] sm:text-[9px] font-bold">{t.hero.featured}</p>
                <h3 className="font-serif text-base sm:text-lg text-primary leading-tight mt-0.5 font-medium truncate">{t.hero.featuredName}</h3>
              </div>
              <button
                onClick={handleAddFeatured}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 flex-shrink-0"
                title="Añadir al carrito"
              >
                <span className="material-symbols-outlined text-sm sm:text-base">shopping_cart</span>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="absolute top-1/4 left-0 w-[35%] md:w-[40%] aspect-square rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-background -translate-x-1/4 hidden md:block"
          >
            <img
              alt="Detalle botánico"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiXmFH7nyR1C3z20uDNfsMxgiNpy6Kw2iUf-o8WzbMjFEcr75g691vWYJj5nzaSgNAmxSxNvJ6iDbiGDKjnNprMM0-a6CpnPGYkwiLJSGMgNrbtprJTw1eEkKfCAJxrT6FusA9pdmqG8eek0algo83Z0v33BaAAb2JR3AqJZ6JKsc8zDu9haRERxt4ubsJ-igjhPcMIDDceDxmUJx6dbzXyz4_-1xNYQUCnM-6_zlGPQRv_MTby92KAfeddmZY8snPDQbn7zMF6Mm0"
            />
          </motion.div>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-fixed/15 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </header>
  );
}
