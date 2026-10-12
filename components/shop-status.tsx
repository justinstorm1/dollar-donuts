"use client"

import { useSyncExternalStore } from "react"

import { formatHour, hours, site } from "@/lib/site"
import { cn } from "@/lib/utils"

type ShopTime = { day: number; minutes: number }

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 30_000)
  return () => clearInterval(timer)
}

let cached: { key: string; value: ShopTime } | null = null

function getShopTime(): ShopTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  const key = `${get("weekday")}-${get("hour")}-${get("minute")}`
  // useSyncExternalStore needs a stable reference between ticks.
  if (cached?.key !== key) {
    cached = {
      key,
      value: {
        day: WEEKDAYS.indexOf(get("weekday")),
        minutes: Number(get("hour")) * 60 + Number(get("minute")),
      },
    }
  }
  return cached.value
}

function useShopTime() {
  return useSyncExternalStore(subscribe, getShopTime, () => null)
}

function describe({ day, minutes }: ShopTime) {
  const today = hours[day]
  if (minutes >= today.open * 60 && minutes < today.close * 60) {
    const left = today.close * 60 - minutes
    return {
      open: true,
      label: left <= 60 ? "Closing soon" : "Open now",
      detail: `until ${formatHour(today.close)}`,
    }
  }
  if (minutes < today.open * 60) {
    return {
      open: false,
      label: "Closed",
      detail: `opens ${formatHour(today.open)} today`,
    }
  }
  const next = hours[(day + 1) % 7]
  return {
    open: false,
    label: "Closed",
    detail: `opens ${formatHour(next.open)} tomorrow`,
  }
}

export function StatusPill({ className }: { className?: string }) {
  const now = useShopTime()
  const status = now && describe(now)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium shadow-sm",
        className
      )}
    >
      <span className="relative flex size-2.5">
        {status?.open && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2.5 rounded-full",
            !status
              ? "bg-muted-foreground/40"
              : status.open
                ? "bg-emerald-500"
                : "bg-primary"
          )}
        />
      </span>
      {status ? (
        <span>
          {status.label}{" "}
          <span className="text-muted-foreground">· {status.detail}</span>
        </span>
      ) : (
        <span className="text-muted-foreground">Checking hours…</span>
      )}
    </span>
  )
}

export function HoursTable() {
  const now = useShopTime()
  // Display Monday first.
  const order = [1, 2, 3, 4, 5, 6, 0]

  return (
    <dl className="divide-y divide-border">
      {order.map((d) => {
        const isToday = now?.day === d
        return (
          <div
            key={d}
            className={cn(
              "flex items-center justify-between gap-4 px-3 py-2.5 text-[15px]",
              isToday &&
                "rounded-xl border-transparent bg-secondary font-semibold text-secondary-foreground"
            )}
          >
            <dt className="flex items-center gap-2">
              {hours[d].day}
              {isToday && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
                  Today
                </span>
              )}
            </dt>
            <dd className="tabular-nums">
              {formatHour(hours[d].open)} – {formatHour(hours[d].close)}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
