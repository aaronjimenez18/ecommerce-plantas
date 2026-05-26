"use client";

import { useState } from "react";

interface BlogFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string | null;
    author: string;
    tags: string[];
    isPublished: boolean;
  };
  onCancel: () => void;
  onSaved: () => void;
}

export default function BlogForm({ post, onCancel, onSaved }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    image: post?.image ?? "",
    author: post?.author ?? "Plantas Jiménez",
    tags: post?.tags?.join(", ") ?? "",
    isPublished: post?.isPublished ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      ...form,
      image: form.image || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const url = post ? `/api/blog/${post.id}` : "/api/blog";
    const method = post ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);
    if (res.ok) onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Extracto</label>
        <textarea
          required
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contenido (HTML)</label>
        <textarea
          required
          rows={12}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">URL de imagen</label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Autor</label>
          <input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags (separados por coma)</label>
        <input
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.isPublished}
          onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
        />
        Publicado
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Guardando..." : post ? "Actualizar Artículo" : "Crear Artículo"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
