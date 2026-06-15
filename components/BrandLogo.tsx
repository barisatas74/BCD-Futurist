type BrandLogoProps = {
  theme?: "dark" | "light";
  showYear?: boolean;
  className?: string;
  textClassName?: string;
  markClassName?: string;
};

export default function BrandLogo({
  theme = "dark",
  showYear = true,
  className = "",
  textClassName = "hidden sm:block text-xs",
  markClassName = "h-11 w-11 border-2 text-[0.7rem]",
}: BrandLogoProps) {
  const isLight = theme === "light";
  const markColor = isLight
    ? "border-cream bg-cream text-ink"
    : "border-ink bg-white text-ink";
  const textColor = isLight ? "text-cream" : "text-ink";

  return (
    <span
      className={`inline-flex items-center gap-4 ${className}`}
      aria-label="Barış Creative Design"
    >
      <span
        aria-hidden
        className={`grid place-items-center ${markClassName} ${markColor} font-display font-black leading-none`}
      >
        <span>
          B<br />C<br />D
        </span>
      </span>
      <span
        className={`${textClassName} font-black uppercase tracking-[0.02em] ${textColor}`}
      >
        BARIŞ CREATIVE DESIGN{showYear ? " : 2026" : ""}
      </span>
    </span>
  );
}
