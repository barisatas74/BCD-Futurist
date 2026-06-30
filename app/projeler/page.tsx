import type { Metadata } from "next";
import SubPageHeader from "@/components/SubPageHeader";
import Footer from "@/components/sections/Footer";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { type CardData } from "@/components/sections/ProjectsGrid";
import { getAllProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tüm Projeler | BarışCreativeDesign",
  description:
    "BarışCreativeDesign portföyü — web tasarım, e-ticaret ve marka deneyimi projeleri.",
};

export default async function ProjelerPage() {
  const all = await getAllProjects();
  const cards: CardData[] = all.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    year: p.year,
    gradient: p.gradient,
    accent: p.accent,
    initial: p.initial,
    coverImageId: p.cover_image_id,
  }));

  return (
    <>
      <SubPageHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mb-10 sm:mb-16">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Tüm <span className="text-gradient">Projeler</span>
          </h1>
          <p className="mt-4 max-w-md text-ink-soft">
            Strateji, tasarım ve teknolojinin buluştuğu işlerimizin tamamı.
          </p>
        </div>

        {cards.length ? (
          <ProjectsExplorer projects={cards} />
        ) : (
          <p className="text-ink-soft">Henüz proje eklenmedi.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
