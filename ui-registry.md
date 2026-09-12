### Project portal

File: src/components/projects/ProjectPortal.tsx
Last updated: 2026-09-10

| Property | Class |
| --- | --- |
| Background | Permanent moonlit mountain image with `#03060c` / `#03050a` deep blue-black fallback |
| Border | None on the expanding media; the initial shape is defined by a clipped frame |
| Border radius | `28px` at rest, resolving to `0` when full-bleed |
| Text — primary | `#fff` / `#f5f8ff` |
| Text — secondary | `rgba(255,255,255,.62-.78)` |
| Spacing | `clamp(2rem, 8vw, 9rem)` for stage copy |
| Hover state | None; the portal is scroll-controlled |
| Shadow | Text shadow only: `0 2px 24px rgba(0,0,0,.45)` |
| Accent usage | Cool electric blue is reserved for the mountain glow and a `0.24` DarkVeil atmosphere layer |

**Pattern notes:**
The transition world starts as a restrained rounded portal, then removes framing rather than adding ornament. The mountain stays as the permanent background; a `screen`-blended DarkVeil layer is strictly atmospheric, introduced only after the full-bleed frame settles. Labels use `.62rem–.68rem`, uppercase, and roughly `.2em` tracking. Major headings use a compact `.9` line-height and strongly negative letter spacing. Future project surfaces should retain the same deep blue-black base and avoid glass-heavy treatments.

### Fluid glass lens

File: src/components/projects/FluidGlass.tsx
Last updated: 2026-09-10

| Property | Class |
| --- | --- |
| Background | Transparent WebGL canvas over the permanent mountain image |
| Border | Model-defined glass edge; no CSS border |
| Border radius | Model-defined circular lens |
| Text — primary | None; project typography remains in the world layer |
| Text — secondary | None |
| Spacing | Full viewport overlay, with the lens tracking pointer movement conservatively |
| Hover state | Pointer-following position and rotation with damped motion |
| Shadow | Transmission/refraction lighting only |
| Accent usage | Cool `#b9d8ff` glass tint over the blue mountain world |

**Pattern notes:**
Use one interactive lens at a time, only after a scene settles. The lens is a quiet spatial detail, never a full UI surface or replacement for the image beneath it.

### Mountain ripple distortion

File: src/components/projects/RippleDistortion.tsx
Last updated: 2026-09-10

| Property | Class |
| --- | --- |
| Background | The permanent mountain image, sampled in an OGL canvas |
| Border | None |
| Border radius | None |
| Text — primary | No text inside the effect |
| Text — secondary | No text inside the effect |
| Spacing | Full project-world viewport |
| Hover state | Pointer-driven circular water displacement |
| Shadow | None |
| Accent usage | Preserve the mountain's blue highlights; avoid grayscale in the project world |

**Pattern notes:**
RippleDistortion replaces the fluid-glass lens in this experience. It should remain a restrained scene effect, with small ripples that reveal interaction without obscuring the mountain or project heading.

### Project scroll stack

File: src/components/projects/ProjectScrollStack.tsx
Last updated: 2026-09-10

| Property | Value |
| --- | --- |
| Background | `#050507` with one restrained `rgba(70,95,255,.10)` radial glow |
| Card surface | `#0B0D13`, 1px white-at-10% border, `30px` radius |
| Card scale | Large desktop feature card: `min(82vw, 1180px)` × `min(70vh, 660px)` |
| Accent usage | Project number, chip borders, quiet visual glow, and active-card edge only |
| Motion | Page-scroll-derived entrance, reading hold, and visible unblurred stack depth |
| Pointer response | Front card only: maximum `1.5deg` X / `2.5deg` Y; visual shifts ≤8px |

**Pattern notes:**
Projects take over after the atmospheric sequence, so there is no mountain, ripple, LogoLoop, or secondary animated background behind this section. Preserve a long reading hold and let prior cards remain physically visible rather than fading into glass or blur. Mobile falls back to a plain vertical list.

### Two-sided technology loop

File: src/components/projects/LogoLoopScene.tsx
Last updated: 2026-09-10

| Property | Value |
| --- | --- |
| Background | Clean `#050507`; deliberately separate from the mountain world |
| Layout | Two oversized horizontal marquees with restrained copy between them |
| Motion | Product/frontend technology marks travel left; database/backend marks travel right until the scroll-led exit |
| Flow | A normal, one-viewport document page between the mountain and pinned projects |
| Typography | No copy inside the logo page; the bold logotypes are the composition |

**Pattern notes:**
This is a dedicated intermediate page, not an overlay or transition behind the cards. It uses only oversized monochrome brand marks—no technology names—travelling in opposite directions. The expanded mountain/ripple world has a substantial post-expansion hold before the final 30% of the portal's physical scroll distance moves it upward to reveal this page; reverse scrolling restores the mountain. The project stack pins only when it begins.

### About, education, and experience chapter

Files: src/components/about/*
Last updated: 2026-09-10

| Area | Visual rule |
| --- | --- |
| About | A long scroll container with a pinned full-viewport editorial stage: large gradient headline and flat divided capability rows on the left, with the user’s isolated portrait integrated directly into the right side—never inside a card or image box. |
| Atmosphere | Fine blue threads fill the complete pinned stage behind the copy and portrait, react minimally to pointer movement, and never obscure either. |
| Education | Two dark identity-style cards with thin illuminated edges, limited tilt, and modal details. |
| Experience | A single large image stage with HTML title and metadata below; content never belongs inside the image. |

**Pattern notes:**
Keep this chapter as one continuous navy-black world. Use blue as an edge and thread accent, never as a wholesale background. The clean portrait cutout has natural cool directional lighting and transparent edges, so it belongs to the canvas rather than a dark rectangular panel; education imagery is a full-card atmosphere layer with HTML content above it.
