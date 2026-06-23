"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { label: "Panel", href: "/admin" },
  { label: "Mesajlar", href: "/admin/messages" },
  { label: "Projeler", href: "/admin/projects" },
];

export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-svh bg-[#0c0810] text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:py-10">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-lg font-black tracking-tight">
              BCD <span className="text-[#ff2f9b]">Panel</span>
            </span>
            <button
              onClick={logout}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            >
              Çıkış
            </button>
          </div>
          <nav className="flex gap-2 lg:flex-col">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                    active
                      ? "bg-[#ff2f9b] text-white"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="mt-2 hidden rounded-xl px-4 py-2.5 text-left text-sm font-bold text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white lg:block"
            >
              Çıkış yap
            </button>
          </nav>
          <a
            href="/"
            target="_blank"
            className="mt-4 hidden text-xs text-white/40 underline-offset-4 hover:underline lg:block"
          >
            Siteyi aç ↗
          </a>
        </aside>

        <main className="flex-1">
          <h1 className="mb-6 font-display text-2xl font-black tracking-tight sm:text-3xl">
            {title}
          </h1>
          {children}
        </main>
      </div>
    </div>
  );
}
