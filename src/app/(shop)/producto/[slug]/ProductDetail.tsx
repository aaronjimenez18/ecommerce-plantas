"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/features/cart/context/cart-context";
import { useI18n } from "@/lib/i18n/context";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    comparePrice: number | null;
    images: string[];
    category: string;
    tags: string[];
    stock: number;
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { t } = useI18n();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "",
      });
    }
  };

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <section className="min-h-screen pt-36 pb-32 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* ── Images ── */}
          <motion.div variants={fadeUp} className="space-y-4">
            <div className="relative rounded-[2rem] overflow-hidden bg-surface-container-low aspect-[4/5] flex items-center justify-center p-12">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[selectedImage] || ""}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply drop-shadow-2xl"
              />
              {discount > 0 && (
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-error text-on-error rounded-full font-sans font-bold text-[10px] uppercase tracking-[0.1em]">
                  -{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImage
                        ? "border-primary opacity-100"
                        : "border-transparent opacity-60 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Info ── */}
          <motion.div variants={fadeUp} className="flex flex-col justify-center">
            <span className="font-sans text-[11px] text-on-tertiary-container font-bold uppercase tracking-[0.15em] mb-3 block">
              {product.category}
            </span>

            <h1 className="font-serif text-4xl md:text-[56px] text-primary leading-[1.05] tracking-[-0.02em] mb-6">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-serif text-4xl md:text-5xl text-primary font-medium">
                €{product.price}
              </span>
              {product.comparePrice && (
                <span className="font-sans text-lg text-secondary line-through">
                  €{product.comparePrice}
                </span>
              )}
            </div>

            <p className="font-sans text-base text-on-surface-variant leading-[1.7] mb-8 max-w-lg">
              {product.description}
            </p>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-container-low text-secondary rounded-full font-sans text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-sm text-secondary font-bold uppercase tracking-wider">
                Stock: {product.stock > 0 ? `${product.stock} ${t.productDetail.stock}` : t.productDetail.soldOut}
              </span>
            </div>

            {product.stock > 0 && (
              <>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center border border-outline-variant rounded-full p-0.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <span className="w-12 text-center font-semibold text-primary">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdd}
                    className="flex-1 max-w-xs px-8 py-4 bg-primary text-on-primary rounded-full font-sans font-bold text-[13px] tracking-wide hover:bg-on-primary-fixed-variant transition-colors ambient-shadow flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined text-lg">shopping_cart</span>
                    {t.productDetail.addToCart}
                  </motion.button>
                </div>
              </>
            )}

            <a
              href="/productos"
              className="inline-flex items-center text-sm text-secondary hover:text-primary font-medium transition-colors"
            >
              <span className="material-symbols-outlined mr-1 text-lg">arrow_back</span>
              {t.productDetail.volver}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
