import type { Metadata, Viewport } from "next"
import { Bagel_Fat_One, DM_Sans, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

const display = Bagel_Fat_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bagel",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Dollar Donut Shops — Every donut, one dollar · Howell, NJ",
  description:
    "Fresh donuts baked daily, every single one just $1. Classic glazed, cereal-topped, cream-filled, plus coffee and cold brew on tap. 2223 Route 9 N, Howell, NJ.",
  openGraph: {
    title: "Dollar Donut Shops — Every donut, one dollar",
    description:
      "26 flavors, all $1, baked fresh daily in Howell, NJ. Coffee from $1.99 and cold brew always on tap.",
    type: "website",
    url: site.url,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff7ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1a100b" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        sans.variable,
        display.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
