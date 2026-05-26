"use client";

import { useState } from "react";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Productos", href: "/admin/productos" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Pedidos", href: "/admin/pedidos" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="font-bold text-base sm:text-lg truncate">
            Admin — Plantas Jiménez
          </h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm">
            {adminLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:underline whitespace-nowrap">
                {l.label}
              </a>
            ))}
            <a href="/" className="hover:underline whitespace-nowrap">Ver Tienda</a>
            <a
              href="/api/auth/logout"
              className="text-red-600 hover:text-red-700 font-medium whitespace-nowrap"
            >
              Cerrar Sesión
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Menú"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative w-72 max-w-[80vw] h-full bg-white shadow-xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <span className="font-semibold text-sm">Navegación</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-neutral-100"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="flex-1 p-3 space-y-1">
              {adminLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <hr className="my-3 mx-4" />
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Ver Tienda
              </a>
              <a
                href="/api/auth/logout"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                Cerrar Sesión
              </a>
            </div>
          </nav>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  );
}
