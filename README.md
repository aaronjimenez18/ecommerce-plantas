Plantas Jiménez — E-commerce

Tienda online especializada en plantas de interior y exterior. Construida con **Next.js 16**, **Supabase**, **Prisma 7** y **Stripe**.

---

Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Estilos | Tailwind CSS 4 + Framer Motion + Lenis |
| Base de datos | Supabase (PostgreSQL)| ORM | Prisma 7 con driver adapter pg|
| Autenticación | Supabase Auth |
| Pagos | Stripe (Checkout + Webhooks) |
| Lenguaje | TypeScript |

---

Arquitectura Modular Feature Architecture

```
src/
├── app/                          # Rutas (Next.js App Router)
│   ├── (shop)/                   #   Route group público
│   │   ├── page.tsx              #   Home
│   │   ├── productos/            #   Catálogo
│   │   ├── producto/[slug]/      #   Detalle de producto
│   │   ├── blog/                 #   Blog + posts
│   │   ├── cuidados/             #   Guías de cuidado
│   │   └── layout.tsx            #   Layout con NavBar + Footer
│   ├── admin/                    #   Panel admin (protegido)
│   │   ├── dashboard/
│   │   ├── productos/
│   │   ├── blog/
│   │   ├── pedidos/
│   │   └── login/
│   ├── api/                      #   API routes
│   │   ├── productos/route.ts
│   │   └── stripe/webhook/route.ts
│   ├── layout.tsx                # Root layout
│   └── middleware.ts             # Auth guard para /admin
├── components/
│   ├── ui/                       # Primitivas (Button, Card, Input…)
│   └── layout/                   # NavBar, Footer, Hero, sections
├── features/                     # Módulos de dominio (feature-sliced)
│   ├── products/                 #   Catálogo y galería
│   ├── cart/                     #   Carrito (context + drawer)
│   ├── checkout/                 #   Stripe checkout
│   ├── blog/                     #   Journal y blog
│   └── admin/                    #   Componentes admin
├── lib/                          # Infraestructura
│   ├── db/prisma.ts              #   Cliente Prisma singleton
│   ├── stripe/                   #   Stripe server + browser
│   ├── supabase/                 #   Supabase server + browser
│   └── utils/                    #   cn(), animaciones
├── providers/                    # Context providers
├── hooks/                        # Custom hooks
└── types/                        # Tipos compartidos
```

