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
  markClassName = "h-11 w-11",
}: BrandLogoProps) {
  const isLight = theme === "light";
  const textColor = isLight ? "text-cream" : "text-ink";

  return (
    <span
      className={`inline-flex items-center gap-3.5 ${className}`}
      aria-label="Barış Creative Design"
    >
      <img
        src="/logo-bcd.png"
        alt="BCD"
        aria-hidden
        className={`shrink-0 rounded-[7px] object-cover ${markClassName}`}
      />
      <span
        className={`${textClassName} font-black uppercase tracking-[0.02em] ${textColor}`}
      >
        BARIŞ CREATIVE DESIGN{showYear ? " : 2026" : ""}
      </span>
    </span>
  );
}
