# Aqobah Travel — Design System

Brand and UI foundations for **Aqobah Tour & Travel** (PT. IBS Buana Sejahtera), a haji & umrah travel provider based in Tangerang Selatan, Indonesia.

> **Motto:** #SantunAmanah — _“Santun & Amanah”_ (courteous & trustworthy)
> Penyelenggara Ibadah Haji Khusus · Umroh Private · Provider Visa

---

## Company context

Aqobah is the dedicated haji & umrah division of PT. IBS Buana Sejahtera, operating since **2011** with **Akreditasi A**. Official permits: **PIHK 610** (haji khusus) and **PPIU U579** (umrah). The company specializes in big groups, VIP guests, and special-request travel.

Track record used throughout marketing:
- **16 years** of operation
- **10.000+** jamaah & travelers served
- **40** partners & branches across Indonesia
- **4.8 / 5.0** average customer rating

**Contact** — WhatsApp hotline +62 811-1805-330 · info@aqobah.com · Blok DC1 No.3, Jl. Mandar Utama, Pd. Karya, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15225.

### Sources provided
- `uploads/Aqobah_20170719112628.png` — the primary brand logo (full lockup with globe, wordmark, Arabic, and maroon tagline). Copied to `assets/logo-aqobah-full.png`; the globe mark extracted to `assets/mark-globe.png`.
- Font direction given by the client: **Lora** (body), **Aref Ruqaa** (headings), **IBM Plex Sans** (UI/buttons).
- No codebase or Figma was attached — this system is derived from the logo, the supplied copy, and the font direction.

---

## Content fundamentals

**Language:** Primary copy is **Bahasa Indonesia**; brand terms and credentials (PIHK, PPIU, Akreditasi A, VIP) stay as-is. Religious vocabulary is used naturally: _jamaah, ibadah, manasik, umroh, haji khusus, Tanah Suci, Masjidil Haram_.

**Voice:** Warm, calm, reassuring, and dignified — never hard-sell or hype. The brand sells **trust and peace of mind** for a sacred journey. Lead with credentials and care, not discounts.

**Person:** Speaks as “kami” (we) to the reader as “Anda” (you) — respectful and personal. Inclusive and service-oriented.

**Casing:** Sentence case for body and most headings. UPPERCASE reserved for short eyebrows/labels with wide tracking (e.g. `TENTANG KAMI`, `PIHK 610`). The wordmark **AQOBAH** is set in caps.

**Tone examples:**
- _“Ibadah yang Santun & Amanah, ke Tanah Suci.”_
- _“16 tahun mendampingi lebih dari 10.000 jamaah haji & umrah.”_
- _“Berangkat dengan tenang, setiap pekan.”_
- _“#SantunAmanah dalam setiap langkah.”_

**Numbers:** Indonesian formatting — `Rp 28.900.000` (period thousands separator), `4.8/5.0`, `10.000+`. Tabular figures for prices and stats.

**Emoji:** Not part of the brand voice in prose. The hashtag **#SantunAmanah** is the one playful device. Star `★` is acceptable for ratings; check `✓` for facility lists.

---

## Visual foundations

**Palette** — drawn directly from the logo:
- **Aqobah Blue `#0593D5`** (`--blue-500`) — primary brand color, from the lettering. Trust, sky, openness.
- **Globe Indigo `#2C4A8E`** (`--indigo-500`) — deep surfaces, footers, hero overlays. Depth & seriousness.
- **Kaaba Gold `#FCB017`** (`--gold-300`) — premium accent: hairlines, eyebrows, VIP/featured markers, accent CTAs. Use sparingly.
- **Maroon Seal `#A82C30`** (`--maroon-500`) — heritage/official accent, from the tagline seal. Prices, official/regulatory actions.
- **Cool neutral ramp** — paper `#F4F7FA` → navy ink `#0F1D2B`. Body text is navy-ink, not pure black.

**Type:**
- **Aref Ruqaa** (`--font-display`) — headings & hero. A spiritual serif that pairs Arabic and Latin; gives the brand its devotional character.
- **Lora** (`--font-body`) — long-form body. Warm humanist serif, line-height 1.72 for calm reading.
- **IBM Plex Sans** (`--font-ui`) — buttons, labels, eyebrows (0.18em tracking, uppercase), prices, data.
- Scale is a 1.25 major third, 11 → 76px.

**Spacing & layout:** 8px base rhythm. Generous section padding (`--space-10/12`). Centered containers up to 1320px. Content breathes — calm, uncrowded.

**Corners & cards:** Soft, friendly radii — cards at `--radius-lg` (18px), pills for buttons/badges (999px). Cards are white with a 1px cool hairline border (`--border-subtle`) and a **low, cool-tinted shadow** (`--shadow-sm/md`). Featured cards get a 3px **gold top hairline** (`goldTop`).

**Shadows:** Soft and diffuse, tinted with navy (`rgba(15,29,43,…)`), never harsh black. Primary CTAs carry a blue glow (`--shadow-brand`); accent CTAs a gold glow (`--shadow-gold`).

**Backgrounds:** Light cool paper for content; **deep indigo** bands and **brand-blue** bands for stat/CTA sections. Hero uses a photographic backdrop under a left-to-right indigo gradient scrim for legible white text. A soft gold radial glow adds warmth. Subtle arch silhouettes nod to Islamic architecture.

**Motion:** Restrained and graceful. `--ease-out` `cubic-bezier(0.22,1,0.36,1)`, 140–420ms. Cards lift `translateY(-3/4px)` and deepen shadow on hover. Buttons scale to `0.97` on press. No bounces, no infinite loops.

**Hover / press states:** Buttons darken one brand step on hover and shrink slightly on press. Cards lift. Nav items get a soft blue-tint pill background when active. Links use `--text-link` (blue-600).

