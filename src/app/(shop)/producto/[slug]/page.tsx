import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/db/server";
import ProductDetail from "./ProductDetail";

interface ProductRow {
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
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createAdminClient();

  const { data } = await (supabase as any)
    .from("Product")
    .select("*")
    .eq("slug", slug)
    .eq("isPublished", true);

  const product = (data?.[0] || null) as ProductRow | null;
  if (!product) notFound();

  return (
    <ProductDetail
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: Number(product.price),
        comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
        images: product.images,
        category: product.category,
        tags: product.tags,
        stock: product.stock,
      }}
    />
  );
}
