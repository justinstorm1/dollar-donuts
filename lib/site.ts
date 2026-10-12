export const site = {
  name: "Dollar Donut Shops",
  url: "https://dollardonutshops.com",
  phone: "848-863-6259",
  phoneHref: "tel:+18488636259",
  email: "Dollardonutshops@gmail.com",
  instagram: "https://instagram.com/Dollardonutshops",
  instagramHandle: "@dollardonutshops",
  address: {
    street: "2223 Route 9 N",
    city: "Howell",
    state: "NJ",
    zip: "07731",
  },
  mapsQuery: "2223 Route 9 N, Howell, NJ 07731",
  timeZone: "America/New_York",
}

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`

// Indexed by day of week, 0 = Sunday. Hours are in 24h local shop time.
export const hours: { day: string; open: number; close: number }[] = [
  { day: "Sunday", open: 8, close: 16 },
  { day: "Monday", open: 6, close: 17 },
  { day: "Tuesday", open: 6, close: 17 },
  { day: "Wednesday", open: 6, close: 17 },
  { day: "Thursday", open: 6, close: 17 },
  { day: "Friday", open: 6, close: 17 },
  { day: "Saturday", open: 7, close: 17 },
]

export function formatHour(h: number) {
  const suffix = h >= 12 ? "PM" : "AM"
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour} ${suffix}`
}

export type Topping =
  | "sprinkles"
  | "crumble"
  | "oreo"
  | "candy"
  | "cereal"
  | "cinnamon"
  | "chips"
  | "drizzle"
  | "none"

export type Coat = "icing" | "glaze" | "powder" | "sugar" | "coconut"

export type DonutStyle = {
  kind: "ring" | "filled"
  coat: Coat
  icing?: string
  topping?: Topping
  filling?: string
}

export type Donut = {
  id: string
  name: string
  note: string
  category: "topped" | "filled"
  style: DonutStyle
}

export const icing = {
  vanilla: "#FFF4DE",
  chocolate: "#5A2E1B",
  strawberry: "#FF8FB5",
  blueberry: "#8EA8FF",
  lemon: "#FFE36E",
}

const filling = {
  jelly: "#D7263D",
  raspberry: "#C2185B",
  bavarian: "#FFF1C9",
  lemon: "#FFD43B",
  strawberry: "#FF5C8D",
  blueberry: "#4C5FD5",
}

