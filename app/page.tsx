import {
  ArrowRight,
  AtSign,
  Clock,
  Coffee,
  Heart,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Wheat,
} from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { DonutArt } from "@/components/donut"
import { Menu } from "@/components/menu"
import { HoursTable, StatusPill } from "@/components/shop-status"
import { SiteHeader } from "@/components/site-header"
import { coffee, donuts, fullAddress, hours, icing, site } from "@/lib/site"

const mapsQuery = encodeURIComponent(site.mapsQuery)
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

const DAY_CODES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const pad = (h: number) => `${String(h).padStart(2, "0")}:00`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  url: site.url,
  telephone: `+1-${site.phone}`,
  email: site.email,
  priceRange: "$",
  servesCuisine: ["Donuts", "Coffee"],
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHours: hours.map(
    (h, i) => `${DAY_CODES[i]} ${pad(h.open)}-${pad(h.close)}`
  ),
}

const heroDonuts = [
  {
    d: "chocolate-sprinkle",
    cls: "top-[2%] left-[4%] w-[30%]",
    r: "-12deg",
    delay: "0s",
  },
  {
    d: "fruity-pebble",
    cls: "right-[0%] bottom-[10%] w-[32%]",
    r: "10deg",
    delay: "-2s",
  },
  {
    d: "jelly-powdered",
    cls: "bottom-[0%] left-[8%] w-[24%]",
    r: "0deg",
    delay: "-4s",
  },
  {
    d: "oreo-crumble",
    cls: "top-[8%] right-[10%] w-[20%]",
    r: "20deg",
    delay: "-3s",
  },
]

