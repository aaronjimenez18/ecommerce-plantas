import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/db/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CareGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createAdminClient();

  const { data } = await (supabase as any)
    .from("CareGuide")
    .select("*")
    .eq("slug", slug)
    .eq("isPublished", true);

  const guide = data?.[0] || null;
  if (!guide) notFound();

  return (
    <article className="min-h-screen pt-40 pb-32 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[800px] mx-auto">
        <span className="font-sans text-[11px] text-on-tertiary-container font-bold uppercase tracking-[0.15em] mb-4 block">
          {guide.category || "Guía de Cuidados"}
        </span>

        <h1 className="font-serif text-4xl md:text-[56px] text-primary leading-[1.05] tracking-[-0.02em] mb-6">
          {guide.title}
        </h1>

        {guide.image && (
          <div className="w-full aspect-[2/1] rounded-[2rem] overflow-hidden mb-12 bg-surface-container-low">
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <p className="font-sans text-lg text-secondary leading-relaxed mb-10">
          {guide.excerpt}
        </p>

        <div
          className="prose prose-lg max-w-none font-sans text-primary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />
      </div>
    </article>
  );
}
