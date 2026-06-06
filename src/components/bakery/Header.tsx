'use client';

import { useState, useMemo, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Menu, Croissant } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { openOrderForm } from '@/lib/order-events';

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Custom Orders', href: '#custom-orders' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Us', href: '#visit' },
];

function getBusinessStatus(): { open: boolean; label: string } {
  if (typeof window === 'undefined') return { open: false, label: 'Closed' };
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute; // minutes since midnight

  // Sunday = closed
  if (day === 0) return { open: false, label: 'Closed Sunday' };

  // Mon-Fri: 7AM-6PM = 420-1080
  if (day >= 1 && day <= 5) {
    if (time >= 420 && time < 1080) {
      return { open: true, label: 'Now Open' };
    }
    return { open: false, label: 'Closed' };
  }

  // Saturday: 7AM-5PM = 420-1020
  if (day === 6) {
    if (time >= 420 && time < 1020) {
      return { open: true, label: 'Now Open' };
    }
    return { open: false, label: 'Closed' };
  }

  return { open: false, label: 'Closed' };
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect client-side mounting without setState-in-effect
  const mounted = useSyncExternalStore(
    () => () => {},  // no-op subscribe
    () => true,     // client snapshot
    () => false     // server snapshot
  );

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Frosted glass opacity based on scroll
  const headerBg = useTransform(
    scrollYProgress,
    [0, 0.02],
    ['rgba(253,246,236,0)', 'rgba(253,246,236,0.8)']
  );
  const headerBlur = useTransform(
    scrollYProgress,
    [0, 0.02],
    ['blur(0px)', 'blur(16px)']
  );
  const headerShadow = useTransform(
    scrollYProgress,
    [0, 0.02],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(43,26,15,0.1)']
  );

  // Business hours status (recalculated on mount and every minute)
  const businessStatus = useMemo(() => getBusinessStatus(), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-brioche via-brioche-light to-brioche"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Header Background */}
      <motion.div
        className="absolute inset-0 border-b border-flaky/0"
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          boxShadow: headerShadow,
        }}
      />

      {/* Header Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <motion.div
              className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brioche flex items-center justify-center bg-parchment/80 group-hover:bg-brioche/10 transition-colors"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            >
              <Croissant className="w-5 h-5 sm:w-6 sm:h-6 text-brioche" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-lg sm:text-xl text-espresso leading-tight">
                French&apos;s
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-cafe font-semibold -mt-0.5">
                Pastry & Bakery
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-lora font-semibold text-espresso hover:text-brioche transition-colors group overflow-hidden"
              >
                {link.label}
                {/* Animated underline - slides in from left */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brioche transition-all duration-300 group-hover:w-3/4 origin-left" />
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:7145466386"
              className="flex items-center gap-2 text-sm font-semibold text-cafe hover:text-brioche transition-colors"
            >
              <Phone className="w-4 h-4" />
              (714) 546-6386
            </a>

            {/* Now Open / Closed Badge */}
            {mounted && (
              <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                businessStatus.open
                  ? 'bg-herbe/10 text-herbe'
                  : 'bg-raspberry/10 text-raspberry'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    businessStatus.open ? 'bg-herbe' : 'bg-raspberry'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    businessStatus.open ? 'bg-herbe' : 'bg-raspberry'
                  }`} />
                </span>
                {businessStatus.label}
              </span>
            )}

            {/* Shimmer Order Button */}
            <Button
              onClick={() => openOrderForm()}
              className="relative overflow-hidden bg-gradient-to-r from-brioche via-brioche-light to-brioche hover:from-brioche-dark hover:via-brioche hover:to-brioche-dark text-whipped font-semibold rounded-full px-6 transition-all duration-300 animate-shimmer"
              style={{
                backgroundSize: '200% auto',
              }}
            >
              <span className="relative z-10">Order Now</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:7145466386"
              className="p-2 rounded-full bg-brioche/10 text-brioche hover:bg-brioche/20 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>

            {/* Mobile Open/Closed indicator */}
            {mounted && (
              <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                businessStatus.open
                  ? 'bg-herbe/10 text-herbe'
                  : 'bg-raspberry/10 text-raspberry'
              }`}>
                <span className={`inline-flex rounded-full h-1.5 w-1.5 ${
                  businessStatus.open ? 'bg-herbe' : 'bg-raspberry'
                }`} />
                {businessStatus.open ? 'Open' : 'Closed'}
              </span>
            )}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-espresso">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-parchment border-l border-flaky">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <motion.div
                  className="flex flex-col h-full pt-6"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full border-2 border-brioche flex items-center justify-center">
                        <Croissant className="w-5 h-5 text-brioche" />
                      </div>
                      <div>
                        <p className="font-playfair font-bold text-espresso">French&apos;s</p>
                        <p className="text-xs tracking-wider uppercase text-cafe">Pastry & Bakery</p>
                      </div>
                    </div>
                  </div>

                  {/* Yelp Rating */}
                  <div className="bg-brioche/5 rounded-lg px-4 py-3 mb-3 border border-brioche/10">
                    <div className="flex items-center gap-1">
                      <span className="text-brioche text-sm">★★★★☆</span>
                      <span className="text-xs font-semibold text-espresso ml-1">3.4 on Yelp</span>
                    </div>
                  </div>

                  {/* Delivery Badges */}
                  <div className="bg-espresso/5 rounded-lg px-4 py-3 mb-4 border border-espresso/10">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚗</span>
                      <span className="text-xs font-semibold text-espresso">Available on GrubHub & DoorDash</span>
                    </div>
                  </div>

                  {/* Hours Badge */}
                  <div className="bg-brioche/10 rounded-lg px-4 py-3 mb-6">
                    <p className="text-xs font-semibold text-brioche">
                      Mon–Fri 7AM–6PM · Sat 7AM–5PM
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Mesa-North Shopping Center
                    </p>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 text-lg font-lora font-semibold text-espresso hover:text-brioche hover:bg-flaky/50 rounded-lg transition-colors"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * i + 0.15, duration: 0.3 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="mt-auto pb-8 space-y-3">
                    <Button
                      onClick={() => { openOrderForm(); setMobileOpen(false); }}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-brioche via-brioche-light to-brioche hover:from-brioche-dark hover:via-brioche hover:to-brioche-dark text-whipped font-semibold rounded-full py-6 text-base animate-shimmer"
                      style={{ backgroundSize: '200% auto' }}
                    >
                      Order a Custom Cake
                    </Button>
                    <a
                      href="tel:7145466386"
                      className="flex items-center justify-center gap-2 text-cafe font-semibold hover:text-brioche transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      (714) 546-6386
                    </a>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
