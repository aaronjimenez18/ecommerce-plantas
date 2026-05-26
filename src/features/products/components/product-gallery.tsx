"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./product-card";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  tags: string[];
  category: string;
  isFeatured: boolean;
  isPublished: boolean;
  label?: string;
}

export default function ProductGallery({ featured = false }: { featured?: boolean }) {
  const { t } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (featured) params.set("featured", "true");
    params.set("published", "true");

    fetch(`/api/productos?${params}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [featured]);

  const galleryProducts = featured ? products.slice(0, 4) : products;

  const layouts = [
    "md:col-span-7",
    "md:col-span-5 md:mt-32",
    "md:col-span-5",
    "md:col-span-7 md:-mt-32",
  ];

  const aspectRatios = [
    "aspect-[4/5]",
    "aspect-square md:aspect-[3/4]",
    "aspect-[3/4] md:aspect-square",
    "aspect-[4/5]",
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-surface-container-lowest"
      id="colecciones"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 gap-6"
        >
          <div className="max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="font-sans text-[11px] text-on-tertiary-container font-bold uppercase tracking-[0.15em] mb-4 block"
            >
              {featured ? t.productGallery.featuredBadge : t.productGallery.allBadge}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-[52px] text-primary mb-5 leading-[1.1] tracking-[-0.01em]"
            >
              {featured ? t.productGallery.featuredTitle : t.productGallery.allTitle}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans text-base md:text-lg text-secondary leading-relaxed"
            >
              {featured ? t.productGallery.featuredDesc : t.productGallery.allDesc}
            </motion.p>
          </div>
          {featured && (
            <motion.a
              variants={fadeUp}
              whileHover={{ x: 5 }}
              href="/productos"
              className="font-sans text-[13px] font-bold text-primary gold-underline hover:text-on-tertiary-fixed-variant transition-colors whitespace-nowrap"
            >
              {t.productGallery.viewAll}
            </motion.a>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={layouts[i]}>
                <div className={`w-full ${aspectRatios[i]} rounded-[2rem] bg-surface-container-low animate-pulse`} />
              </div>
            ))}
          </div>
        ) : galleryProducts.length === 0 ? (
          <p className="text-center text-secondary font-sans text-lg py-20">
            {t.productGallery.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">
            {galleryProducts.slice(0, 4).map((product, i) => (
              <div key={product.id} className={layouts[i]}>
                <a href={`/producto/${product.slug}`} className="block">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={Number(product.price)}
                    image={product.images?.[0] || ""}
                    tag={product.tags?.[0]
                      ? `${product.category} • ${product.tags[0]}`
                      : product.category}
                    label={i === 2 ? t.productGallery.new : undefined}
                    aspectRatio={aspectRatios[i]}
                    index={i}
                  />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
