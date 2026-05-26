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

Principios

- **Feature-Sliced**: cada feature (`products/`, `cart/`, `blog/`) es autocontenida con sus componentes, lógica y tipos.
- **Server Components first**: las páginas y layouts son server components por defecto; solo los componentes interactivos llevan `"use client"`.
- **Infraestructura desacoplada**: `lib/` expone clientes de Prisma, Stripe y Supabase listos para inyectar en server actions o API routes.
- **Escalable**: agregar una nueva feature (ej. wishlist, reseñas) implica crear `src/features/wishlist/` sin tocar el resto.

---

## Configuración inicial

1. Clona el repositorio e instala dependencias:
   ```bash
   pnpm install
   ```

2. Copia las variables de entorno:
   ```bash
   cp .env .env.local
   ```

3. Llena `.env.local` con tus credenciales:

   ```env
   # Supabase
   DATABASE_URL="postgresql://postgres:pass@db.[ref].supabase.co:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[ref].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="[anon-key]"

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

4. Sincroniza el schema y siembra datos de ejemplo:
   ```bash
   npx prisma db push
   npx tsx src/lib/db/seed.ts
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

---

## Comandos

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Iniciar servidor de producción |
| `pnpm lint` | ESLint |
| `npx prisma studio` | Explorar base de datos |
| `npx prisma db push` | Sincronizar schema a DB |
| `npx tsx src/lib/db/seed.ts` | Poblar datos de ejemplo |

---

## Stripe

Los pagos se procesan con **Stripe Checkout**. El flujo es:

1. El usuario agrega productos al carrito y hace clic en "Completar Pedido".
2. El frontend llama a una server action que crea un `checkout.session` de Stripe.
3. Stripe redirige al usuario a la página de pago.
4. Tras el pago exitoso, Stripe envía un webhook a `/api/stripe/webhook` que actualiza la orden en la base de datos.

---

## Admin panel

El panel admin está en `/admin/` y actualmente muestra páginas placeholder para:

- **Dashboard** — métricas y resumen
- **Productos** — CRUD del catálogo
- **Blog** — administración de entradas
- **Pedidos** — gestión de órdenes

La ruta está protegida por middleware y requiere autenticación (sesión admin vía Supabase Auth).

---

## Licencia

Uso interno — Plantas Jiménez
