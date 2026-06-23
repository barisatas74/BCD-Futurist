"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import { useIsMobile } from "@/lib/hooks";

export type CardData = {
  slug: string;
  title: string;
  category: string | null;
  year: string | null;
  gradient: string | null;
  accent: string | null;
  initial: string | null;
  coverImageId: number | null;
};

function ParallaxInitial({
  targetRef,
  initial,
}: {
  targetRef: React.RefObject<HTMLAnchorElement | null>;
  initial: string;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  return (
    <motion.span
      aria-hidden
      style={{ y }}
      className="absolute -bottom-[12%] -right-[4%] select-none font-display text-[7rem] font-extrabold leading-none text-white/15 transition-transform duration-700 group-hover:-translate-y-4 sm:text-[18rem]"
    >
      {initial}
    </motion.span>
  );
}

function ProjectCard({ project }: { project: CardData }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const enableParallax = !reducedMotion && !isMobile && !project.coverImageId;

  return (
    <a href={`/projeler/${project.slug}`} className="group block" ref={ref}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
        {project.coverImageId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/images/${project.coverImageId}`}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient ?? ""} transition-transform duration-700 ease-out group-hover:scale-[1.06]`}
          >
            {enableParallax ? (
              <ParallaxInitial targetRef={ref} initial={project.initial ?? ""} />
            ) : (
              <span
                aria-hidden
                className="absolute -bottom-[12%] -right-[4%] select-none font-display text-[7rem] font-extrabold leading-none text-white/15 sm:text-[18rem]"
              >
                {project.initial}
              </span>
            )}
            <span
              aria-hidden
              className="absolute left-[8%] top-[12%] h-16 w-16 rounded-full bg-white/20 blur-2xl sm:h-24 sm:w-24"
            />
          </div>
        )}

        {project.year && (
          <div className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-1.5 sm:text-xs">
            {project.year}
          </div>
        )}

        <div
          aria-hidden
          className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5 sm:mt-5 sm:gap-4 sm:px-1">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-ink-soft sm:mt-1 sm:text-base">
            {project.category}
          </p>
        </div>
        <span
          aria-hidden
          className={`text-lg ${project.accent ?? "text-pink"} transition-transform duration-500 group-hover:rotate-45 sm:text-2xl`}
        >
          ✦
        </span>
      </div>
    </a>
  );
}

export default function ProjectsGrid({ projects }: { projects: CardData[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-14">
      {projects.map((project, i) => (
        <Reveal
          key={project.slug}
          delay={0.1}
          className={i % 2 === 1 ? "mt-8 sm:mt-24" : ""}
        >
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
