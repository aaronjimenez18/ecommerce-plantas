"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideUp } from "@/lib/utils/animations";
import { useI18n } from "@/lib/i18n/context";

export default function Experience() {
  const { t } = useI18n();
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 lg:px-20 bg-surface"
      id="experiencia"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.span variants={fadeUp} className="font-sans text-[11px] text-on-tertiary-container font-bold uppercase tracking-[0.15em] mb-4 sm:mb-5 block">
            {t.experience.badge}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl sm:text-4xl md:text-[52px] text-primary mb-5 sm:mb-6 leading-[1.1] tracking-[-0.01em]">
            {t.experience.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm sm:text-base md:text-lg text-secondary leading-relaxed">
            {t.experience.desc}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto md:h-[580px]">
          <motion.div variants={slideUp} custom={0} className="md:col-span-8 relative rounded-[2rem] overflow-hidden group cursor-pointer min-h-[300px] sm:min-h-[400px] md:min-h-0">
            <motion.img
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              alt="Interior moderno con plantas"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6Pi0zhFVWfPEL_yfN69pQauSHfJ9VqDMyzwC6-mGNMtRmlOaalB9UtbyTQJD6hkNFRALjmoT1kqcOUpXylSRX_vQBUWw7guv55w2XCyKeHOWB38bFWN6xqx22SA8iaGFl5-sJAPdahWdDzEbz4wFr0U1O9WsQxQDsBTcjDgkITYnJ3vRk35pmKNJ0aFnnEIsbilEXKUrYgUkw_mHe0VomoF_EBYptv1F5TdFFSYkLqmPoWK79UYwlSSbZ7_MFmWAZxYQV5rE6FAzx"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 w-full md:w-2/3">
              <span className="glass-panel text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-sans font-bold text-[9px] sm:text-[10px] tracking-[0.1em] uppercase mb-3 sm:mb-4 inline-block">
                {t.experience.featuredBadge}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3 leading-tight">{t.experience.featuredTitle}</h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 mb-4 sm:mb-5 leading-relaxed max-w-md">
                {t.experience.featuredDesc}
              </p>
              <motion.a
                whileHover={{ x: 5 }}
                href="/blog"
                className="inline-flex items-center text-white font-sans font-bold text-[12px] sm:text-[13px] hover:underline decoration-1 underline-offset-4"
              >
                {t.experience.featuredCta}
                <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </motion.a>
            </div>
          </motion.div>

          <div className="md:col-span-4 flex flex-col gap-5">
            <motion.div
              variants={slideUp}
              custom={0.1}
              className="flex-1 relative rounded-[2rem] overflow-hidden bg-primary-container p-6 sm:p-7 flex flex-col justify-between group cursor-pointer hover:bg-primary transition-colors duration-500 min-h-[200px] sm:min-h-[240px] md:min-h-0"
            >
              <div className="z-10 relative">
                <motion.span whileHover={{ scale: 1.15, rotate: 10 }} className="material-symbols-outlined text-tertiary-fixed-dim text-2xl sm:text-3xl mb-2 sm:mb-3 block">spa</motion.span>
                <h3 className="font-serif text-lg sm:text-xl text-on-primary-container group-hover:text-on-primary mb-1 sm:mb-1.5 transition-colors duration-300 font-medium">
                  {t.experience.card1Title}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] text-on-primary-container/80 group-hover:text-on-primary/80 leading-relaxed line-clamp-3 transition-colors duration-300">
                  {t.experience.card1Desc}
                </p>
              </div>
              <motion.a
                whileHover={{ x: 3 }}
                href="/cuidados"
                className="z-10 relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-on-primary-container/25 group-hover:border-on-primary/25 flex items-center justify-center text-on-primary-container group-hover:text-on-primary hover:bg-on-primary-container/10 group-hover:hover:bg-on-primary/10 transition-all mt-3 sm:mt-4"
              >
                <span className="material-symbols-outlined text-sm">north_east</span>
              </motion.a>
              <div className="absolute -bottom-10 -right-10 w-32 sm:w-36 h-32 sm:h-36 bg-on-primary-container/8 rounded-full blur-2xl pointer-events-none" />
            </motion.div>

            <motion.div
              variants={slideUp}
              custom={0.2}
              className="flex-1 relative rounded-[2rem] overflow-hidden group cursor-pointer min-h-[200px] sm:min-h-[240px] md:min-h-0"
            >
              <motion.img
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                alt="Taller de cuidado botánico"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHder5jDanN91XsPXgkoe3XCgqNzQOloMpDZXF5wQ5od_TGO6QNv7btUFA4xkVMGj5q89rqL-5Ys1czyp4jVi84SGulsUPFfw2Mz7u3qWC8Gqnm_gxuw5i6Hvds7tyA14dJef1OWUBYEdlM7S0tYOIVxKnuOGLpDbdybzvSidDNgkIYHcBTt2peizjdX8NWQXsSWlQRUigb4suS6JJw9kXfpj7HqzEj_8bz7mVQMb3N3Cs4_ASajmG-bK7cAqvfrttJsqssM4paDla"
              />
              <div className="absolute inset-0 bg-forest/30 group-hover:bg-black/50 transition-colors duration-500" />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-5 sm:p-6 text-center"
              >
                <h4 className="font-serif text-lg sm:text-xl text-white mb-1.5 font-medium">{t.experience.card2Title}</h4>
                <p className="font-sans text-xs text-white/90 mb-4 max-w-[180px]">
                  {t.experience.card2Desc}
                </p>
                <span className="inline-flex items-center text-white font-sans font-bold text-[11px] border-b border-white/60 pb-0.5 uppercase tracking-wider">
                  {t.experience.card2Cta}
                </span>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                <span className="glass-panel text-primary px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-sans font-bold text-[11px] sm:text-[12px] tracking-wider shadow">{t.experience.card2Label}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
