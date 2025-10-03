<!-- d4cac615-97b4-4ceb-b158-98fc8cd0dc00 4b50ba30-aa6a-497f-92cb-6052d89540d1 -->
# Navigation Menu UX Improvements

## Files to update
- `src/components/Hero.tsx` (navbar container, desktop link row styling)
- `src/components/HamburgerMenu.tsx` (mobile drawer layout, grouping, active/hover states, CTA section)

## Changes
- Spacing (Hero navbar)
  - Set heights: `h-14 md:h-16`
  - Padding: `px-3 sm:px-4 md:px-6`
  - Add `shadow-sm` and increase contrast: `bg-background/90 backdrop-blur`
- Desktop links (Hero)
  - Reduce gaps to `gap-4`, `text-base font-medium`, active uses `font-semibold` and bottom border on hover
- Mobile drawer (HamburgerMenu)
  - Drawer width to `w-72 max-w-[85vw]`, `bg-card/95 border-l shadow-xl`
  - Overlay `bg-black/40` with opacity transition
  - Slide-in transitions: `translate-x-full -> 0` in 300ms
- Visual grouping (HamburgerMenu)
  - Use list grid: `grid grid-cols-[20px_1fr] gap-3`
  - Add section labels: `Navigate` and `Quick Actions` with `text-xs uppercase tracking-wider text-muted-foreground`
  - Divider between nav links and actions: `border-t mt-4 pt-4`
- Typography hierarchy
  - Menu item text: `text-base font-medium`
  - Active state: left border `border-l-2 border-primary bg-primary/5 text-foreground font-semibold`
- Button hierarchy (mobile only)
  - Add CTAs under Quick Actions:
    - Primary: "View My Work" (scroll to `projects`) filled style
    - Secondary: "Get in Touch" (scroll to `contact`) outline style
    - Tertiary: "Resume" link (muted text with underline on hover)
  - Keep CTAs separate from nav list via divider
- Accessibility
  - Preserve ARIA labels, focus rings, 44px touch targets
  - Close menu on outside click, Esc, or item click (already present)

## Implementation notes
- Track an `activeId` in `HamburgerMenu` (set on click) to style active item; keep simple for now (no observer)
- Do not move desktop CTAs into navbar; they remain in hero content to avoid competition

### To-dos

- [ ] Tighten Hero navbar spacing, contrast, and shadow
- [ ] Reduce desktop nav gaps and set typography hierarchy
- [ ] Adjust mobile drawer width, overlay, slide animation
- [ ] Add section labels, grid alignment, and divider
- [ ] Add active state with left border and font weight
- [ ] Add CTA buttons under Quick Actions, de-emphasize vs nav it