"use client"

import { useMemo, useState } from "react"
import {
  Check,
  Copy,
  Mail,
  Minus,
  Phone,
  Plus,
  Shuffle,
  Trash2,
} from "lucide-react"

import { DonutArt } from "@/components/donut"
import { donuts, site, type Donut } from "@/lib/site"
import { cn } from "@/lib/utils"

const FILTERS = [
  { id: "all", label: "All donuts" },
  { id: "topped", label: "Topped" },
  { id: "filled", label: "Filled" },
] as const

type Filter = (typeof FILTERS)[number]["id"]

export function Menu() {
  const [filter, setFilter] = useState<Filter>("all")
  const [box, setBox] = useState<Record<string, number>>({})
  const [copied, setCopied] = useState(false)

  const visible =
    filter === "all" ? donuts : donuts.filter((d) => d.category === filter)
  const count = Object.values(box).reduce((a, b) => a + b, 0)

  // One slot per donut, in the order they were added to the menu.
  const slots = useMemo(
    () =>
      donuts.flatMap((d) => Array.from({ length: box[d.id] ?? 0 }, () => d)),
    [box]
  )
  const slotCount = Math.max(12, Math.ceil(count / 6) * 6)

  const orderText = useMemo(() => {
    const lines = donuts
      .filter((d) => box[d.id])
      .map((d) => `${box[d.id]} × ${d.name}`)
    return `Hi! I'd like to order ${count} donut${count === 1 ? "" : "s"} ($${count}):\n${lines.join("\n")}`
  }, [box, count])

  function change(id: string, delta: number) {
    setCopied(false)
    setBox((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }
      if (!next[id]) delete next[id]
      return next
    })
  }

  function surprise() {
    setCopied(false)
    const next: Record<string, number> = {}
    for (let i = 0; i < 12; i++) {
      const d = donuts[Math.floor(Math.random() * donuts.length)]
      next[d.id] = (next[d.id] ?? 0) + 1
    }
    setBox(next)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(orderText)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div>
        <div
          role="group"
          aria-label="Filter donuts"
          className="mb-6 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const n =
              f.id === "all"
                ? donuts.length
                : donuts.filter((d) => d.category === f.id).length
            return (
              <button
                key={f.id}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors",
                  filter === f.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card hover:border-foreground/40"
                )}
              >
                {f.label} <span className="opacity-60">{n}</span>
              </button>
            )
          })}
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
          {visible.map((d) => (
            <DonutCard
              key={d.id}
              donut={d}
              qty={box[d.id] ?? 0}
              onChange={(delta) => change(d.id, delta)}
            />
          ))}
        </ul>
      </div>

      <aside id="box" className="scroll-mt-24 lg:sticky lg:top-24">
        <div className="rounded-3xl border-2 border-foreground bg-card p-5 shadow-[6px_6px_0_0_var(--foreground)]">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-2xl">Build a box</h3>
            <p className="text-sm text-muted-foreground tabular-nums">
              {count} {count === 1 ? "donut" : "donuts"}
            </p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick your flavors, then call or email the shop with your list.
          </p>

          <div className="mt-4 rounded-2xl bg-[#F3D3A8] p-2.5 dark:bg-[#4A2E1E]">
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: slotCount }, (_, i) => {
                const d = slots[i]
                return (
                  <div
                    key={i}
                    className="grid aspect-square place-items-center rounded-lg bg-[#FFF2DE] dark:bg-[#2C1B12]"
                  >
                    {d && (
                      <button
                        onClick={() => change(d.id, -1)}
                        className="size-full animate-in duration-200 zoom-in-50"
                        aria-label={`Remove one ${d.name}`}
                        title={`${d.name} — click to remove`}
                      >
                        <DonutArt
                          style={d.style}
                          seed={d.id}
                          className="size-full drop-shadow-none"
                        />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Total
              </p>
              <p className="font-display text-4xl tabular-nums">${count}</p>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={surprise}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted"
              >
                <Shuffle className="size-4" /> Surprise dozen
              </button>
              {count > 0 && (
                <button
                  onClick={() => setBox({})}
                  className="rounded-full border border-border p-2 hover:bg-muted"
                  aria-label="Empty box"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          </div>

          {count > 0 && count < 12 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {12 - count} more for a full dozen.
            </p>
          )}

          <div className="mt-4 grid gap-2">
            <a
              href={site.phoneHref}
              className={cn(
                "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition hover:brightness-110",
                count === 0 && "pointer-events-none opacity-50"
              )}
              aria-disabled={count === 0}
            >
              <Phone className="size-4" /> Call {site.phone}
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Donut order")}&body=${encodeURIComponent(orderText)}`}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-full border-2 border-foreground text-sm font-semibold hover:bg-muted",
                  count === 0 && "pointer-events-none opacity-50"
                )}
                aria-disabled={count === 0}
              >
                <Mail className="size-4" /> Email list
              </a>
              <button
                onClick={copy}
                disabled={count === 0}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border-2 border-foreground text-sm font-semibold hover:bg-muted disabled:opacity-50"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
                {copied ? "Copied" : "Copy list"}
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Flavors sell out — the shop will confirm what&apos;s available.
          </p>
        </div>
      </aside>

      {count > 0 && (
        <a
          href="#box"
          className="fixed inset-x-4 bottom-4 z-40 flex animate-in items-center justify-between rounded-full bg-foreground px-5 py-3 text-background shadow-xl slide-in-from-bottom-4 lg:hidden"
        >
          <span className="font-semibold">
            Your box · {count} {count === 1 ? "donut" : "donuts"}
          </span>
          <span className="font-display text-xl">${count}</span>
        </a>
      )}
    </div>
  )
}

function DonutCard({
  donut,
  qty,
  onChange,
}: {
  donut: Donut
  qty: number
  onChange: (delta: number) => void
}) {
  return (
    <li
      className={cn(
        "group relative flex flex-col rounded-3xl border-2 bg-card p-3 transition-all sm:p-4",
        qty > 0
          ? "border-primary"
          : "border-border hover:-translate-y-0.5 hover:border-foreground/30"
      )}
    >
      <div className="relative mx-auto aspect-square w-full max-w-[150px]">
        <DonutArt
          style={donut.style}
          seed={donut.id}
          title={donut.name}
          className="size-full transition-transform duration-500 group-hover:rotate-[24deg] motion-reduce:transition-none"
        />
        {qty > 0 && (
          <span className="absolute -top-1 -right-1 grid size-7 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {qty}
          </span>
        )}
      </div>
      <h3 className="mt-3 leading-tight font-semibold">{donut.name}</h3>
      <p className="mt-0.5 flex-1 text-[13px] leading-snug text-muted-foreground">
        {donut.note}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-xl">$1</span>
        {qty === 0 ? (
          <button
            onClick={() => onChange(1)}
            className="inline-flex size-9 items-center justify-center rounded-full bg-foreground text-background transition hover:scale-105"
            aria-label={`Add ${donut.name} to box`}
          >
            <Plus className="size-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1 rounded-full bg-secondary p-0.5">
            <button
              onClick={() => onChange(-1)}
              className="grid size-8 place-items-center rounded-full hover:bg-card"
              aria-label={`Remove one ${donut.name}`}
            >
              <Minus className="size-4" />
            </button>
            <span className="w-4 text-center text-sm font-bold tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => onChange(1)}
              className="grid size-8 place-items-center rounded-full hover:bg-card"
              aria-label={`Add another ${donut.name}`}
            >
              <Plus className="size-4" />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
