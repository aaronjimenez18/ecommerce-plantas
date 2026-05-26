import { NextResponse } from "next/server";
import { createDbServerClient } from "@/lib/db/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const isPublished = searchParams.get("published");

    const supabase = await createDbServerClient();
    let query = supabase
      .from("Product")
      .select("*")
      .order("createdAt", { ascending: false });

    if (featured === "true") query = query.eq("isFeatured", true);
    if (isPublished === "true") query = query.eq("isPublished", true);

    const { data, error } = await query;

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener productos", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createDbServerClient();
    const body = await request.json();

    const { data, error } = await (supabase as any)
      .from("Product")
      .insert({
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        comparePrice: body.comparePrice || null,
        images: body.images || [],
        category: body.category,
        tags: body.tags || [],
        stock: body.stock || 0,
        isFeatured: body.isFeatured || false,
        isPublished: body.isPublished || false,
        weight: body.weight || null,
        dimensions: body.dimensions || null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear producto", details: String(error) },
      { status: 500 }
    );
  }
}
