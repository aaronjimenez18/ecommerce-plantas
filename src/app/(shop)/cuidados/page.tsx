"use client";

import { useI18n } from "@/lib/i18n/context";

export default function CuidadosPage() {
  const { t } = useI18n();
  return (
    <section className="min-h-screen pt-32 sm:pt-40 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-[72px] text-primary leading-[1.05]">
          {t.cuidados.title}
        </h1>
        <p className="font-sans text-sm sm:text-base md:text-lg text-secondary mt-3 sm:mt-4 max-w-xl">
          {t.cuidados.desc}
        </p>
      </div>
    </section>
  );
}
