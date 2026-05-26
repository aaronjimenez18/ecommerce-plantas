import { NextResponse } from "next/server";
import { createDbServerClient } from "@/lib/db/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createDbServerClient();
    const { data, error } = await (supabase as any)
      .from("BlogPost")
      .select("*")
      .eq("id", id);

    const post = data?.[0] || null;
    if (error) throw error;
    if (!post) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener post", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = await createDbServerClient();

    const { data, error } = await (supabase as any)
      .from("BlogPost")
      .update({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image || null,
        author: body.author,
        tags: body.tags,
        isPublished: body.isPublished,
      })
      .eq("id", id)
      .select();

    const post = data?.[0] || null;
    if (error) throw error;
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar post", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createDbServerClient();
    const { error } = await (supabase as any).from("BlogPost").delete().eq("id", id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar post", details: String(error) },
      { status: 500 }
    );
  }
}
