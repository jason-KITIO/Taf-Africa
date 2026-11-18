import { cn } from "@/lib/utils";

const INK = "#14171c";
const LINE = "#e4dfd2";
const LINE_STRONG = "#cdc5b3";
const AMBER = "#e0900e";
const AMBER_DEEP = "#b4700a";
const AMBER_SOFT = "#fbeccb";
const SAND = "#f4efe3";
const SURFACE = "#ffffff";

type IllustrationProps = { className?: string };

/**
 * Deux côtés du marché reliés à un même nœud : profils (à gauche) et
 * missions (à droite). Dessiné à la main, aucun asset externe.
 */
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
          id="taf-hero-dots"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.5" fill={LINE_STRONG} />
        </pattern>
      </defs>

      <rect width="560" height="380" rx="28" fill={SAND} />
      <rect
        width="560"
        height="380"
        rx="28"
        fill="url(#taf-hero-dots)"
        opacity="0.45"
      />

      {/* Connectors */}
      <g stroke={LINE_STRONG} strokeWidth="1.6" fill="none">
        <path d="M232 86 C268 86 250 190 280 190" />
        <path d="M232 190 H280" />
        <path d="M232 294 C268 294 250 190 280 190" />
        <path d="M328 86 C292 86 310 190 280 190" />
        <path d="M328 190 H280" />
        <path d="M328 294 C292 294 310 190 280 190" />
      </g>

      {/* Left: talent chips */}
      {rows.map(({ y }) => (
        <g key={`l-${y}`}>
          <rect
            x="44"
            y={y}
            width="188"
            height="60"
            rx="15"
            fill={SURFACE}
            stroke={LINE}
          />
          <circle cx="76" cy={y + 30} r="15" fill={AMBER_SOFT} />
          <circle cx="76" cy={y + 24} r="5" fill={AMBER_DEEP} />
          <path
            d={`M67 ${y + 40} a9 9 0 0 1 18 0`}
            fill={AMBER_DEEP}
          />
          <rect x="104" y={y + 19} width="104" height="8" rx="4" fill={LINE} />
          <rect x="104" y={y + 34} width="66" height="8" rx="4" fill="#ece7dc" />
        </g>
      ))}

      {/* Right: mission chips */}
      {rows.map(({ y, locked }) => (
        <g key={`r-${y}`}>
          <rect
            x="328"
            y={y}
            width="188"
            height="60"
            rx="15"
            fill={SURFACE}
            stroke={LINE}
          />
          <rect
            x="344"
            y={y + 15}
            width="30"
            height="30"
            rx="9"
            fill={locked ? AMBER_SOFT : SAND}
          />
          {locked ? (
            <g
              stroke={AMBER_DEEP}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <rect x="352" y={y + 25} width="14" height="11" rx="3" />
              <path d={`M355 ${y + 25} v-3 a4 4 0 0 1 8 0 v3`} />
            </g>
          ) : (
            <circle cx="359" cy={y + 30} r="6" fill={AMBER} />
          )}
          <rect x="386" y={y + 19} width="104" height="8" rx="4" fill={LINE} />
          <rect x="386" y={y + 34} width="58" height="8" rx="4" fill="#ece7dc" />
        </g>
      ))}

      {/* Central node */}
      <circle cx="280" cy="190" r="30" fill={AMBER} opacity="0.16" />
      <circle cx="280" cy="190" r="17" fill={INK} />
      <circle cx="280" cy="190" r="6.5" fill={AMBER} />
    </svg>
  );
}

/**
 * Mobile Money + carte : le paiement local, sécurisé.
 */
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
          id="taf-pay-dots"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.5" fill={LINE_STRONG} />
        </pattern>
      </defs>

      <rect width="320" height="300" rx="24" fill={SAND} />
      <rect
        width="320"
        height="300"
        rx="24"
        fill="url(#taf-pay-dots)"
        opacity="0.45"
      />

      {/* Phone */}
      <rect
        x="168"
        y="28"
        width="118"
        height="244"
        rx="24"
        fill={SURFACE}
        stroke={LINE}
      />
      <rect x="182" y="52" width="90" height="196" rx="14" fill="#fbfaf6" />
      <rect x="208" y="38" width="38" height="6" rx="3" fill={LINE} />

      {/* Paid check */}
      <circle cx="227" cy="112" r="26" fill={AMBER} />
      <path
        d="M216 112 l8 8 15 -17"
        stroke={SURFACE}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="199" y="156" width="56" height="9" rx="4.5" fill={LINE} />
      <rect x="211" y="174" width="32" height="9" rx="4.5" fill="#ece7dc" />

      {/* Coins */}
      <g>
        <ellipse cx="227" cy="212" rx="26" ry="9" fill={AMBER_DEEP} />
        <ellipse cx="227" cy="207" rx="26" ry="9" fill={AMBER} />
        <ellipse cx="227" cy="226" rx="20" ry="7" fill={AMBER_DEEP} opacity="0.5" />
      </g>

      {/* Card */}
      <g>
        <rect
          x="30"
          y="150"
          width="150"
          height="98"
          rx="16"
          fill={INK}
        />
        <rect x="48" y="174" width="30" height="22" rx="5" fill={AMBER} />
        <rect x="48" y="212" width="76" height="8" rx="4" fill="#ffffff" opacity="0.35" />
        <rect x="48" y="226" width="46" height="8" rx="4" fill="#ffffff" opacity="0.2" />
        <circle cx="152" cy="222" r="10" fill={AMBER} opacity="0.85" />
        <circle cx="136" cy="222" r="10" fill="#ffffff" opacity="0.25" />
      </g>

      {/* Link from card to phone */}
      <path
        d="M180 199 C196 199 196 199 202 199"
        stroke={LINE_STRONG}
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

/**
 * Trois étapes reliées : publier, recevoir, payer.
 */
export function WorkflowIllustration({ className }: IllustrationProps) {
  const nodes = [
    { x: 54, fill: INK },
    { x: 180, fill: AMBER },
    { x: 306, fill: INK },
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
          id="taf-flow-dots"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.5" fill={LINE_STRONG} />
        </pattern>
      </defs>

      <rect width="360" height="200" rx="24" fill={SAND} />
      <rect
        width="360"
        height="200"
        rx="24"
        fill="url(#taf-flow-dots)"
        opacity="0.45"
      />

      <path
        d="M92 100 H142 M218 100 H268"
        stroke={LINE_STRONG}
        strokeWidth="2"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />

      {nodes.map((n, i) => (
        <g key={n.x}>
          <circle cx={n.x} cy="100" r="34" fill={SURFACE} stroke={LINE} />
          <circle cx={n.x} cy="100" r="22" fill={n.fill} />
          <text
            x={n.x}
            y="107"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={i === 1 ? INK : SURFACE}
            fontFamily="inherit"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}
