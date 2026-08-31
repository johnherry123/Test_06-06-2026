# Asset Bible
**Project:** Thiệp Cưới Đại Nghĩa & Thị Nhung  
**Design Direction:** Modern Vietnamese Heritage × Editorial Wedding × Quiet Luxury  
**Last Updated:** 2026-08-31  
**Visual Language:** Warm Ivory + Espresso + Deep Burgundy + Champagne Gold

---

## Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Warm Ivory | `#F8F4EC` | Page background |
| Soft Ivory | `#FDFBF7` | Card/section background |
| Espresso | `#231B15` | Primary text, nav background |
| Deep Espresso | `#1A120D` | Footer background |
| Deep Burgundy | `#8B1E22` | CTAs, section labels, accents |
| Dark Burgundy | `#6D1013` | Button hover |
| Champagne Gold | `#B89555` | Dividers, accents, ampersand (5–10% of visual language only) |
| Muted Brown | `#756B63` | Secondary text, metadata |
| Text Secondary | `#4A3F38` | Body text, quotes |

> **Rule:** Gold is an ACCENT ONLY. Max ~8% of visual language. Never use metallic gradients, glow effects, or gold explosions.

---

## Typography

**Maximum 3 font families:**

| Family | Usage | CSS |
|--------|-------|-----|
| Playfair Display | Display headings, couple names, section headings | `font-family: 'Playfair Display', serif` |
| Cormorant Garamond | Quotes, captions, dates, editorial text | `font-family: 'Cormorant Garamond', serif` |
| Be Vietnam Pro | UI labels, navigation, body, buttons | `font-family: 'Be Vietnam Pro', sans-serif` |

**Removed fonts:** Dancing Script, Great Vibes, Montserrat, Lora, etc.

---

## Photography

### Art Direction Standards
- Natural light, cinematic quality
- Warm tones (matching cream palette)
- Intimate, emotional composition
- Negative space for typography
- Avoid: heavy retouching, bright white backgrounds, cheesy poses, obvious stock photography

### Current Assets (placeholders — replace with real couple photos)

| Asset | Source | URL | License | Used In |
|-------|--------|-----|---------|---------|
| Hero photo (intro) | Unsplash @emkal | `photo-1606216794074` | Unsplash Free | IntroShader.jsx |
| Hero photo (main) | Unsplash | `photo-1537633552985` | Unsplash Free | Hero.jsx |
| Groom portrait | Unsplash @ihmphotos | `photo-1507003211169` | Unsplash Free | Couple.jsx |
| Bride portrait | Unsplash @andreawritess | `photo-1534528741775` | Unsplash Free | Couple.jsx |
| Gallery 1 | Unsplash | `photo-1519741497674` | Unsplash Free | Gallery.jsx |
| Gallery 2 | Unsplash | `photo-1606216794074` | Unsplash Free | Gallery.jsx |
| Gallery 3 | Unsplash | `photo-1537633552985` | Unsplash Free | Gallery.jsx |
| Gallery 4 | Unsplash | `photo-1583939003579` | Unsplash Free | Gallery.jsx |
| Gallery 5 | Unsplash | `photo-1511285560929` | Unsplash Free | Gallery.jsx |
| Gallery 6 | Unsplash | `photo-1465495976277` | Unsplash Free | Gallery.jsx |
| Gallery 7 | Unsplash | `photo-1522413452208` | Unsplash Free | Gallery.jsx |
| Gallery 8 | Unsplash | `photo-1606800052052` | Unsplash Free | Gallery.jsx |

### Recommended Replacement Specs
- **Format:** WebP (first), JPEG (fallback)
- **Resolution:** min 2000px wide for hero, min 1200px for gallery
- **Aspect Ratios:** 3:2 landscape for hero, 3:4 portrait for couple portraits, mixed for gallery masonry
- **Delivery:** Use Cloudinary or similar CDN with automatic format/quality optimization

---

## Icons

**Icon System:** Lucide Icons (already installed — consistent, clean, 1.5px stroke weight)

| Icon | Component | Context |
|------|-----------|---------|
| Share2 | App.jsx footer | Share button |
| ChevronUp | App.jsx | Scroll-to-top |
| Menu, X | App.jsx | Mobile nav |

**Custom inline SVG icons** used for:
- Arrow → (IntroShader CTA)
- Arrow → (Hero.jsx inline)
- Close × (Gallery lightbox)
- Previous ← / Next → (Gallery lightbox)
- Copy / Checkmark (Gifts.jsx copy button)

> **Rule:** No emoji as UI icons. No mixing with other icon libraries. Decorative illustrations (lotus, botanical) are separate from functional UI icons.

---

## Decorative Assets (SVG)

All created as fine-line SVG — scalable, lightweight, editorial quality.