**Transparency & blur:** Sticky header is `rgba(255,255,255,0.88)` + `blur(12px)`. Hero overlays use layered translucent indigo. Rating chips on imagery use a dark translucent capsule + blur for legibility.

**Imagery vibe:** Warm, reverent photography of Makkah/Madinah, jamaah, and architecture — deep blues and golds, never cold or clinical. _(Placeholder gradient backdrops ship in `assets/img-*.jpg`; replace with real licensed photography — see Caveats.)_

**Signature motifs:** the **gold hairline** (premium divider), the **eyebrow + gold-rule** lockup on section headers, the **four-arc** ring from the globe, and the **accreditation seal** pill (maroon + gold dot).

---

## Iconography

- No icon font shipped with the source. The system uses **Lucide** (CDN, `unpkg.com/lucide`) as the default icon set — clean, rounded, ~2px stroke, which matches the calm/friendly tone. Linked from CDN in component cards.
- **Unicode marks** are used for lightweight ornament where a full icon is overkill: `★` ratings, `✓` facility checklists, `←/→` directional affordances.
- The **globe mark** (`assets/mark-globe.png`) doubles as the app/favicon glyph.
- Emoji are **not** used in product UI prose.
- **Substitution flag:** Lucide is a substitute, not a confirmed brand icon set (none was provided). Swap if the brand standardizes on another set.

---

## Business units & products

Aqobah operates four units, all reflected in the website and ERP kits:
- **Umrah** — Umroh Reguler & Private.
- **Haji Khusus** — official visa, 5–9 year wait. Three tiers from the brochures: **VIP** (Quad 270 / Triple 288 / Double 306 Jt; hotels Swiss Al Maqam ⭐5, Movenpick ⭐5, Mercure ⭐4), **Premium** (230 / 250 / 270 Jt; Anjum ⭐5, Saja ⭐4, Mercure ⭐4), **Mabrur** (190 / 200 / 220 Jt; Ajyad Makarem ⭐4, Grand Plaza ⭐4, Mercure ⭐4). DP USD 5.000, kurs 17.500, maskapai Qatar/Emirates/Saudia. Nine facilities (Hotel, Muthawif, Maktab VIP, Dokter Pribadi, Tiket Pesawat, Konsumsi, Apartemen Transit, Bus AC, Asatidz). Asatidz: Ahmad Najihan Maududi, Chairul Anwar, Ahmad Masyhuri.
- **Wisata Halal** — muslim-friendly tour packages.
- **B2B** — provider tiket/visa, hadiah karyawan, hadiah undian, CSR. Funding/savings via Amitra, Pegadaian Syariah, CIMB Syariah, Bank Jakarta. Trusted by Pegadaian, Bank BRI, UIMA (full references to follow).

---

## Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import`s the token files only.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter wrapper.

**`tokens/`** — `fonts.css` (Google Fonts), `colors.css`, `typography.css`, `spacing.css` (spacing, radii, shadows, motion, layout).

**`assets/`** — `logo-aqobah-full.png`, `mark-globe.png`, `img-hero-makkah.jpg`, `img-madinah.jpg`, `img-kaaba.jpg`, `img-group.jpg` (image files are placeholders).

**`components/core/`** — `Button`, `Badge`, `Card`, `Input` (+ `.d.ts`, `.prompt.md`, `core.card.html`).
**`components/brand/`** — `SectionHeading`, `StatBlock`, `PackageCard`, `PricingTier` (Quad/Triple/Double brochure tiers), `FacilityItem` (+ `.d.ts`, `.prompt.md`, `brand.card.html`, `haji-khusus.card.html`).

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`ui_kits/website/`** — interactive marketing-site recreation: `index.html` + `Chrome.jsx`, `HomeScreen.jsx`, `HajiKhususScreen.jsx` (real brochure data — VIP/Premium/Mabrur tiers, 9 facilities, asatidz), `LayananScreen.jsx` (Pendanaan & Tabungan, B2B, business units), `PackageDetail.jsx`. Nav: Beranda · Haji Khusus · Paket Umroh · Pendanaan & B2B · Kontak.

**`ui_kits/erp/`** — Aqobah ERP admin console wireframe: `index.html` + `ErpShell.jsx` (sidebar + topbar + shared KPI/table/panel helpers), `ErpModules.jsx` (Dashboard, CRM, Sales Order, Produk, Operasional, Keuangan, SDM/HR). Sample data across the four business units (Umrah, Haji Khusus, Wisata Halal, B2B). Intended as the seed for a Claude Code ERP backend.

**`templates/umrah-landing/`** — `UmrahLanding.dc.html` reusable one-page promo (Design Component) consuming projects can copy.

Components are reachable at `window.AqobahDesignSystem_6897ec.<Name>` after loading `_ds_bundle.js`.

---

## Caveats
- **One real photo extracted** (`assets/img-arafah.jpg`, the Arafah golden-hour crowd, cropped from the Haji Khusus brochure) — now used in the Haji Khusus hero and the landing template. The remaining `assets/img-*.jpg` (kaaba, madinah, group, hero-makkah) are still **gradient placeholders**; replace with licensed Makkah/Madinah/jamaah imagery for production.
- **Brochure pricing is captured as of the supplied flyers** (kurs 17.500; final price recalculated at departure year). Update when new brochures are issued.
- **ERP figures are sample data** for the wireframe — wire to real records in the Claude Code build.
- **Fonts via Google Fonts CDN.** Aref Ruqaa, Lora, IBM Plex Sans are all on Google Fonts; no local binaries were provided. If you have licensed/self-hosted files, drop them in and add `@font-face` rules.
- **Icons = Lucide (substituted).** No brand icon set was provided.
