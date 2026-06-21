type IconProps = { className?: string };

/** Sağ-üst ok — iOS'ta emoji'ye dönüşen ↗ karakteri yerine tutarlı SVG */
export function ArrowUpRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Sağ ok (→ yerine) */
export function ArrowRight({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
    >
      <path d="M4 12h16" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/** Yatay çift ok (↔ yerine — sürükle ipucu) */
export function ArrowsLeftRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
    >
      <path d="M8 7l-4 5 4 5" />
      <path d="M16 7l4 5-4 5" />
      <path d="M4 12h16" />
    </svg>
  );
}
