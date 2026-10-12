import { useId } from "react"

import type { DonutStyle } from "@/lib/site"
import { cn } from "@/lib/utils"

const DOUGH = "#E9A75F"
const DOUGH_EDGE = "#C47E3E"
const SPRINKLES = [
  "#FF4F8B",
  "#FFC93C",
  "#3DD6C6",
  "#5B8CFF",
  "#FFFFFF",
  "#9B6BFF",
]
const CANDY = ["#E8272C", "#FFC93C", "#2E7DE1", "#22A35A", "#F57C1F", "#6B3A1E"]

// Deterministic so server and client renders match.
function rng(seed: string) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

function wavy(r: number, amp: number, lobes: number, phase = 0) {
  const pts: string[] = []
  const steps = 96
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const rr =
      r + amp * Math.sin(lobes * t + phase) + amp * 0.4 * Math.sin(3 * t)
    pts.push(
      `${(50 + rr * Math.cos(t)).toFixed(2)},${(50 + rr * Math.sin(t)).toFixed(2)}`
    )
  }
  return `M${pts.join("L")}Z`
}

function scatter(
  rand: () => number,
  count: number,
  inner: number,
  outer: number
) {
  return Array.from({ length: count }, () => {
    const r = Math.sqrt(rand() * (outer ** 2 - inner ** 2) + inner ** 2)
    const t = rand() * Math.PI * 2
    return {
      x: 50 + r * Math.cos(t),
      y: 50 + r * Math.sin(t),
      rot: rand() * 180,
      k: rand(),
    }
  })
}

function Toppings({
  topping,
  seed,
  inner,
  outer,
}: {
  topping: DonutStyle["topping"]
  seed: string
  inner: number
  outer: number
}) {
  const rand = rng(seed)
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]

  switch (topping) {
    case "sprinkles":
      return scatter(rand, 38, inner, outer).map((p, i) => (
        <rect
          key={i}
          x={p.x - 3}
          y={p.y - 1}
          width={6}
          height={2.2}
          rx={1.1}
          fill={pick(SPRINKLES)}
          transform={`rotate(${p.rot} ${p.x} ${p.y})`}
        />
      ))
    case "candy":
      return scatter(rand, 11, inner + 2, outer - 2).map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={3.6} fill={pick(CANDY)} />
          <circle
            cx={p.x - 1.1}
            cy={p.y - 1.1}
            r={1}
            fill="#fff"
            opacity={0.55}
          />
        </g>
      ))
    case "crumble":
    case "oreo": {
      const colors =
        topping === "oreo"
          ? ["#231815", "#231815", "#3A2A24", "#F7F1E6"]
          : ["#B27A43", "#8A5A2E", "#C99A62", "#3B2116"]
      return scatter(rand, 30, inner, outer).map((p, i) => {
        const s = 1.4 + p.k * 2.2
        return (
          <polygon
            key={i}
            points={`${p.x - s},${p.y} ${p.x},${p.y - s * 0.9} ${p.x + s * 1.1},${p.y + s * 0.2} ${p.x + s * 0.2},${p.y + s}`}
            fill={pick(colors)}
            transform={`rotate(${p.rot} ${p.x} ${p.y})`}
          />
        )
      })
    }
    case "cereal":
      return scatter(rand, 26, inner, outer).map((p, i) =>
        p.k > 0.6 ? (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.3}
            fill="none"
            stroke={pick(SPRINKLES.slice(0, 4).concat("#F57C1F", "#22A35A"))}
            strokeWidth={1.6}
          />
        ) : (
          <polygon
            key={i}
            points={`${p.x - 2},${p.y - 1} ${p.x + 1.5},${p.y - 2} ${p.x + 2.2},${p.y + 1.2} ${p.x - 1},${p.y + 2}`}
            fill={pick(SPRINKLES.slice(0, 4).concat("#F57C1F", "#9B6BFF"))}
            transform={`rotate(${p.rot} ${p.x} ${p.y})`}
          />
        )
      )
    case "cinnamon":
      return scatter(rand, 13, inner + 2, outer - 2).map((p, i) => (
        <g key={i} transform={`rotate(${p.rot} ${p.x} ${p.y})`}>
          <rect
            x={p.x - 3}
            y={p.y - 3}
            width={6}
            height={6}
            rx={1}
            fill="#D9934A"
          />
          <circle cx={p.x - 1} cy={p.y - 1} r={0.6} fill="#8A4F1C" />
          <circle cx={p.x + 1.2} cy={p.y + 0.8} r={0.6} fill="#8A4F1C" />
        </g>
      ))
    case "chips":
      return scatter(rand, 20, inner, outer).map((p, i) => (
        <path
          key={i}
          d={`M${p.x} ${p.y - 2.4} Q${p.x + 2.2} ${p.y + 1.6} ${p.x} ${p.y + 1.8} Q${p.x - 2.2} ${p.y + 1.6} ${p.x} ${p.y - 2.4}Z`}
          fill="#3B2116"
        />
      ))
    case "drizzle":
      return (
        <path
          d={wavy((inner + outer) / 2, (outer - inner) / 2 - 1, 11, 0.6)}
          fill="none"
          stroke="#4A2414"
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
      )
    default:
      return null
  }
}