const byId = (id: string) => donuts.find((d) => d.id === id)!

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <main id="top" className="overflow-x-clip">
        {/* Hero */}
        <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-6 pb-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-12 md:pb-24">
          <div>
            <StatusPill />
            <h1 className="mt-6 font-display text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.92] tracking-tight">
              Every donut.
              <br />
              <span className="relative inline-block text-primary">
                One dollar.
                <svg
                  viewBox="0 0 300 20"
                  className="absolute -bottom-2 left-0 w-full text-accent"
                  aria-hidden
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 14 Q 75 2 150 10 T 297 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-7 max-w-md text-lg text-muted-foreground">
              Baked fresh every morning on Route 9 in Howell, NJ.{" "}
              {donuts.length} flavors, from classic glazed to Fruity Pebble, and
              not one of them over a buck.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-[0_6px_0_0_color-mix(in_oklch,var(--primary),black_30%)] transition hover:translate-y-0.5 hover:shadow-[0_4px_0_0_color-mix(in_oklch,var(--primary),black_30%)]"
              >
                Build your box
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-foreground px-6 font-semibold transition hover:bg-foreground hover:text-background"
              >
                <Navigation className="size-4" /> Directions
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t-2 border-dashed border-border pt-6">
              {[
                { k: "$1", v: "every donut" },
                { k: "$1.99", v: "hot coffee" },
                { k: "6 AM", v: "open weekdays" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl sm:text-3xl">{s.k}</dt>
                  <dd className="text-sm text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-[8%] rounded-full bg-secondary" />
            <div className="absolute inset-[18%] rounded-full border-4 border-dashed border-primary/25" />
            <DonutArt
              style={{
                kind: "ring",
                coat: "icing",
                icing: icing.strawberry,
                topping: "sprinkles",
              }}
              seed="hero"
              title="Strawberry sprinkle donut"
              className="absolute inset-[22%] size-[56%] animate-[spin_60s_linear_infinite] drop-shadow-[0_24px_30px_rgba(70,30,10,0.35)] motion-reduce:animate-none"
            />
            {heroDonuts.map((h) => (
              <div
                key={h.d}
                className={`absolute ${h.cls} animate-float motion-reduce:animate-none`}
                style={
                  { "--r": h.r, animationDelay: h.delay } as React.CSSProperties
                }
              >
                <DonutArt
                  style={byId(h.d).style}
                  seed={h.d}
                  className="w-full"
                />
              </div>
            ))}
            <div className="absolute top-[38%] -right-1 grid size-24 rotate-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg sm:size-28">
              <div className="text-center leading-none">
                <div className="font-display text-4xl sm:text-5xl">$1</div>
                <div className="mt-0.5 text-xs font-bold tracking-widest uppercase">
                  each
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flavor marquee */}
        <div className="relative -rotate-1 border-y-2 border-foreground bg-primary py-3 text-primary-foreground">
          <div className="flex w-max animate-marquee motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1}
              >
                {donuts.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center gap-6 pr-6 font-display text-xl whitespace-nowrap sm:text-2xl"
                  >
                    {d.name}
                    <Sparkles className="size-5 text-accent" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Menu */}
        <section
          id="menu"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-20 pb-16 sm:px-6 md:pt-28"
        >
          <SectionHeading
            eyebrow="The menu"
            title={`${donuts.length} flavors. All $1.`}
          >
            Tap a donut to add it to your box. Planning for the office or a
            party? Build it here, then call it in.
          </SectionHeading>
          <Menu />
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-dashed border-border bg-muted/60 p-4 text-sm text-muted-foreground">
            <Wheat className="mt-0.5 size-5 shrink-0 text-foreground" />
            <p>
              <span className="font-semibold text-foreground">
                Allergen info:
              </span>{" "}
              our donuts may contain eggs, milk, soy and wheat. Ask us in the
              shop or call {site.phone} for full ingredient details.
            </p>
          </div>
        </section>

        {/* Coffee */}
        <section
          id="coffee"
          className="scroll-mt-16 bg-[#2B1810] text-[#FBEFE4] dark:bg-[#0F0806]"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-end">
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-[#FF8FB5] uppercase">
                  Coffee bar
                </p>
                <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
                  Donut + coffee <br />
                  <span className="text-accent">under $3.</span>
                </h2>
                <p className="mt-5 max-w-sm text-[#E0CBB9]">
                  Fresh-brewed house blend all day, creamy lattes and cold brew
                  that&apos;s always on tap.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-3">
                {coffee.map((c) => (
                  <li
                    key={c.name}
                    className="flex flex-col rounded-3xl bg-[#3D2418] p-5 ring-1 ring-white/5"
                  >
                    <Coffee className="size-6 text-[#FF8FB5]" />
                    <h3 className="mt-4 font-display text-2xl">{c.name}</h3>
                    <p className="text-sm text-[#C4A895]">{c.note}</p>
                    <div className="mt-auto pt-6">
                      {c.sizes.map((s) => (
                        <div
                          key={s.size}
                          className="flex items-baseline justify-between border-t border-white/10 py-2"
                        >
                          <span className="text-sm text-[#C4A895]">
                            {s.size}
                          </span>
                          <span className="font-display text-2xl">
                            {s.price}
                          </span>
                        </div>
                      ))}
                      {c.extra && (
                        <p className="text-xs text-[#C4A895]">{c.extra}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Story */}
        <section
          id="story"
          className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28"
        >
          <div className="relative mx-auto grid w-full max-w-sm grid-cols-3 gap-x-3 gap-y-8 pb-6 md:order-last">
            {[
              "vanilla-sprinkle",
              "boston-cream",
              "froot-loop",
              "lemon-coconut",
              "chocolate-mms",
              "glazed-jelly",
              "strawberry-drizzle",
              "cinnamon-toast-crunch",
              "blueberry-iced",
            ].map((id, i) => (
              <div key={id} className={i % 2 ? "translate-y-6" : ""}>
                <DonutArt style={byId(id).style} seed={id} className="w-full" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              Our story
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Made from pure donut passion.
            </h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                Dollar Donut Shops started with a simple love of making really
                good donuts: the classic glazed you grew up on, and the wild
                flavors you didn&apos;t know you needed.
              </p>
              <p>
                Everything is baked fresh every day with quality ingredients,
                and every donut costs one dollar. No asterisks, no
                &ldquo;premium&rdquo; upcharge. Our favorite part is watching
                people pick out a box and leave happy.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Clock, t: "Fresh daily", d: "Baked every morning" },
                { icon: Heart, t: "Real quality", d: "Ingredients we trust" },
                { icon: Sparkles, t: "Always $1", d: "Every single flavor" },
              ].map(({ icon: Icon, t, d }) => (
                <li
                  key={t}
                  className="rounded-2xl border-2 border-border bg-card p-4"
                >
                  <Icon className="size-5 text-primary" />
                  <p className="mt-2 font-semibold">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className="scroll-mt-16 bg-muted/70">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading eyebrow="Visit us" title="Come hungry.">
              Right on Route 9 North in Howell. We close early if we sell out,
              so the early bird gets the Boston Cream.
            </SectionHeading>

            <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
              <div className="flex flex-col overflow-hidden rounded-3xl border-2 border-foreground bg-card">
                <iframe
                  title={`Map of ${fullAddress}`}
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  className="min-h-72 w-full flex-1 grayscale-[30%] dark:hue-rotate-180 dark:invert-[0.9]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                    <address className="not-italic">
                      <span className="font-semibold">
                        {site.address.street}
                      </span>
                      <br />
                      <span className="text-muted-foreground">
                        {site.address.city}, {site.address.state}{" "}
                        {site.address.zip}
                      </span>
                    </address>
                  </div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 font-semibold text-background transition hover:opacity-90"
                  >
                    <Navigation className="size-4" /> Get directions
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border-2 border-border bg-card p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-2xl">Hours</h3>
                  <StatusPill className="text-xs shadow-none" />
                </div>
                <HoursTable />
                <p className="mt-4 text-sm text-muted-foreground">
                  We close early if we sell out. Holiday hours may vary, so call
                  ahead.
                </p>
                <div className="mt-6 grid gap-2 border-t border-border pt-5">
                  <ContactRow
                    href={site.phoneHref}
                    icon={Phone}
                    label={site.phone}
                  />
                  <ContactRow
                    href={`mailto:${site.email}`}
                    icon={Mail}
                    label={site.email}
                  />
                  <ContactRow
                    href={site.instagram}
                    icon={AtSign}
                    label={site.instagramHandle}
                    external
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28"
        >
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              Say hi
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
              Questions? Big order?
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Office mornings, birthdays, team breakfasts: drop us a line and
              we&apos;ll get back to you. For the latest flavors and sell-outs,
              follow along on Instagram.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-6 py-3 font-semibold text-white transition hover:brightness-110"
            >
              <AtSign className="size-5" /> Follow {site.instagramHandle}
            </a>
          </div>
          <div className="rounded-3xl border-2 border-foreground bg-card p-5 shadow-[6px_6px_0_0_var(--foreground)] sm:p-7">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-foreground bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6">
          <p className="font-display text-[clamp(3rem,13vw,9rem)] leading-[0.85]">
            Dollar Donut.
          </p>
          <div className="mt-10 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
              {fullAddress} ·{" "}
              <a
                href={site.phoneHref}
                className="underline-offset-4 hover:underline"
              >
                {site.phone}
              </a>
            </p>
            <p className="opacity-80">
              © {new Date().getFullYear()} {site.name}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{children}</p>
    </div>
  )
}

function ContactRow({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="flex items-center gap-3 rounded-xl px-2 py-2 font-medium transition hover:bg-muted"
    >
      <span className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground">
        <Icon className="size-4" />
      </span>
      {label}
    </a>
  )
}
