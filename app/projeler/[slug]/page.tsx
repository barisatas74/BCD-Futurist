import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubPageHeader from "@/components/SubPageHeader";
import Footer from "@/components/sections/Footer";
import { ArrowUpRight } from "@/components/Icons";
import { getProjectBySlug, getProjectImageIds } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proje bulunamadı" };
  return {
    title: `${project.title} | BarışCreativeDesign`,
    description: project.description ?? undefined,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const imageIds = project.id ? await getProjectImageIds(project.id) : [];
  const gallery = imageIds.filter((id) => id !== project.cover_image_id);

  return (
    <>
      <SubPageHeader />
      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <Link
          href="/projeler"
          className="text-sm font-bold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        >
          ← Tüm projeler
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          {project.year && (
            <span className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-soft">
              {project.year}
            </span>
          )}
        </div>
        {project.category && (
          <p className="mt-2 text-lg text-ink-soft">{project.category}</p>
        )}

        {/* Kapak */}
        <div className="mt-8 aspect-[16/9] overflow-hidden rounded-[2rem]">
          {project.cover_image_id ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/api/images/${project.cover_image_id}`}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.gradient ?? ""}`}
            >
              <span className="font-display text-[8rem] font-extrabold text-white/20">
                {project.initial}
              </span>
            </div>
          )}
        </div>

        {(project.body || project.description) && (
          <div className="mt-10 max-w-2xl whitespace-pre-wrap text-lg leading-relaxed text-ink-soft">
            {project.body || project.description}
          </div>
        )}

        {gallery.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {gallery.map((id) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={id}
                src={`/api/images/${id}`}
                alt={project.title}
                className="w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 rounded-[2rem] bg-ink p-8 text-center text-cream sm:p-12">
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-4xl">
            Benzer bir proje mi düşünüyorsun?
          </h2>
          <Link
            href="/#iletisim"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff2f9b] px-7 py-4 font-black text-white transition-colors hover:bg-[#ff168b]"
          >
            Projeni Başlat <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
