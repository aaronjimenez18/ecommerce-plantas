import { PrismaClient, ProductCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Calathea Ornata",
      slug: "calathea-ornata",
      description:
        "La Calathea Ornata, también conocida como 'planta de la raya', es famosa por sus espectaculares hojas verdes con rayas rosadas. Ideal para interiores con luz indirecta.",
      price: 45,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhHMOOMy0kn8PPcj-8TpJVUbvxu_Cy0_735QT7KzL9cvC6fQhrh1cVgmCpoi9oZ4B82z6V1-0aJTNMpF2xvRhmbsC_GAlbS00Zsry-YT9fyqxv5gIyVHkm87HnzM9rhcPq035eotQ8y9xxmtJxeUHGrJbn_zJJQPRkHyZm2Irb39Yv07tL9qLihsSzllSaIXS2OCw6S6vmiKLW-aTqjkkgGBDO77w-n1T1UsBfL_UM42BafIa6BtJ8__KPtpprAmzNVNGPvO2Ld455",
      ],
      category: ProductCategory.INTERIOR,
      tags: ["sombra parcial", "purificadora", "hojas decorativas"],
      stock: 15,
      isFeatured: true,
      isPublished: true,
    },
    {
      name: "Monstera Deliciosa",
      slug: "monstera-deliciosa",
      description:
        "La Monstera Deliciosa es un clásico moderno del diseño de interiores. Sus icónicas hojas fenestradas aportan un toque tropical y sofisticado a cualquier espacio.",
      price: 65,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAw-klY70zSCxjzPT0Mir4O01yEphaYxln3L3jfbq7LlVnzpnrmnN3dcE3KHITyUOCIjM_iC21lPmHJNilJiaLGF3Ejev5Ryo_hWjnlHM1pl34dYXmOxXBZUR7ri9u_oT2PA2J4zAcna7RE7Pw99qylyGjrHibaTaSizYVfM09Uhl2hehNntxeEewngNUbfILeAiP9kdZQuxTRL_kB9wYryY7zMijaURGNyRFGrBIFK5FiruykMTF57OmG9bzBx-RYjb_gHzbUvfqvR",
      ],
      category: ProductCategory.INTERIOR,
      tags: ["luz indirecta", "tropical", "hojas grandes"],
      stock: 10,
      isFeatured: true,
      isPublished: true,
    },
    {
      name: "Ficus Lyrata",
      slug: "ficus-lyrata",
      description:
        "El Ficus Lyrata o 'higo de violín' es una declaración de estilo. Sus grandes hojas verde vibrante lo convierten en el punto focal perfecto para espacios modernos.",
      price: 85,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDzIAlHpAoDYTwNix27Mn-y20ZMXewpgxeSD4CVCtKupgm5TUT52oN-KOTyScjSOTz2glmuZertusXsAFBXqP3sC-tlX9bH94UWXfiJ642JVCdXeSP6aI1wEjCdx0rrMNm2puH_5vlO21mIkq3SheI8w--pln4uSHi-v_5Kk3VD0K2ApmXTwGsuuCksR3dy1Un9T6LaJe2Z9ftw6gO36MtRWG6CwJG2u8_5rcKWnC_ikm8trxFpYhlthwi_uVdPd-H2oUMsJBDD73FO",
      ],
      category: ProductCategory.INTERIOR,
      tags: ["luz brillante", "árbol interior", "moderno"],
      stock: 8,
      isFeatured: true,
      isPublished: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const blogPosts = [
    {
      title: "Guía Completa de Diseño Biofílico",
      slug: "guia-diseno-biofilico",
      excerpt:
        "Aprende a integrar la naturaleza en tu hogar para crear espacios que mejoran tu bienestar.",
      content:
        "El diseño biofílico busca reconectar a las personas con el entorno natural...",
      author: "Ana Jiménez",
      tags: ["diseño", "bienestar", "interiorismo"],
      isPublished: true,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
