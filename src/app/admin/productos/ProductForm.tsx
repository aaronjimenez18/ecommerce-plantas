"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "INTERIOR",
  "EXTERIOR",
  "HORTENSIAS",
  "SUCULENTAS",
  "MACETAS",
  "ACCESORIOS",
];

interface ProductFormProps {
  product?: {
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
    isFeatured: boolean;
    isPublished: boolean;
    weight: number | null;
    dimensions: string | null;
  };
  onCancel: () => void;
  onSaved: () => void;
}

export default function ProductForm({ product, onCancel, onSaved }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    comparePrice: product?.comparePrice?.toString() ?? "",
    images: product?.images?.join("\n") ?? "",
    category: product?.category ?? "INTERIOR",
    tags: product?.tags?.join(", ") ?? "",
    stock: product?.stock?.toString() ?? "0",
    isFeatured: product?.isFeatured ?? false,
    isPublished: product?.isPublished ?? true,
    weight: product?.weight?.toString() ?? "",
    dimensions: product?.dimensions ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      ...form,
      price: parseFloat(form.price),
      comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : null,
      images: form.images.split("\n").filter(Boolean),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      stock: parseInt(form.stock) || 0,
      weight: form.weight ? parseFloat(form.weight) : null,
    };

    const url = product
      ? `/api/productos/${product.id}`
      : "/api/productos";
    const method = product ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      onSaved();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Precio (€)</label>
          <input
            required
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Precio comparación</label>
          <input
            type="number"
            step="0.01"
            value={form.comparePrice}
            onChange={(e) => setForm({ ...form, comparePrice: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (separados por coma)</label>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Imágenes (una URL por línea)
        </label>
        <textarea
          rows={3}
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Peso (kg)</label>
          <input
            type="number"
            step="0.1"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dimensiones</label>
          <input
            value={form.dimensions}
            onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
          />
          Destacado
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
          />
          Publicado
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Guardando..." : product ? "Actualizar Producto" : "Crear Producto"}
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
