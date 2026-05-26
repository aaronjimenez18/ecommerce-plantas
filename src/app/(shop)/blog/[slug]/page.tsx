import { notFound } from "next/navigation";
import { createDbServerClient } from "@/lib/db/server";
import BlogPostClient from "./BlogPostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createDbServerClient();

  const { data } = await (supabase as any)
    .from("BlogPost")
    .select("*")
    .eq("slug", slug)
    .eq("isPublished", true);

  const raw = data?.[0] || null;
  if (!raw) notFound();

  return <BlogPostClient post={raw} />;
}