function Specks({
  seed,
  count,
  color,
  size,
  inner = 0,
  outer = 40,
}: {
  seed: string
  count: number
  color: string | string[]
  size: number
  inner?: number
  outer?: number
}) {
  const rand = rng(seed)
  const colors = Array.isArray(color) ? color : [color]
  return scatter(rand, count, inner, outer).map((p, i) => (
    <rect
      key={i}
      x={p.x - size}
      y={p.y - size / 3}
      width={size * 2}
      height={size / 1.5}
      rx={size / 3}
      fill={colors[i % colors.length]}
      transform={`rotate(${p.rot} ${p.x} ${p.y})`}
    />
  ))
}

export function DonutArt({
  style,
  seed,
  className,
  title,
}: {
  style: DonutStyle
  seed: string
  className?: string
  title?: string
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const hole = `hole-${id}`
  const dough = `dough-${id}`

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("drop-shadow-[0_6px_10px_rgba(70,30,10,0.25)]", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {style.kind === "ring" ? (
        <>
          <defs>
            <mask id={hole}>
              <rect width="100" height="100" fill="#fff" />
              <circle cx="50" cy="50" r="12.5" fill="#000" />
            </mask>
          </defs>
          <g mask={`url(#${hole})`}>
            <circle cx="50" cy="50" r="46" fill={DOUGH} />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={DOUGH_EDGE}
              strokeWidth="2"
              opacity="0.6"
            />
            <circle
              cx="50"
              cy="50"
              r="14"
              fill="none"
              stroke={DOUGH_EDGE}
              strokeWidth="3"
              opacity="0.7"
            />
            <path d={wavy(37, 2.6, 9, seed.length)} fill={style.icing} />
            <circle cx="50" cy="50" r="16.5" fill={DOUGH} />
            <circle
              cx="50"
              cy="50"
              r="14"
              fill="none"
              stroke={DOUGH_EDGE}
              strokeWidth="3"
              opacity="0.7"
            />
            <path
              d="M24 38 A28 28 0 0 1 40 22"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.35"
            />
            <Toppings
              topping={style.topping}
              seed={seed}
              inner={20}
              outer={33}
            />
          </g>
        </>
      ) : (
        <>
          <defs>
            <radialGradient id={dough} cx="42%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F6C487" />
              <stop offset="70%" stopColor={DOUGH} />
              <stop offset="100%" stopColor="#CF873F" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill={`url(#${dough})`} />
          <circle
            cx="50"
            cy="50"
            r="43"
            fill="none"
            stroke={DOUGH_EDGE}
            strokeWidth="2"
            opacity="0.5"
          />
          {style.coat === "icing" && (
            <path d={wavy(33, 2.4, 8, seed.length)} fill={style.icing} />
          )}
          {style.coat === "glaze" && (
            <>
              <circle cx="50" cy="50" r="42" fill="#FFE9C2" opacity="0.35" />
              <path
                d="M20 44 A31 31 0 0 1 44 19"
                fill="none"
                stroke="#fff"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.75"
              />
              <path
                d="M27 50 A24 24 0 0 1 32 36"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M62 82 A34 34 0 0 0 80 68"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.35"
              />
            </>
          )}
          {style.coat === "powder" && (
            <>
              <path d={wavy(39, 1.6, 13, seed.length)} fill="#FFFDF8" />
              <Specks
                seed={seed}
                count={60}
                color="#FFFDF8"
                size={1.3}
                inner={38}
                outer={43}
              />
              <Specks
                seed={seed + "s"}
                count={22}
                color="#EFDCC0"
                size={1.1}
                outer={34}
              />
            </>
          )}
          {style.coat === "sugar" && (
            <>
              <circle cx="50" cy="50" r="42" fill="#D9A065" opacity="0.45" />
              <Specks
                seed={seed}
                count={120}
                color={["#FFF4E0", "#8E5326", "#FFF4E0", "#B9773C"]}
                size={0.8}
                outer={42}
              />
            </>
          )}
          {style.coat === "coconut" && (
            <>
              <path d={wavy(40, 1.4, 15, seed.length)} fill="#FFF6E6" />
              <Specks
                seed={seed}
                count={90}
                color={["#FFFFFF", "#E4CFAE", "#FFFFFF", "#F2E3CC"]}
                size={2.4}
                outer={42}
              />
            </>
          )}
          {style.coat !== "glaze" && style.coat !== "sugar" && (
            <path
              d="M24 40 A28 28 0 0 1 40 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.35"
            />
          )}
          <ellipse
            cx="82"
            cy="52"
            rx="8.5"
            ry="7"
            fill={style.filling}
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="1"
          />
          <ellipse
            cx="80"
            cy="49.5"
            rx="3"
            ry="1.8"
            fill="#fff"
            opacity="0.55"
          />
        </>
      )}
    </svg>
  )
}
