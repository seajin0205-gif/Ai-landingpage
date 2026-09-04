type PersonIllustrationProps = {
  className?: string;
};

export function PersonIllustrationMarketing({ className = "" }: PersonIllustrationProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="48" cy="48" r="48" fill="url(#person-bg-a)" />
      <ellipse cx="48" cy="78" rx="28" ry="10" fill="#0c1a2e" fillOpacity="0.06" />
      <path
        d="M24 52c2-14 12-22 24-22s22 8 24 22c-8 6-16 9-24 9s-16-3-24-9z"
        fill="#5b3fd4"
      />
      <circle cx="48" cy="38" r="18" fill="#f5c9a8" />
      <path
        d="M30 34c2-10 10-16 18-16s16 6 18 16c-4 2-10 3-18 3s-14-1-18-3z"
        fill="#2d1f5c"
      />
      <path d="M32 28c6-8 14-10 16-10s10 2 16 10" stroke="#2d1f5c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="38" r="2" fill="#2d1f5c" />
      <circle cx="55" cy="38" r="2" fill="#2d1f5c" />
      <path d="M44 44c2 2 6 2 8 0" stroke="#d4956a" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M34 58c4 8 24 8 28 0"
        fill="#00b8d9"
      />
      <rect x="30" y="56" width="36" height="22" rx="8" fill="#00d4ff" />
      <defs>
        <linearGradient id="person-bg-a" x1="16" y1="8" x2="80" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8fbff" />
          <stop offset="1" stopColor="#ede8ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PersonIllustrationOperations({ className = "" }: PersonIllustrationProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="48" cy="48" r="48" fill="url(#person-bg-b)" />
      <ellipse cx="48" cy="78" rx="28" ry="10" fill="#0c1a2e" fillOpacity="0.06" />
      <path
        d="M27 54c2-13 9-21 21-21s19 8 21 21c-7 5-14 8-21 8s-14-3-21-8z"
        fill="#0f766e"
      />
      <circle cx="48" cy="39" r="17" fill="#ddb892" />
      <path
        d="M31 33c2-7 8-12 17-12s15 5 17 12c-5 2-11 3-17 3s-12-1-17-3z"
        fill="#3d2914"
      />
      <path
        d="M33 30c4-5 9-7 15-7s11 2 15 7"
        stroke="#3d2914"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M36 36c2-3 6-4 12-4s10 1 12 4" fill="#3d2914" />
      <circle cx="41" cy="39" r="2" fill="#3d2914" />
      <circle cx="55" cy="39" r="2" fill="#3d2914" />
      <path d="M43 46c2.5 2 7.5 2 10 0" stroke="#b8845a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 43c1 1 2 1 3 0M51 43c1 1 2 1 3 0" stroke="#b8845a" strokeWidth="1" strokeLinecap="round" />
      <rect x="30" y="56" width="36" height="22" rx="8" fill="#134e4a" />
      <path d="M48 58v18" stroke="#0f766e" strokeWidth="2" />
      <path
        d="M38 62h8c2 0 4 1.5 4 3.5s-2 3.5-4 3.5h-8V62z"
        fill="white"
        fillOpacity="0.2"
      />
      <circle cx="58" cy="63" r="3" fill="#9ae600" fillOpacity="0.85" />
      <defs>
        <linearGradient id="person-bg-b" x1="10" y1="8" x2="86" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ecfdf5" />
          <stop offset="1" stopColor="#e0f2fe" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PersonIllustrationProduct({ className = "" }: PersonIllustrationProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="48" cy="48" r="48" fill="url(#person-bg-c)" />
      <ellipse cx="48" cy="78" rx="28" ry="10" fill="#0c1a2e" fillOpacity="0.06" />
      <path
        d="M25 53c3-13 12-21 23-21s20 8 23 21c-8 6-15 8-23 8s-15-2-23-8z"
        fill="#9b7dff"
      />
      <circle cx="48" cy="39" r="17" fill="#f0c4a0" />
      <path
        d="M31 35c4-9 11-13 17-13s13 4 17 13c-5 2-11 3-17 3s-12-1-17-3z"
        fill="#4a3278"
      />
      <path d="M34 30c5-4 10-5 14-5s9 1 14 5" stroke="#4a3278" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="41" cy="39" r="2" fill="#4a3278" />
      <circle cx="55" cy="39" r="2" fill="#4a3278" />
      <path d="M44 45c2 2 6 2 8 0" stroke="#d4956a" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="30" y="56" width="36" height="22" rx="8" fill="#9ae600" />
      <circle cx="48" cy="64" r="4" fill="white" fillOpacity="0.55" />
      <path d="M46 64h4M48 62v4" stroke="#4a3278" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="person-bg-c" x1="14" y1="6" x2="82" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3ffe8" />
          <stop offset="1" stopColor="#f0ebff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const personIllustrations = {
  marketing: PersonIllustrationMarketing,
  operations: PersonIllustrationOperations,
  product: PersonIllustrationProduct,
} as const;

export type PersonIllustrationVariant = keyof typeof personIllustrations;
