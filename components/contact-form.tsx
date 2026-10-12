"use client"

import { Send } from "lucide-react"

import { site } from "@/lib/site"

const field =
  "w-full rounded-2xl border-2 border-border bg-background px-4 py-3 outline-none transition focus:border-primary"

// No backend: hands the message to the visitor's email app, addressed to the shop.
export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "")
    const message = String(data.get("message") ?? "")
    const subject = name ? `Message from ${name}` : "Message from the website"
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="grid gap-1.5 text-sm font-semibold">
        Name
        <input
          name="name"
          autoComplete="name"
          className={field}
          placeholder="Your name"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className={field}
          placeholder="Catering, big orders, questions, compliments…"
        />
      </label>
      <button
        type="submit"
        className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground font-semibold text-background transition hover:opacity-90"
      >
        <Send className="size-4" /> Send message
      </button>
    </form>
  )
}