| File | Description | Usage | Status |
|------|-------------|-------|--------|
| `public/lotus-botanical.svg` | Fine-line champagne lotus, non-glowing | Invitation bottom, subtle | ✅ Production |
| `public/branch-divider.svg` | Horizontal botanical branch divider | Countdown, Gifts, section breaks | ✅ Production |
| `public/wax-seal.svg` | Burgundy wax seal with ĐN monogram | Invitation top, Gifts | ✅ Production |
| `public/monogram.svg` | ĐN ligature with champagne rules | Footer brand mark | ✅ Production |
| `public/favicon.svg` | ĐN monogram favicon | Browser tab | ✅ Production |
| `public/paper-texture.svg` | SVG noise filter texture | Deprecated — use CSS class instead | ⚠️ Unused |

### Decorative Asset Rules
- One botanical family only (lotus + branch from same style)
- One wax seal language
- One monogram treatment
- Gold at 40–70% opacity maximum on light backgrounds
- NEVER glow, NEVER neon, NEVER metallic gradient

---

## Texture

| Name | Type | Intensity | Where Used |
|------|------|-----------|------------|
| Paper texture | CSS SVG noise | ~2.5% opacity | Invitation section (inline), `.paper-texture` class |
| Botanical bg | `envelope_back.png` at 2.5–7% opacity | Barely perceptible | Gifts card corner accent, Footer bg |

**Rule:** Texture must NEVER make text difficult to read. If any doubt — reduce opacity further.

---

## Envelope / Opening Experience

### KEEP
- `public/envelope_back.png` — premium letterpress botanical frame on warm ivory paper. **Quality: excellent.** Used as subtle texture accent only, never as full UI element.

### REMOVED / NO LONGER USED
| File | Reason |
|------|--------|
| `public/envelope_front.png` | Heavy Chinese-style red/gold embroidery pattern — wrong aesthetic |
| `public/envelope_front_velvet.png` | Duplicate of above, unnecessary |
| `public/envelope_back_qr.png` | No longer used in new design |
| `public/gate-bg.png` | AI-rendered traditional gate with 囍/dragons — too heavy, wrong direction |
| `public/hero_lotus.png` | Neon glowing lotus on dark red — wrong style (glowing, not editorial) |
| `public/icons.svg` | Antigravity IDE social icons — completely irrelevant to project |
| `public/wedding-bg.jpg` | Used in old hero — replaced by direct Unsplash URL |

> Note: Files above are NOT deleted from disk (safe to clean up after production review). They are simply no longer imported or referenced in any component.

---

## Gift / QR Section

**Visual Direction:** Premium wedding stationery
- Warm ivory background with subtle botanical corner (envelope_back.png at 7% opacity)
- Clean white QR zone (10px padding, 1px espresso border) — fully scannable
- Bank info in editorial data table style
- Wax seal beside emotional message
- Copy button with SVG icon — no emoji

**QR Source:** VietQR API (vietqr.io) with fallback to qrserver.com
**QR Rule:** Never place any decoration, color, or filter over the QR code area. The scan reliability is non-negotiable.

---

## CSS Design Tokens

Located in `src/index.css` `:root` block.

| Token | Value |
|-------|-------|
| `--bg-cream` | `#F8F4EC` |
| `--bg-white` | `#FDFBF7` |
| `--bg-warm` | `#F2EDE3` |
| `--bg-dark` | `#231B15` |
| `--burgundy` | `#8B1E22` |
| `--burgundy-dark` | `#6D1013` |
| `--champagne` | `#B89555` |
| `--text-primary` | `#231B15` |
| `--text-secondary` | `#4A3F38` |
| `--text-muted` | `#756B63` |
| `--border` | `rgba(35,27,21,0.12)` |
| `--border-warm` | `rgba(35,27,21,0.08)` |

**CSS Utilities:**
- `.champagne-rule` — gradient fade horizontal rule
- `.paper-texture` — SVG noise paper overlay via ::before
- `.photo-frame` — thin champagne lines above/below photos
- `.botanical-divider` — botanical image helper class
- `.section-label` — small uppercase burgundy eyebrow
- `.btn-primary` — burgundy filled CTA
- `.btn-secondary` — outlined ghost CTA

---

## What NOT to Do

This section prevents future regressions:

❌ No holographic gradients  
❌ No metallic gold gradients  
❌ No neon glow effects  
❌ No glowing lotus or phoenix  
❌ No 囍 symbols used decoratively  
❌ No 3D fintech credit card UI  
❌ No WebGL shaders for decoration  
❌ No excessive particle effects  
❌ No gold exceeding 10% of visual language  
❌ No gradient text  
❌ No mixing icon libraries  
❌ No emoji as UI elements  
❌ No generic wedding clip-art  
❌ No glassmorphism on primary UI elements  
❌ No custom cursor  
❌ No animated petals  

---

## Source References

- [Unsplash License](https://unsplash.com/license) — Free for commercial and personal use
- [Lucide Icons](https://lucide.dev) — ISC License
- [VietQR API](https://vietqr.io) — Free tier for basic QR generation
- [Google Fonts](https://fonts.google.com) — Playfair Display, Cormorant Garamond, Be Vietnam Pro — OFL License
