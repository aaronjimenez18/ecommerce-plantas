"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  author: string;
  tags: string[];
  createdAt: string;
}

export default function BlogPage() {
  const { t } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = posts.find((_, i) => i === 0);

  return (
    <section className="min-h-screen pt-40 pb-32 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-20 md:mb-28"
        >
          <motion.span
            variants={fadeUp}
            className="font-sans text-[11px] text-on-tertiary-container font-bold uppercase tracking-[0.15em] mb-4 block"
          >
            {t.journal.badge}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-[72px] text-primary leading-[1.05] tracking-[-0.02em] mb-6"
          >
            {t.blog.title1} <br className="hidden md:block" />{t.blog.title2}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-sans text-lg md:text-xl text-secondary max-w-2xl leading-relaxed"
          >
            {t.blog.desc}
          </motion.p>
        </motion.div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-[2rem] bg-surface-container-low animate-pulse aspect-[4/5]" />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-secondary font-sans text-lg py-20">
            {t.blog.empty}
          </p>
        )}

        {!loading && posts.length > 0 && (
          <>
            {featured && (
              <motion.a
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                href={`/blog/${featured.slug}`}
                className="group block relative w-full aspect-[2/1] md:aspect-[3/1] rounded-[2rem] overflow-hidden mb-16 md:mb-24"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.1)] to-transparent z-10" />
                {featured.image && (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-14">
                  <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/70 font-bold mb-3 block">
                    {featured.tags?.[0] || t.blog.featured}
                  </span>
                  <h2 className="font-serif text-2xl md:text-5xl text-white leading-[1.1] max-w-2xl">
                    {featured.title}
                  </h2>
                  <p className="font-sans text-sm md:text-base text-white/80 mt-3 max-w-xl line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
              </motion.a>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {posts.slice(featured ? 1 : 0).map((post, i) => (
                <motion.a
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col"
                >
                  {post.image ? (
                    <div className="w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5 bg-surface-container-low">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] rounded-[1.5rem] mb-5 bg-gradient-to-br from-surface-container-low to-surface-container-lowest flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-secondary/30">
                        eco
                      </span>
                    </div>
                  )}
                  <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-on-tertiary-container font-bold mb-2">
                    {post.tags?.[0] || t.blog.article}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-primary leading-snug mb-2 group-hover:text-on-tertiary-fixed-variant transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="font-sans text-[11px] text-secondary/60 mt-4">
                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
