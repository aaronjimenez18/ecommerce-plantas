"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  author: string;
  tags: string[];
  createdAt: string;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { t } = useI18n();
  return (
    <article className="min-h-screen pt-40 pb-32 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeUp} className="font-sans text-[11px] text-on-tertiary-container font-bold uppercase tracking-[0.15em] mb-4 block">
            {post.tags?.[0] || t.blog.article}
          </motion.span>

          <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-[56px] text-primary leading-[1.05] tracking-[-0.02em] mb-6">
            {post.title}
          </motion.h1>

          <motion.div variants={fadeUp} className="font-sans text-sm text-secondary/70 flex items-center gap-4 mb-10">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-secondary/30" />
            <span>
              {new Date(post.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </motion.div>
        </motion.div>

        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[2/1] rounded-[2rem] overflow-hidden mb-12 bg-surface-container-low"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="prose prose-lg max-w-none font-sans text-primary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-10 border-t border-outline-variant"
        >
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-container-low text-secondary rounded-full font-sans text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href="/blog"
            className="inline-flex items-center text-sm text-secondary hover:text-primary font-medium transition-colors"
          >
            <span className="material-symbols-outlined mr-1 text-lg">arrow_back</span>
            {t.blog.back}
          </a>
        </motion.div>
      </div>
    </article>
  );
}
