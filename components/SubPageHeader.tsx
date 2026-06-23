import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { ArrowUpRight } from "@/components/Icons";

export default function SubPageHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo textClassName="hidden sm:block text-xs" markClassName="h-10 w-10" />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full px-4 py-2.5 text-xs font-black uppercase tracking-wide text-ink/70 transition-colors hover:text-ink"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/#iletisim"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-black text-cream transition-colors hover:bg-[#251622]"
          >
            İletişim
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
