"use client";

import { useState, useEffect, useCallback } from "react";
import ProductForm from "./ProductForm";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/productos");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.details || data.error || `Error ${res.status}`);
      }
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    const res = await fetch(`/api/productos/${id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingId(null);
    fetchProducts();
  };

  const editingProduct = editingId
    ? products.find((p) => p.id === editingId)
    : undefined;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold truncate">Gestión de Productos</h2>
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
            {editingProduct ? "Editar Producto" : "Nuevo Producto"}
          </h3>
          <ProductForm
            product={editingProduct as any}
            onCancel={() => { setShowForm(false); setEditingId(null); }}
            onSaved={handleSaved}
          />
        </div>
      )}

      {loading && <p className="text-neutral-500">Cargando...</p>}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <p className="font-medium mb-1">Error al cargar productos</p>
          <p className="font-mono text-xs break-all">{error}</p>
          <button onClick={fetchProducts} className="mt-2 text-red-600 underline text-xs">
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-neutral-400 py-12">
          No hay productos aún. Crea el primero.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-neutral-500">
                  <th className="pb-3 pr-4 font-medium">Nombre</th>
                  <th className="pb-3 pr-4 font-medium">Precio</th>
                  <th className="pb-3 pr-4 font-medium">Categoría</th>
                  <th className="pb-3 pr-4 font-medium">Stock</th>
                  <th className="pb-3 pr-4 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-neutral-50">
                    <td className="py-3 pr-4">
                      <div className="font-medium truncate max-w-[200px]">{p.name}</div>
                      <div className="text-xs text-neutral-400 truncate">/{p.slug}</div>
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap">€{p.price}</td>
                    <td className="py-3 pr-4 text-neutral-600 truncate max-w-[120px]">{p.category}</td>
                    <td className="py-3 pr-4">{p.stock}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {p.isPublished ? "Publicado" : "Borrador"}
                      </span>
                      {p.isFeatured && (
                        <span className="ml-1.5 inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          Destacado
                        </span>
                      )}
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <button
                        onClick={() => { setEditingId(p.id); setShowForm(true); }}
                        className="text-neutral-600 hover:text-neutral-900 mr-3 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
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
            {products.map((p) => (
              <div key={p.id} className="border rounded-xl bg-white p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{p.name}</p>
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
                      onClick={() => handleDelete(p.id, p.name)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-600">
                  <span>€{p.price}</span>
                  <span className="text-neutral-300">|</span>
                  <span>{p.category}</span>
                  <span className="text-neutral-300">|</span>
                  <span>Stock: {p.stock}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    p.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100 text-neutral-500"
                  }`}>
                    {p.isPublished ? "Publicado" : "Borrador"}
                  </span>
                  {p.isFeatured && (
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      Destacado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
