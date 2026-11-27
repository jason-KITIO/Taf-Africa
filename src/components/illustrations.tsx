import { cn } from "@/lib/utils";

const MATTER = "#121113";
const PANEL = "#1a191c";
const RAISED = "#222124";
const LINE = "#2c2b30";
const LINE_STRONG = "#414046";
const INK = "#f4f2ed";
const MUTED = "#a09fa6";
const TEAL = "#74b9b6";
const LIME = "#cfdc00";
const LIME_SOFT = "#262a08";

type IllustrationProps = { className?: string };

export function HeroIllustration({ className }: IllustrationProps) {
  const rows = [
    { y: 56, locked: false },
    { y: 160, locked: true },
    { y: 264, locked: true },
  ];

  return (
    <svg
      viewBox="0 0 560 380"
      fill="none"
      role="img"
      aria-label="Des profils de freelances reliés à des missions, au même endroit"
      className={cn("h-auto w-full", className)}
    >
      <defs>
        <pattern
          id="taf-hero-grid"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0H0V28"
            fill="none"
            stroke={LINE}
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="560" height="380" fill={MATTER} />
      <rect width="560" height="380" fill="url(#taf-hero-grid)" />

      <g stroke={LINE_STRONG} strokeWidth="1.5" fill="none">
        <path d="M232 86 C268 86 250 190 280 190" />
        <path d="M232 190 H280" />
        <path d="M232 294 C268 294 250 190 280 190" />
        <path d="M328 86 C292 86 310 190 280 190" />
        <path d="M328 190 H280" />
        <path d="M328 294 C292 294 310 190 280 190" />
      </g>

      {rows.map(({ y }) => (
        <g key={`l-${y}`}>
          <rect
            x="44"
            y={y}
            width="188"
            height="60"
            fill={PANEL}
            stroke={LINE_STRONG}
          />
          <rect x="60" y={y + 14} width="32" height="32" fill={RAISED} stroke={LINE} />
          <circle cx="76" cy={y + 25} r="5" fill={TEAL} />
          <path
            d={`M67 ${y + 41} a9 9 0 0 1 18 0`}
            fill={TEAL}
            opacity="0.7"
          />
          <rect x="104" y={y + 19} width="104" height="8" fill={LINE_STRONG} />
          <rect x="104" y={y + 34} width="66" height="8" fill={LINE} />
        </g>
      ))}

      {rows.map(({ y, locked }) => (
        <g key={`r-${y}`}>
          <rect
            x="328"
            y={y}
            width="188"
            height="60"
            fill={PANEL}
            stroke={LINE_STRONG}
          />
          <rect
            x="344"
            y={y + 15}
            width="30"
            height="30"
            fill={locked ? LIME_SOFT : RAISED}
            stroke={locked ? LIME : LINE}
          />
          {locked ? (
            <g
              stroke={LIME}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <rect x="352" y={y + 25} width="14" height="11" />
              <path d={`M355 ${y + 25} v-3 a4 4 0 0 1 8 0 v3`} />
            </g>
          ) : (
            <circle cx="359" cy={y + 30} r="6" fill={TEAL} />
          )}
          <rect x="386" y={y + 19} width="104" height="8" fill={LINE_STRONG} />
          <rect x="386" y={y + 34} width="58" height="8" fill={LINE} />
        </g>
      ))}

      <rect x="260" y="170" width="40" height="40" fill={PANEL} stroke={LIME} />
      <rect x="271" y="181" width="18" height="18" fill={LIME} />
    </svg>
  );
}

export function PaymentIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 300"
      fill="none"
      role="img"
      aria-label="Paiement par Mobile Money et carte bancaire"
      className={cn("h-auto w-full", className)}
    >
      <defs>
        <pattern
          id="taf-pay-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path d="M24 0H0V24" fill="none" stroke={LINE} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="320" height="300" fill={MATTER} />
      <rect width="320" height="300" fill="url(#taf-pay-grid)" />

      <rect
        x="168"
        y="28"
        width="118"
        height="244"
        fill={PANEL}
        stroke={LINE_STRONG}
      />
      <rect x="182" y="52" width="90" height="196" fill={MATTER} stroke={LINE} />
      <rect x="208" y="38" width="38" height="6" fill={LINE_STRONG} />

      <rect x="201" y="86" width="52" height="52" fill={LIME_SOFT} stroke={LIME} />
      <path
        d="M216 112 l8 8 15 -17"
        stroke={LIME}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="199" y="156" width="56" height="8" fill={LINE_STRONG} />
      <rect x="211" y="174" width="32" height="8" fill={LINE} />

      <g stroke={TEAL} strokeWidth="1.5">
        <ellipse cx="227" cy="212" rx="24" ry="8" fill={RAISED} />
        <ellipse cx="227" cy="206" rx="24" ry="8" fill={PANEL} />
        <ellipse cx="227" cy="224" rx="18" ry="6" fill={RAISED} />
      </g>

      <rect x="30" y="150" width="150" height="98" fill={PANEL} stroke={LINE_STRONG} />
      <rect x="48" y="174" width="30" height="22" fill={LIME_SOFT} stroke={LIME} />
      <rect x="48" y="212" width="76" height="8" fill={LINE_STRONG} />
      <rect x="48" y="226" width="46" height="8" fill={LINE} />
      <rect x="142" y="212" width="20" height="20" fill={RAISED} stroke={TEAL} />
      <rect x="126" y="212" width="20" height="20" fill={RAISED} stroke={LINE} />

      <path
        d="M180 199 H202"
        stroke={MUTED}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export function WorkflowIllustration({ className }: IllustrationProps) {
  const nodes = [
    { x: 54, active: false },
    { x: 180, active: true },
    { x: 306, active: false },
  ];

  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      role="img"
      aria-label="Trois étapes : publier un besoin, recevoir des propositions, payer en sécurité"
      className={cn("h-auto w-full", className)}
    >
      <defs>
        <pattern
          id="taf-flow-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path d="M24 0H0V24" fill="none" stroke={LINE} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="360" height="200" fill={MATTER} />
      <rect width="360" height="200" fill="url(#taf-flow-grid)" />

      <path
        d="M92 100 H142 M218 100 H268"
        stroke={LINE_STRONG}
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      {nodes.map((n, i) => (
        <g key={n.x}>
          <rect
            x={n.x - 34}
            y="66"
            width="68"
            height="68"
            fill={n.active ? LIME_SOFT : PANEL}
            stroke={n.active ? LIME : LINE_STRONG}
          />
          <text
            x={n.x}
            y="107"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill={n.active ? LIME : INK}
            fontFamily="inherit"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
