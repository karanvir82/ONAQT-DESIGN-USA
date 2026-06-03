# 📸 Images — what to replace for a real, premium site

All images live in this folder (`public/images/`). To swap any image, **keep the same
file name** and drop your new photo in here — no code changes needed. (Or change the path
in the file noted below.)

Shoot photos on a clean, ideally dark or neutral background. Suggested sizes are minimums.

---

## Priority 1 — these appear the most (replace first)

| File | Where it shows | Replace with | Suggested size |
|------|----------------|--------------|----------------|
| `hero_jewelry_banner.png` | Homepage hero, Bridal banner, About hero, Timeline card | Your best **statement diamond/bridal piece**, wide & cinematic | 1920 × 1200 |
| `traditional_himachali_chandrahaar.png` | Himachali category, About founder image, VIP modal, try-on demo | A real **Himachali Chandrahaar / heritage necklace**, front-on | 1200 × 1200 |
| `gold_bangle_luxury.png` | Gold category tile, homepage teaser, lookbook | Real **gold bangles**, close-up | 1200 × 1200 |
| `diamond_solitaire_ring.png` | Diamond category tile, lookbook | Real **diamond ring**, macro | 1200 × 1200 |

## Priority 2 — product catalogue photos

The 8 product images are also pulled from the files above (mapped in
`src/data/products.js`). For a real shop, shoot **one clean photo per product** and:
1. Drop each photo in this folder (e.g. `product-chandrahaar.png`).
2. Update the matching `image:` path in `src/data/products.js`.

Ideal product shots: square (1:1), centred piece, soft shadow, dark or white seamless background.

## Priority 3 — the real storefront & people

| Need | Where it would go | Notes |
|------|-------------------|-------|
| **Real storefront photo** of Satya Jewellers on The Mall | About hero / homepage teaser | Replaces the generic jewellery shots with *your* shop — huge trust boost |
| **Family / team photos** | About → "Meet the Verma Family" | Currently gold initials (SV / RV / SV). Add real headshots in `src/pages/AboutPage.jsx` |
| **Lifestyle / model shots** | Lookbook, Bridal banner | Jewellery worn on a model elevates the whole site |

---

## ⚠️ Removed image
`heritage_shimla_store.png` is **no longer used** — it was an AI stock image with a
*different* brand name ("AURORA · EST. 1928") baked in. Safe to delete. Replace its role
with a **real photo of the Satya Jewellers showroom** when you have one.

## Also worth updating (text, not images)
- **Phone number** — the site uses `+91 98160 05000`; your About page listed `+91 7424005000`. Confirm the correct one.
- **Testimonials** — `src/components/Testimonials.jsx` has placeholder reviews; swap in real Google reviews.
- **Instagram link** — Lookbook points to a generic `instagram.com/`; set your real handle.
