"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cart-context";
import { staggerFast, fadeUp } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

export default function CartDrawer() {
  const { t } = useI18n();
  const {
    isOpen,
    closeCart,
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex justify-end"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/20 backdrop-blur-[4px]"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-md h-full bg-ivory shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-7 border-b border-outline-variant/30">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="font-serif text-2xl font-semibold text-primary tracking-tight"
              >
                {t.cart.title}
              </motion.h2>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
                aria-label={t.cart.close}
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-7 space-y-7 scrollbar-thin">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70"
                >
                  <span className="material-symbols-outlined text-5xl text-secondary">shopping_bag</span>
                  <p className="font-serif text-xl italic text-secondary">{t.cart.empty}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeCart}
                    className="mt-4 px-7 py-2.5 border border-primary text-primary rounded-full font-sans font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors"
                  >
                    {t.cart.explore}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerFast}
                  initial="hidden"
                  animate="visible"
                  className="space-y-7"
                >
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      layout
                      className="flex items-start gap-5 pb-7 border-b border-outline-variant/20 last:border-0"
                    >
                      <div className="w-24 h-28 rounded-2xl overflow-hidden bg-surface-container-low flex-shrink-0">
                        <motion.img
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.6 }}
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-serif text-lg font-medium text-primary truncate leading-tight">{item.name}</h3>
                        <p className="font-sans text-sm text-secondary font-bold mt-1.5">€{item.price}</p>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-outline-variant rounded-full p-0.5">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">remove</span>
                            </motion.button>
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="w-8 text-center text-sm font-semibold text-primary"
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">add</span>
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ x: 3 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-error hover:text-error-container hover:underline font-bold tracking-wide transition-colors"
                          >
                            {t.cart.remove}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="p-7 border-t border-outline-variant/30 bg-surface"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-sm text-secondary font-bold uppercase tracking-wider">{t.cart.total}</span>
                    <motion.span
                      key={cartTotal}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="font-serif text-[28px] font-medium text-primary"
                    >
                      €{cartTotal}
                    </motion.span>
                  </div>
                  <p className="font-sans text-[11px] text-secondary leading-relaxed mb-6 opacity-80">
                    {t.cart.shipping}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => alert(t.cart.gracias)}
                    className="w-full py-4 bg-primary text-white rounded-full font-sans font-bold text-sm tracking-[0.1em] uppercase hover:bg-primary-container transition-colors shadow-lg duration-200"
                  >
                    {t.cart.checkout}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
