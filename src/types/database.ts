export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      Product: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          price: number;
          comparePrice: number | null;
          images: string[];
          category: "INTERIOR" | "EXTERIOR" | "HORTENSIAS" | "SUCULENTAS" | "MACETAS" | "ACCESORIOS";
          tags: string[];
          stock: number;
          isFeatured: boolean;
          isPublished: boolean;
          weight: number | null;
          dimensions: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          price: number;
          comparePrice?: number | null;
          images?: string[];
          category: string;
          tags?: string[];
          stock?: number;
          isFeatured?: boolean;
          isPublished?: boolean;
          weight?: number | null;
          dimensions?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string;
          price?: number;
          comparePrice?: number | null;
          images?: string[];
          category?: string;
          tags?: string[];
          stock?: number;
          isFeatured?: boolean;
          isPublished?: boolean;
          weight?: number | null;
          dimensions?: string | null;
        };
      };
      BlogPost: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image: string | null;
          author: string;
          tags: string[];
          isPublished: boolean;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image?: string | null;
          author?: string;
          tags?: string[];
          isPublished?: boolean;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          image?: string | null;
          author?: string;
          tags?: string[];
          isPublished?: boolean;
        };
      };
      CareGuide: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image: string | null;
          category: string;
          order: number;
          isPublished: boolean;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image?: string | null;
          category?: string;
          order?: number;
          isPublished?: boolean;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          image?: string | null;
          category?: string;
          order?: number;
          isPublished?: boolean;
        };
      };
      Order: {
        Row: {
          id: string;
          userId: string | null;
          email: string;
          name: string;
          status: string;
          total: number;
          createdAt: string;
        };
      };
    };
  };
}
