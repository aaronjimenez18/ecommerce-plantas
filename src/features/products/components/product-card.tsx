"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCart } from "@/features/cart/context/cart-context";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  label?: string;
  aspectRatio?: string;
  index?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  tag,
  label,
  aspectRatio = "aspect-[4/5]",
  index = 0,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col relative cursor-pointer"
    >
      <div className={`relative w-full ${aspectRatio} rounded-[2rem] bg-surface-container-low overflow-hidden mb-6 flex items-center justify-center p-10 transition-all duration-700 group-hover:shadow-2xl`}>
        {label && (
          <span className="absolute top-5 left-5 px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-full font-sans font-bold text-[10px] uppercase tracking-[0.1em] z-10">
            {label}
          </span>
        )}

        <img
          alt={name}
          className="w-full h-full object-cover mix-blend-multiply drop-shadow-2xl group-hover:scale-[1.06] transition-transform duration-[800ms] ease-out"
          src={image}
        />

        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500" />

        <button
          onClick={handleAdd}
          className="absolute bottom-5 right-5 w-14 h-14 rounded-full bg-surface/90 backdrop-blur-md shadow-lg flex items-center justify-center text-primary opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary hover:text-on-primary active:scale-90"
          aria-label={`Añadir ${name} al carrito`}
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      <div className="flex justify-between items-end group-hover:-translate-y-1.5 transition-transform duration-500">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-secondary mb-1.5 font-bold">{tag}</p>
          <h3 className="font-serif text-2xl md:text-[28px] text-primary font-medium leading-tight">{name}</h3>
        </div>
        <p className="font-sans text-base text-primary font-bold">€{price}</p>
      </div>
    </motion.div>
  );
}
