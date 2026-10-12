"use client"

import { useEffect, useState } from "react"
import { Menu as MenuIcon, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"

import { DonutArt } from "@/components/donut"
import { icing, site } from "@/lib/site"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#coffee", label: "Coffee" },
  { href: "#story", label: "Our story" },
  { href: "#visit", label: "Visit" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter]",
        scrolled || open
          ? "bg-background/85 shadow-[0_1px_0_0_var(--border)] backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <DonutArt
            style={{
              kind: "ring",
              coat: "icing",
              icing: icing.strawberry,
              topping: "sprinkles",
            }}
            seed="logo"
            className="size-9 drop-shadow-none"
          />
          <span className="font-display text-xl leading-none">
            Dollar <span className="text-primary">Donut</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="grid size-10 place-items-center rounded-full hover:bg-muted"
            aria-label="Toggle dark mode"
          >
            <Sun className="hidden size-5 dark:block" />
            <Moon className="size-5 dark:hidden" />
          </button>
          <a
            href={site.phoneHref}
            className="hidden h-10 items-center rounded-full bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90 sm:inline-flex"
          >
            {site.phone}
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full hover:bg-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border px-4 pt-2 pb-5 md:hidden"
          aria-label="Mobile"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 font-display text-2xl hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="mt-3 flex h-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
          >
            Call {site.phone}
          </a>
        </nav>
      )}
    </header>
  )
}
