---
Task ID: 13-14
Agent: Testimonials & VisitUs Rewrite Agent
Task: Rewrite Testimonials and VisitUs with auto-rotating carousel, Google Maps embed, delivery badges, and enhanced visuals

Work Log:
- Read worklog.md, existing Testimonials.tsx, VisitUs.tsx, globals.css, page.tsx for full context
- Completely rewrote /home/z/my-project/src/components/bakery/Testimonials.tsx:
  - Implemented auto-rotating carousel: 3 cards on desktop, 2 on tablet, 1 on mobile, auto-advances every 5 seconds
  - Carousel pauses on mouse hover, resumes on mouse leave
  - Responsive cardsPerView using window.innerWidth with resize listener
  - Added Yelp Badge at top: "★★★★☆ 3.4 on Yelp · 399+ reviews" with 3 filled stars, 1 half, 1 empty
  - Updated to 9 real reviews from YellowPages, Yelp, TripAdvisor per task spec
  - Each review card has source badge (YellowPages, Yelp, TripAdvisor)
  - Glassmorphism card design using glass-card class from globals.css
  - Gradient border on left side (brioche → raspberry → cafe gradient, 1px wide)
  - AnimatedStars component: stars fill in sequentially with spring animation (0.12s stagger per star) when card comes into view
  - Navigation: Left/Right ChevronLeft/ChevronRight arrow buttons on sides of carousel
  - Dot indicators at bottom: active dot elongated (w-8), inactive dots circular (w-3), clickable
  - Auto-rotate status indicator: green pulsing dot when active, gray when paused
  - AnimatePresence mode="wait" for smooth slide transitions between carousel pages (60px x-offset slide)
  - Decorative background blobs (brioche/5, raspberry/5) with blur
  - Uses 'use client', useState, useEffect, useRef, useCallback, framer-motion (motion, AnimatePresence, useInView), lucide-react (Star, Quote, ChevronLeft, ChevronRight), Button
- Completely rewrote /home/z/my-project/src/components/bakery/VisitUs.tsx:
  - Replaced SVG map placeholder with real Google Maps iframe embed for "French's Bakery, 1170 Baker St, Costa Mesa, CA 92626"
  - Map container has rounded corners (rounded-2xl) and subtle shadow (shadow-lg)
  - Glass overlay card on map with MapPin icon, address, and "Directions" button
  - Added "Also available on:" section with GrubHub and DoorDash badges (colored logo squares with links)
  - Added Wheelchair Accessible indicator with Accessibility icon from lucide-react (from YellowPages amenity data)
  - Animated hours: current day highlighted with glowing indicator and ring-1 ring-brioche/20
  - "Open Now" / "Closed" status badge next to Business Hours heading, color-coded (herbe/raspberry)
  - Ping animation on today's dot when currently open
  - Updated hours: Mon-Fri 7:00 AM–6:00 PM, Sat 7:00 AM–5:00 PM, Sun Closed
  - Real address: 1170 Baker St, Suite B, Costa Mesa, CA 92626
  - Floating "Now Open" badge: fixed position top-right, green with pulse animation, only visible during business hours
  - Prominent "Call Now" CTA button with Phone icon (brioche background)
  - "Get Directions" outline button linking to Google Maps
  - Info cards with smooth hover animations (whileHover y:-2, spring transition, shadow transition)
  - Two-column layout for amenities: Parking/Accessibility/Payment on left, TripAdvisor/Delivery on right
  - Staggered hour row animations (0.05s delay per row, x offset slide-in)
  - getBusinessStatus() function computes isOpen/todayIndex/statusText without useMemo (avoids React Compiler memoization issue)
  - Uses requestAnimationFrame for mounted state to avoid synchronous setState-in-effect lint error
  - Uses 'use client', useState, useEffect, framer-motion (motion, AnimatePresence), lucide-react (MapPin, Phone, Clock, Car, Navigation, Star, CreditCard, Accessibility, Truck), Button
- Fixed lint errors:
  - Replaced useMemo with plain function getBusinessStatus() to avoid React Compiler memoization preservation error
  - Replaced setMounted(true) in useEffect with requestAnimationFrame wrapper to avoid synchronous setState-in-effect error
- Lint passes cleanly (zero errors)
- Dev server compiles and serves pages with HTTP 200

Stage Summary:
- Testimonials: Auto-rotating carousel (3/2/1 cards responsive), Yelp badge, 9 real reviews with source badges, glassmorphism cards with gradient left border, sequential star fill animation, arrow navigation + dot indicators, AnimatePresence slide transitions
- VisitUs: Real Google Maps iframe embed, GrubHub/DoorDash delivery badges, wheelchair accessible indicator, animated hours with glowing current day, floating "Now Open" badge, Call Now + Get Directions CTAs, hover animations on info cards, proper business status computation
- Both components use 'use client', framer-motion, lucide-react, shadcn/ui Button, bakery custom colors
- Zero lint errors, zero compilation errors
