export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" className="fill-[#5e6b52] dark:fill-[#8b9a7a]" />
      <path
        d="M12 28 C12 28 16 12 20 12 C24 12 28 28 28 28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="12" r="2.5" fill="white" />
      <path
        d="M15 23 Q20 18 25 23"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M17 26 Q20 22 23 26"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
