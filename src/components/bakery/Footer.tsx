'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Croissant, Phone, MapPin, Clock, Instagram, Facebook, ArrowUp, Accessibility, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  bakery: [
    { label: 'Fresh Breads', href: '#menu' },
    { label: 'Pastries & Croissants', href: '#menu' },
    { label: 'Wagon-Wheel Coffeecake', href: '#wagon-wheel' },
    { label: 'Custom Cakes', href: '#custom-orders' },
    { label: 'Seasonal Specials', href: '#menu' },
  ],
  company: [
    { label: 'Our Story', href: '#our-story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Catering & Events', href: '#custom-orders' },
    { label: 'Gift Cards', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  support: [
    { label: 'Contact Us', href: '#visit' },
    { label: 'FAQ', href: '#visit' },
    { label: 'Ordering Policy', href: '#' },
    { label: 'Allergen Info', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-espresso text-flaky mt-auto">
      {/* Gold gradient divider at top */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-brioche flex items-center justify-center">
                <Croissant className="w-6 h-6 text-brioche" />
              </div>
              <div>
                <p className="font-playfair font-bold text-xl text-whipped">French&apos;s</p>
                <p className="text-xs tracking-[0.2em] uppercase text-brioche-light">Pastry & Bakery</p>
              </div>
            </div>
            <p className="text-sm text-flaky/70 leading-relaxed mb-4 max-w-xs">
              Baking fresh in Costa Mesa since 1989. Artisan breads, exquisite pastries, and custom
              cakes — made from scratch, every morning.
            </p>

            {/* Delivery note */}
            <div className="flex items-center gap-2 mb-2 text-sm text-flaky/60">
              <Truck className="w-4 h-4 text-brioche shrink-0" />
              <span>Available on GrubHub & DoorDash</span>
            </div>

            {/* Wheelchair accessible note */}
            <div className="flex items-center gap-2 mb-4 text-sm text-flaky/60">
              <Accessibility className="w-4 h-4 text-brioche shrink-0" />
              <span>Wheelchair Accessible</span>
            </div>

            {/* Yelp Review Badge */}
            <div className="bg-espresso-light/50 rounded-lg px-3 py-2 mb-4 inline-flex items-center gap-2 border border-brioche/10">
              <span className="text-brioche text-sm">★★★★☆</span>
              <span className="text-xs text-flaky/70">
                3.4 on Yelp · <span className="text-brioche-light font-semibold">399+</span> reviews
              </span>
            </div>

            {/* Animated Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Facebook, label: 'Facebook', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-full bg-espresso-light hover:bg-brioche flex items-center justify-center transition-colors"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Icon className="w-4 h-4 text-flaky" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bakery Menu */}
          <div>
            <h3 className="font-lora font-semibold text-whipped mb-4 text-sm uppercase tracking-wider">
              Our Bakery
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.bakery.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-flaky/60 hover:text-brioche transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-lora font-semibold text-whipped mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-flaky/60 hover:text-brioche transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-lora font-semibold text-whipped mb-4 text-sm uppercase tracking-wider">
              Visit Us
            </h3>
            <div className="space-y-3">
              <a
                href="#visit"
                className="flex items-start gap-2 text-sm text-flaky/60 hover:text-brioche transition-colors group"
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brioche" />
                <span>
                  1170 W. Baker St, Suite B
                  <br />
                  Costa Mesa, CA 92626
                </span>
              </a>
              <a
                href="tel:7145466386"
                className="flex items-center gap-2 text-sm text-flaky/60 hover:text-brioche transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-brioche" />
                (714) 546-6386
              </a>
              <div className="flex items-start gap-2 text-sm text-flaky/60">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-brioche" />
                <div>
                  <p>Mon – Fri: 7AM – 6PM</p>
                  <p>Saturday: 7AM – 5PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-whipped/80 uppercase tracking-wider mb-2">
                Bakery Updates
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 text-sm bg-espresso-light/50 border-espresso-light text-flaky placeholder:text-flaky/40 focus-visible:border-brioche focus-visible:ring-brioche/30"
                  required
                />
                <Button
                  type="submit"
                  className="h-9 px-3 bg-brioche hover:bg-brioche-dark text-whipped text-xs font-semibold shrink-0 rounded-md"
                >
                  Subscribe
                </Button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-herbe mt-1.5"
                >
                  ✓ Subscribed! Sweet updates coming your way.
                </motion.p>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-espresso-light" />

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-flaky/35 text-center sm:text-left">
            © {new Date().getFullYear()} French&apos;s Pastry & Bakery. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-flaky/35">
            <Croissant className="w-3 h-3 text-brioche/50" />
            <span>Baked with love in Costa Mesa</span>
          </div>
          <p className="text-[11px] text-flaky/30 text-center sm:text-right">
            Serving Costa Mesa, Newport Beach, & Orange County
          </p>
        </div>
      </div>

      {/* Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-20 lg:bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-brioche/90 hover:bg-brioche text-whipped shadow-lg shadow-brioche/25 flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
