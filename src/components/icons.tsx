import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Base>
);

export const Search = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Base>
);

export const Sparkles = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4" />
  </Base>
);

export const Lock = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="10" width="16" height="11" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 15v2" />
  </Base>
);

export const Wallet = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1" />
    <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
    <path d="M16 13.5h2" />
  </Base>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="m9.5 12 1.8 1.8L15 10" />
  </Base>
);

export const Users = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 19v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V19" />
    <circle cx="9" cy="7" r="3.2" />
    <path d="M22 19v-1.5a4 4 0 0 0-3-3.87" />
    <path d="M16 4.2a3.2 3.2 0 0 1 0 6" />
  </Base>
);

export const Star = (p: IconProps) => (
  <Base fill="currentColor" stroke="none" {...p}>
    <path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.14 1 5.86L12 16.9l-5.25 2.75 1-5.86L3.5 9.65l5.9-.85L12 3.5Z" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Eye = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Base>
);

export const Coin = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v9M14.5 9.6a2.6 2.6 0 0 0-2.5-1.6c-1.5 0-2.6.8-2.6 2s1 1.8 2.6 2.1c1.7.3 2.7 1 2.7 2.2s-1.2 2-2.7 2a2.7 2.7 0 0 1-2.6-1.7" />
  </Base>
);

export const Help = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.4 9.3a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.1-2.6 3.8" />
    <path d="M12 17.2h.01" />
  </Base>
);

export const Chat = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.4-4.2A8 8 0 1 1 21 12Z" />
    <path d="M8.5 11h7M8.5 14h4" />
  </Base>
);

export const Send = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12 20 5l-7 15-2.2-6.2L4 12Z" />
  </Base>
);

export const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const Code = (p: IconProps) => (
  <Base {...p}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M11 18.5h2" />
  </Base>
);

export const Palette = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3a9 9 0 0 0 0 18c1.3 0 2-.9 2-1.9 0-.6-.3-1-.6-1.4-.3-.4-.6-.8-.6-1.4 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-6.5-9-6.5Z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Pen = (p: IconProps) => (
  <Base {...p}>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    <path d="m14.5 5.5 3 3" />
  </Base>
);

export const Megaphone = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1Z" />
    <path d="M18 9.5a3 3 0 0 1 0 5" />
    <path d="M8 15v4" />
  </Base>
);

export const Cart = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L20.5 7H6" />
    <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="20" r="1.2" fill="currentColor" stroke="none" />
  </Base>
);

export const Brain = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5a3 3 0 0 0-6 0 3 3 0 0 0-1.5 5.6A3 3 0 0 0 6 16a3 3 0 0 0 6 .5V5Z" />
    <path d="M12 5a3 3 0 0 1 6 0 3 3 0 0 1 1.5 5.6A3 3 0 0 1 18 16a3 3 0 0 1-6 .5" />
  </Base>
);

export const Camera = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6" width="18" height="14" rx="3" />
    <circle cx="12" cy="13" r="3.4" />
    <path d="M8.5 6 9.5 4h5l1 2" />
  </Base>
);

export const Headset = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2.5" y="13.5" width="4" height="6" rx="1.6" />
    <rect x="17.5" y="13.5" width="4" height="6" rx="1.6" />
    <path d="M20 19.5a3.5 3.5 0 0 1-3.5 3H13" />
  </Base>
);

export const Briefcase = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
    <path d="M3 12h18" />
  </Base>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const Globe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
  </Base>
);

export const Target = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </Base>
);

export const Layers = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </Base>
);
