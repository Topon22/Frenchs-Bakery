'use client';

import { Croissant, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
  return (
    <footer className="bg-espresso text-flaky mt-auto">
      {/* Gold divider at top */}
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
                <p className="text-xs tracking-[0.3em] uppercase text-brioche-light">Bakery</p>
              </div>
            </div>
            <p className="text-sm text-flaky/70 leading-relaxed mb-4 max-w-xs">
              Baking fresh in Costa Mesa since 1988. Artisan breads, exquisite pastries, and custom
              cakes — made from scratch, every morning.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-espresso-light hover:bg-brioche flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-flaky" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-espresso-light hover:bg-brioche flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-flaky" />
              </a>
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
                    className="text-sm text-flaky/60 hover:text-brioche transition-colors"
                  >
                    {link.label}
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
                    className="text-sm text-flaky/60 hover:text-brioche transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-lora font-semibold text-whipped mb-4 text-sm uppercase tracking-wider">
              Visit Us
            </h3>
            <div className="space-y-3">
              <a
                href="#visit"
                className="flex items-start gap-2 text-sm text-flaky/60 hover:text-brioche transition-colors"
              >
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brioche" />
                <span>
                  1170 Baker St, Suite B
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
          </div>
        </div>

        <Separator className="bg-espresso-light" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-flaky/40 text-center sm:text-left">
            © {new Date().getFullYear()} French&apos;s Bakery. All rights reserved. Baked with love in
            Costa Mesa.
          </p>
          <div className="flex items-center gap-1 text-xs text-flaky/40">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-herbe mr-1" />
            Made Fresh Daily
          </div>
        </div>
      </div>
    </footer>
  );
}
