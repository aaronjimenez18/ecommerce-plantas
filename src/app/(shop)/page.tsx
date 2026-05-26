import Hero from "@/components/layout/hero";
import ProductGallery from "@/features/products/components/product-gallery";
import AboutUs from "@/components/layout/about-us";
import Experience from "@/components/layout/experience";
import Journal from "@/features/blog/components/journal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGallery featured />
      <AboutUs />
      <Experience />
      <Journal />
    </>
  );
}
