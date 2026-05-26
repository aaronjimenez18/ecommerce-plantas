import { NextResponse } from "next/server";
import { createDbServerClient } from "@/lib/db/server";

export async function GET() {
  try {
    const supabase = await createDbServerClient();
    const { data, error } = await (supabase as any)
      .from("BlogPost")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener posts", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createDbServerClient();

    const { data, error } = await (supabase as any)
      .from("BlogPost")
      .insert({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image || null,
        author: body.author || "Plantas Jiménez",
        tags: body.tags || [],
        isPublished: body.isPublished ?? true,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear post", details: String(error) },
      { status: 500 }
    );
  }
}
