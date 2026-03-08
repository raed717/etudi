// (marketing) route group layout
// Wraps secondary marketing pages like /pricing, /about, etc.
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/landing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
