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

function prettyHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
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

  const tags = (project.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const results = (project.results ?? "")
    .split("\n")
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return { label: (label ?? "").trim(), value: rest.join("|").trim() };
    })
    .filter((r) => r.label && r.value);

  const liveUrl = project.live_url?.trim() || null;

  return (
    <>
      <SubPageHeader />

      <main className="overflow-hidden">
        {/* Üst bilgi + kapak */}
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-6 sm:pt-14">
          <Link
            href="/projeler"
            className="inline-flex items-center gap-1 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
          >
            ← Tüm projeler
          </Link>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h1 className="font-display text-[clamp(2.4rem,8vw,5rem)] font-extrabold leading-[0.95] tracking-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {project.category && (
                <span className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-soft">
                  {project.category}
                </span>
              )}
              {project.year && (
                <span className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-soft">
                  {project.year}
                </span>
              )}
            </div>
          </div>

          {/* Kapak görseli */}
          <div className="group relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.5rem] sm:mt-10 sm:aspect-[16/9] sm:rounded-[2.5rem]">
            {project.cover_image_id ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/api/images/${project.cover_image_id}`}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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

            {/* Canlı site rozeti (kapak üstünde) */}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-3 text-sm font-black text-ink shadow-xl backdrop-blur transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
              >
                Siteyi Ziyaret Et <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </section>

        {/* İçerik + künye */}
        <section className="mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
            {/* Sol: anlatı + galeri */}
            <div className="order-2 lg:order-1">
              {(project.body || project.description) && (
                <div className="whitespace-pre-wrap text-lg leading-relaxed text-ink-soft sm:text-xl">
                  {project.body || project.description}
                </div>
              )}

              {gallery.length > 0 && (
                <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6">
                  {gallery.map((id) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={id}
                      src={`/api/images/${id}`}
                      alt={project.title}
                      className="w-full rounded-[1.25rem] object-cover sm:rounded-[2rem]"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sağ: sticky künye */}
            <aside className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-[1.5rem] border border-ink/10 bg-white/50 p-6 backdrop-blur sm:rounded-[2rem] sm:p-7">
                  <dl className="space-y-4 text-sm">
                    {project.client && (
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-widest text-ink-soft/60">
                          Müşteri
                        </dt>
                        <dd className="mt-1 font-display text-lg font-bold">
                          {project.client}
                        </dd>
                      </div>
                    )}
                    {project.category && (
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-widest text-ink-soft/60">
                          Kategori
                        </dt>
                        <dd className="mt-1 font-semibold">{project.category}</dd>
                      </div>
                    )}
                    {project.year && (
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-widest text-ink-soft/60">
                          Yıl
                        </dt>
                        <dd className="mt-1 font-semibold">{project.year}</dd>
                      </div>
                    )}
                  </dl>

                  {tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-ink/[0.06] px-3 py-1.5 text-xs font-bold text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 flex items-center justify-between gap-3 rounded-2xl bg-ink px-5 py-4 text-cream transition-colors hover:bg-[#ff2f9b]"
                    >
                      <span className="min-w-0">
                        <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-cream/60">
                          Canlı Site
                        </span>
                        <span className="block truncate font-bold">
                          {prettyHost(liveUrl)}
                        </span>
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  )}
                </div>

                {/* Sonuç metrikleri */}
                {results.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {results.map((r) => (
                      <div
                        key={r.label}
                        className="rounded-2xl border border-ink/10 bg-white/50 p-4"
                      >
                        <p className="text-gradient font-display text-2xl font-extrabold">
                          {r.value}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-ink-soft">
                          {r.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-16 max-w-6xl px-5 pb-20 sm:mt-24 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-center text-cream sm:rounded-[2.5rem] sm:p-14">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,47,155,0.35),transparent_45%),radial-gradient(circle_at_25%_85%,rgba(143,76,248,0.3),transparent_42%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.8rem,5vw,3.25rem)] font-extrabold leading-tight tracking-tight">
                Benzer bir proje mi düşünüyorsun?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-cream/70">
                Fikrini anlat, 24 saat içinde dönüş yapalım.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/#iletisim"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff2f9b] px-7 py-4 font-black text-white transition-colors hover:bg-[#ff168b]"
                >
                  Projeni Başlat <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/projeler"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-4 font-black text-cream transition-colors hover:bg-cream/10"
                >
                  Diğer projeler
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
