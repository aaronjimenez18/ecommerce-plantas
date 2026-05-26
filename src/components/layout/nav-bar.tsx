"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/features/cart/context/cart-context";
import { useI18n } from "@/lib/i18n/context";
import { fadeUp, staggerFast } from "@/lib/utils/animations";

export default function NavBar() {
  const { openCart, cartCount } = useCart();
  const { t, lang, toggleLang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={hasLoaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 md:px-8"
      >
        <nav
          className={`w-full transition-all duration-500 ease-in-out flex items-center ${
            isScrolled
              ? "max-w-[1100px] mt-3 sm:mt-4 px-5 sm:px-8 md:px-12 py-2.5 sm:py-3 glass-nav rounded-full shadow-lg"
              : "max-w-[1400px] mt-5 sm:mt-6 px-4 sm:px-8 md:px-16 py-3 sm:py-4 bg-transparent border-transparent"
          }`}
        >
          <motion.a
            href="/"
            whileHover={{ opacity: 0.75 }}
            transition={{ duration: 0.3 }}
            className={`font-serif font-semibold text-primary tracking-[-0.02em] transition-all duration-500 flex-shrink-0 ${
              isScrolled ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-[22px] md:text-[28px]"
            }`}
          >
            Plantas Jiménez
          </motion.a>

          {/* Centered desktop links */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            <a
              href="/"
              className="px-5 py-2 rounded-full font-sans text-[13px] font-medium tracking-wide transition-all duration-300 text-secondary hover:text-primary hover:bg-[#252525] hover:text-white"
            >
              {t.nav.inicio}
            </a>
            <a
              href="/productos"
              className="px-5 py-2 rounded-full font-sans text-[13px] font-medium tracking-wide transition-all duration-300 text-secondary hover:text-primary hover:bg-[#252525] hover:text-white"
            >
              {t.nav.coleccion}
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className={`font-sans font-bold text-[10px] tracking-wider rounded-full transition-all duration-300 border ${
                isScrolled
                  ? "px-3 py-1.5 text-primary border-outline-variant hover:bg-surface-container-high"
                  : "px-4 py-2 text-primary border-outline-variant/60 hover:bg-surface-container-low"
              }`}
              aria-label="Toggle language"
            >
              {lang === "es" ? "EN" : "ES"}
            </motion.button>

            <motion.button
              onClick={openCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t.nav.verCarrito}
              className={`relative flex items-center justify-center text-primary rounded-full transition-all duration-300 hover:bg-surface-container-high/60 ${
                isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-10 h-10 sm:w-12 sm:h-12"
              }`}
            >
              <span
                className={`material-symbols-outlined transition-all duration-500 ${
                  isScrolled ? "text-[18px] sm:text-[20px]" : "text-[22px] sm:text-[24px]"
                }`}
              >
                shopping_bag
              </span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`absolute bg-gold text-white font-bold rounded-full flex items-center justify-center ring-2 ring-background transition-all duration-500 ${
                      isScrolled
                        ? "-top-1 -right-1 text-[8px] sm:text-[9px] w-3.5 h-3.5 sm:w-4 sm:h-4"
                        : "top-0 right-0 text-[9px] sm:text-[10px] w-4 h-4 sm:w-5 sm:h-5"
                    }`}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "Cerrar Menú" : "Abrir Menú"}
              className={`md:hidden flex items-center justify-center text-primary rounded-full transition-all duration-300 hover:bg-surface-container-high/60 ${
                isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-10 h-10 sm:w-12 sm:h-12"
              }`}
            >
              <span
                className={`material-symbols-outlined transition-all duration-500 ${
                  isScrolled ? "text-[20px] sm:text-[22px]" : "text-[24px] sm:text-[26px]"
                }`}
              >
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </motion.button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/30 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 w-full sm:w-4/5 max-w-sm h-full bg-ivory flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 sm:p-6 pb-2">
                <span className="font-serif text-lg sm:text-xl font-semibold text-primary">Menú</span>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-lg sm:text-xl text-primary">close</span>
                </motion.button>
              </div>

              <motion.div
                variants={staggerFast}
                initial="hidden"
                animate="visible"
                className="flex-1 px-5 sm:px-6 py-6 sm:py-8"
              >
                <ul className="flex flex-col gap-1">
                  {[
                    { label: t.nav.inicio, href: "/" },
                    { label: t.nav.coleccion, href: "/productos" },
                  ].map((item) => (
                    <motion.li key={item.href} variants={fadeUp}>
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 sm:py-3.5 px-4 rounded-2xl font-sans text-base font-medium text-primary hover:bg-surface-container-low transition-colors"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <hr className="my-6 mx-4 border-outline-variant/20" />

                <button
                  onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
                  className="w-full py-3.5 px-4 rounded-2xl font-sans text-base font-medium text-primary hover:bg-surface-container-low transition-colors text-left flex items-center justify-between"
                >
                  <span>Idioma / Language</span>
                  <span className="text-lg">{lang === "es" ? "EN" : "ES"}</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="p-5 sm:p-6 pt-0 space-y-3 border-t border-outline-variant/20 mt-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className="w-full py-3 sm:py-3.5 bg-primary text-on-primary rounded-full font-sans font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-lg">shopping_bag</span>
                  {t.nav.verCarrito} {cartCount > 0 && `(${cartCount})`}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
