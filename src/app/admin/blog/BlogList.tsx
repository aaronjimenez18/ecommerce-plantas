"use client";

import { useState, useEffect, useCallback } from "react";
import BlogForm from "./BlogForm";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.details || data.error || `Error ${res.status}`);
      }
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingId(null);
    fetchPosts();
  };

  const editingPost = editingId
    ? posts.find((p) => p.id === editingId)
    : undefined;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold truncate">Gestión de Blog</h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); }}
          className="flex-shrink-0 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800"
        >
          + Nuevo
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-4 sm:p-6 border rounded-xl bg-white">
          <h3 className="text-lg font-semibold mb-4">
            {editingPost ? "Editar Artículo" : "Nuevo Artículo"}
          </h3>
          <BlogForm
            post={editingPost as any}
            onCancel={() => { setShowForm(false); setEditingId(null); }}
            onSaved={handleSaved}
          />
        </div>
      )}

      {loading && <p className="text-neutral-500">Cargando...</p>}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <p className="font-medium mb-1">Error al cargar artículos</p>
          <p className="font-mono text-xs break-all">{error}</p>
          <button onClick={fetchPosts} className="mt-2 text-red-600 underline text-xs">
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="text-center text-neutral-400 py-12">
          No hay artículos aún. Crea el primero.
        </p>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-neutral-500">
                  <th className="pb-3 pr-4 font-medium">Título</th>
                  <th className="pb-3 pr-4 font-medium">Autor</th>
                  <th className="pb-3 pr-4 font-medium">Tags</th>
                  <th className="pb-3 pr-4 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-neutral-50">
                    <td className="py-3 pr-4">
                      <div className="font-medium truncate max-w-[240px]">{p.title}</div>
                      <div className="text-xs text-neutral-400 truncate">/{p.slug}</div>
                    </td>
                    <td className="py-3 pr-4 text-neutral-600 whitespace-nowrap">{p.author}</td>
                    <td className="py-3 pr-4 text-neutral-600 truncate max-w-[160px]">
                      {p.tags?.join(", ") || "—"}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {p.isPublished ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <button
                        onClick={() => { setEditingId(p.id); setShowForm(true); }}
                        className="text-neutral-600 hover:text-neutral-900 mr-3 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {posts.map((p) => (
              <div key={p.id} className="border rounded-xl bg-white p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{p.title}</p>
                    <p className="text-xs text-neutral-400 truncate">/{p.slug}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => { setEditingId(p.id); setShowForm(true); }}
                      className="text-neutral-600 hover:text-neutral-900 text-xs font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-600 flex-wrap">
                  <span>{p.author}</span>
                  {p.tags && p.tags.length > 0 && (
                    <>
                      <span className="text-neutral-300">|</span>
                      <span>{p.tags.slice(0, 3).join(", ")}{p.tags.length > 3 ? "..." : ""}</span>
                    </>
                  )}
                </div>
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    p.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100 text-neutral-500"
                  }`}>
                    {p.isPublished ? "Publicado" : "Borrador"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
