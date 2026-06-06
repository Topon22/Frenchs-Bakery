# Task 7-8: WagonWheel & DailySpecials Rewrite

## Agent
WagonWheel & DailySpecials Rewrite Agent

## Task
Rewrite WagonWheel and DailySpecials components with stunning visual effects, SVG spinning wheel, chalk dust particles, and enhanced chalkboard design.

## Files Modified
- `/home/z/my-project/src/components/bakery/WagonWheel.tsx` — Complete rewrite
- `/home/z/my-project/src/components/bakery/DailySpecials.tsx` — Complete rewrite

## Key Changes

### WagonWheel.tsx
- Replaced emoji rotation with proper SVG wagon wheel (12 spokes, concentric rings, hub, gradient fills)
- RotatingFlavorLabel: flavor name chars arranged in circle, slowly rotating (25s)
- Glow/pulse effect behind wheel (2 pulsing blurred circles)
- AnimatePresence description card with shimmer accent bar
- All 42 flavor descriptions (previously only 6)
- Star icon for popular flavors (lucide-react Star, filled)
- Category pills with layoutId animated active state (spring transition)
- Flavor badges with AnimatePresence popLayout and layout animation
- "36 years of love" in description
- "Order This Flavor" CTA with openOrderForm()

### DailySpecials.tsx
- 7 floating chalk dust particles (framer-motion animate)
- Staggered typewriter-style reveal (0.18s stagger, cubic-bezier)
- 6 real specials: Tuesday Cupcakes (featured), Cheese Danish, Wagon Wheel, Carrot Cake (Yelp quote), French Bread, Chocolate Custard Eclair
- Wood frame border (brown gradient + grain texture + shadows)
- 4 chalk smudge corners (radial gradient)
- Dynamic date (useMemo, no setState-in-effect)
- Happy Hour mention at bottom
- Hover: brioche-light radial glow on each item
- Uses useInView for scroll-triggered animations

## Status
✅ Complete — Lint passes, dev server HTTP 200