export const donuts: Donut[] = [
  {
    id: "vanilla-sprinkle",
    name: "Vanilla Sprinkle",
    note: "Vanilla icing, rainbow sprinkles",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.vanilla,
      topping: "sprinkles",
    },
  },
  {
    id: "chocolate-sprinkle",
    name: "Chocolate Sprinkle",
    note: "Chocolate icing, rainbow sprinkles",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.chocolate,
      topping: "sprinkles",
    },
  },
  {
    id: "strawberry-sprinkle",
    name: "Strawberry Sprinkle",
    note: "Strawberry icing, rainbow sprinkles",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.strawberry,
      topping: "sprinkles",
    },
  },
  {
    id: "cookie-crumble",
    name: "Cookie Crumble",
    note: "Vanilla icing, chocolate chip cookie crumble",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.vanilla,
      topping: "crumble",
    },
  },
  {
    id: "oreo-crumble",
    name: "Oreo Crumble",
    note: "Vanilla icing, Oreo crumble",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.vanilla,
      topping: "oreo",
    },
  },
  {
    id: "vanilla-mms",
    name: "Vanilla M&M's",
    note: "Vanilla icing, M&M's",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.vanilla,
      topping: "candy",
    },
  },
  {
    id: "chocolate-mms",
    name: "Chocolate M&M's",
    note: "Chocolate icing, M&M's",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.chocolate,
      topping: "candy",
    },
  },
  {
    id: "fruity-pebble",
    name: "Fruity Pebble",
    note: "Topped with Fruity Pebbles",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.vanilla,
      topping: "cereal",
    },
  },
  {
    id: "lucky-charm",
    name: "Lucky Charm",
    note: "Topped with Lucky Charms",
    category: "topped",
    style: { kind: "ring", coat: "icing", icing: "#FFF8EA", topping: "cereal" },
  },
  {
    id: "cinnamon-toast-crunch",
    name: "Cinnamon Toast Crunch",
    note: "Topped with Cinnamon Toast Crunch",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: "#F3D9B1",
      topping: "cinnamon",
    },
  },
  {
    id: "froot-loop",
    name: "Froot Loop",
    note: "Topped with Froot Loops",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.vanilla,
      topping: "cereal",
    },
  },
  {
    id: "blueberry-iced",
    name: "Blueberry Iced",
    note: "Blueberry icing",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.blueberry,
      topping: "none",
    },
  },
  {
    id: "vanilla-chocolate-chip",
    name: "Vanilla Chocolate Chip",
    note: "Vanilla icing, chocolate chips",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.vanilla,
      topping: "chips",
    },
  },
  {
    id: "strawberry-drizzle",
    name: "Strawberry Drizzle",
    note: "Strawberry icing, chocolate drizzle",
    category: "topped",
    style: {
      kind: "ring",
      coat: "icing",
      icing: icing.strawberry,
      topping: "drizzle",
    },
  },
  {
    id: "boston-cream",
    name: "Boston Cream",
    note: "Custard filled, chocolate icing",
    category: "filled",
    style: {
      kind: "filled",
      coat: "icing",
      icing: icing.chocolate,
      filling: filling.bavarian,
    },
  },
  {
    id: "strawberries-and-cream",
    name: "Strawberries & Cream",
    note: "Bavarian cream filled",
    category: "filled",
    style: {
      kind: "filled",
      coat: "icing",
      icing: icing.strawberry,
      filling: filling.bavarian,
    },
  },
  {
    id: "glazed-jelly",
    name: "Glazed Jelly",
    note: "Jelly filled, classic glaze",
    category: "filled",
    style: { kind: "filled", coat: "glaze", filling: filling.jelly },
  },
  {
    id: "cinnamon-sugar-jelly",
    name: "Cinnamon Sugar Jelly",
    note: "Jelly filled, cinnamon sugar",
    category: "filled",
    style: { kind: "filled", coat: "sugar", filling: filling.jelly },
  },
  {
    id: "lemon-glazed",
    name: "Lemon Glazed",
    note: "Lemon filled, classic glaze",
    category: "filled",
    style: { kind: "filled", coat: "glaze", filling: filling.lemon },
  },
  {
    id: "jelly-powdered",
    name: "Jelly Powdered",
    note: "Jelly filled, powdered sugar",
    category: "filled",
    style: { kind: "filled", coat: "powder", filling: filling.jelly },
  },
  {
    id: "bavarian-powdered",
    name: "Bavarian Powdered",
    note: "Bavarian cream filled, powdered sugar",
    category: "filled",
    style: { kind: "filled", coat: "powder", filling: filling.bavarian },
  },
  {
    id: "lemon-coconut",
    name: "Lemon Coconut",
    note: "Lemon filled, coconut",
    category: "filled",
    style: { kind: "filled", coat: "coconut", filling: filling.lemon },
  },
  {
    id: "raspberry-coconut",
    name: "Raspberry Coconut",
    note: "Raspberry filled, coconut",
    category: "filled",
    style: { kind: "filled", coat: "coconut", filling: filling.raspberry },
  },
  {
    id: "bavarian-coconut",
    name: "Bavarian Coconut",
    note: "Bavarian cream filled, coconut",
    category: "filled",
    style: { kind: "filled", coat: "coconut", filling: filling.bavarian },
  },
  {
    id: "strawberry-lemon",
    name: "Strawberry Lemon",
    note: "Strawberry & lemon",
    category: "filled",
    style: {
      kind: "filled",
      coat: "icing",
      icing: icing.strawberry,
      filling: filling.lemon,
    },
  },
  {
    id: "blueberry-lemon",
    name: "Blueberry Lemon",
    note: "Blueberry & lemon",
    category: "filled",
    style: {
      kind: "filled",
      coat: "icing",
      icing: icing.blueberry,
      filling: filling.lemon,
    },
  },
]

export const coffee: {
  name: string
  note: string
  sizes: { size: string; price: string }[]
  extra?: string
}[] = [
  {
    name: "House Blend",
    note: "Fresh brewed, all day",
    sizes: [{ size: "16 oz", price: "$1.99" }],
  },
  {
    name: "Latte",
    note: "Espresso and steamed milk",
    sizes: [{ size: "16 oz", price: "$4" }],
    extra: "Almond or oat milk +$1",
  },
  {
    name: "Cold Brew",
    note: "Always on tap",
    sizes: [
      { size: "16 oz", price: "$5" },
      { size: "24 oz", price: "$6" },
    ],
  },
]
