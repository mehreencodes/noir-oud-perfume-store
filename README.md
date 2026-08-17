# Noir Oud — A Scent Studio

A full-featured React e-commerce site for a fictional luxury perfume brand, built to explore end-to-end frontend architecture: multi-page routing, cart/wishlist state, animated interactions, and SEO — not just a landing page.

**🔗 Live site:** [noir-oud-perfume-store-oy19.vercel.app](https://noir-oud-perfume-store-oy19.vercel.app/)

![Noir Oud preview](./public/og-image.jpg)

---

## Features

- **Multi-page architecture** — dedicated routes for Home, Collection, Story, Journal, Contact, and individual product pages (`react-router-dom`), not a single scrolling page
- **Shopping cart** — add/remove/update quantity, persists to `localStorage`, checkout flow with a pre-filled **WhatsApp order** message (matches how local fragrance businesses actually take orders)
- **Wishlist** — save favorites with a heart toggle, persists across sessions
- **Scent Finder quiz** — a 4-question quiz that recommends a fragrance and deep-links to its product page
- **Live product search** — filters by name/notes from the nav, jumps straight to results
- **Category filtering** — browse the collection by scent family (Oud, Floral, Woody, Amber)
- **Testimonials & social proof** — animated stat counters, customer reviews
- **Journal** — an interactive card-deck reader for blog-style content
- **Cinematic scroll storytelling** — a GSAP `ScrollTrigger` pinned section walking through the brand's production process
- **SEO** — per-page `<title>`/meta tags, JSON-LD `LocalBusiness` structured data, sitemap, and robots.txt
- **Fully responsive** — custom mobile layouts for the hero, navigation, footer, and image grids (not just breakpoint shrinking)

## Tech Stack

- **React 18** + **Vite**
- **React Router** — client-side routing
- **Framer Motion** — animations and page transitions
- **GSAP + ScrollTrigger** — pinned scroll storytelling
- **Context API + `useReducer`** — cart and wishlist state
- Custom hooks: `useTilt`, `useScrollLock`, `useEscapeKey`, `useScrollProgress`, `useDocumentTitle`
- Plain CSS with design tokens (no UI framework) — full control over the dark-luxury visual language

## Getting Started

```bash
git clone https://github.com/mehreencodes/noir-oud-perfume-store.git
cd noir-oud-perfume-store
npm install
npm run dev
```

## Project Structure

```
src/
├── App.jsx              # Routes
├── HomePage / Hero / Notes / ScentFinder / Lookbook
├── Showcase.jsx          # Collection + product data
├── ProductPage.jsx       # Individual product route
├── StoryAndFooter.jsx    # Story page + Footer
├── JournalAndContact.jsx # Journal + Contact pages
├── CartContext.jsx       # Cart state (useReducer + localStorage)
├── WishlistContext.jsx   # Wishlist state
├── Nav.jsx                # Nav, search, cart drawer, wishlist drawer
└── hooks/                 # Custom hooks
```

## Notes

This is a portfolio/learning project — the brand, products, and testimonials are fictional. Product photography is sourced from Pinterest as placeholders and would be replaced with real photography for an actual client launch.

---

Built by [Mehreen](https://github.com/mehreencodes)
