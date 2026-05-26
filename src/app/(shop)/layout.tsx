import { CartProvider } from "@/features/cart/context/cart-context";
import { I18nProvider } from "@/lib/i18n/context";
import SmoothScrollProvider from "@/components/layout/smooth-scroll-provider";
import NavBar from "@/components/layout/nav-bar";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/features/cart/components/cart-drawer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <CartProvider>
        <SmoothScrollProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </SmoothScrollProvider>
      </CartProvider>
    </I18nProvider>
  );
}
