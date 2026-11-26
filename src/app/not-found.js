import Link from "next/link";
import { PiArrowLeftLight } from "react-icons/pi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F4F1EA] text-[#121312]">
      <Navbar />
      <main id="contenido-principal" className="flex-1 max-w-4xl mx-auto px-4 py-24 text-center space-y-5">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--brand-accent)]">
          Error 404
        </p>
        <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight">
          Propiedad o sección no encontrada
        </h1>
        <p className="text-sm md:text-base text-[#5A5852] max-w-md mx-auto">
          El enlace solicitado no está disponible o fue actualizado en nuestra cartera.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <PiArrowLeftLight className="w-4 h-4" />
            <span>Ver catálogo completo</span>
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-[#D5D0C5] text-xs font-semibold uppercase tracking-wider hover:bg-[#ECE8DF] transition-colors"
          >
            Ir a portada
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
