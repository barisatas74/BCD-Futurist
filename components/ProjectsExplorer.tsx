"use client";

import { useMemo, useState } from "react";
import ProjectsGrid, { type CardData } from "@/components/sections/ProjectsGrid";

export default function ProjectsExplorer({
  projects,
}: {
  projects: CardData[];
}) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.category && set.add(p.category));
    return ["Tümü", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = useState("Tümü");

  const filtered =
    active === "Tümü"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2 sm:mb-12 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors sm:text-sm ${
                active === cat
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/15 bg-white/40 text-ink-soft hover:border-ink/40 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <ProjectsGrid key={active} projects={filtered} />
    </div>
  );
}
