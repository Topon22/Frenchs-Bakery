'use client';

import { useState, useEffect } from 'react';
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-parchment/95 backdrop-blur-md shadow-md border-b border-flaky'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brioche flex items-center justify-center bg-parchment/80 group-hover:bg-brioche/10 transition-colors">
              <Croissant className="w-5 h-5 sm:w-6 sm:h-6 text-brioche" />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-lg sm:text-xl text-espresso leading-tight">
                French&apos;s
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-cafe font-semibold -mt-0.5">
                Bakery
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-lora font-semibold text-espresso hover:text-brioche transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brioche transition-all duration-300 group-hover:w-3/4" />
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
            <Button
              onClick={() => openOrderForm()}
              className="bg-brioche hover:bg-brioche-dark text-whipped font-semibold rounded-full px-6 animate-pulse-glow"
            >
              Order Now
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
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-espresso">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-parchment border-l border-flaky">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full pt-6">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full border-2 border-brioche flex items-center justify-center">
                        <Croissant className="w-5 h-5 text-brioche" />
                      </div>
                      <div>
                        <p className="font-playfair font-bold text-espresso">French&apos;s</p>
                        <p className="text-xs tracking-widest uppercase text-cafe">Bakery</p>
                      </div>
                    </div>
                  </div>

                  {/* Hours Badge */}
                  <div className="bg-brioche/10 rounded-lg px-4 py-3 mb-6">
                    <p className="text-xs font-semibold text-brioche">
                      Open Today: 7AM – 6PM
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Mesa-North Shopping Center
                    </p>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 text-lg font-lora font-semibold text-espresso hover:text-brioche hover:bg-flaky/50 rounded-lg transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="mt-auto pb-8 space-y-3">
                    <Button
                      onClick={() => { openOrderForm(); setMobileOpen(false); }}
                      className="w-full bg-brioche hover:bg-brioche-dark text-whipped font-semibold rounded-full py-6 text-base"
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
