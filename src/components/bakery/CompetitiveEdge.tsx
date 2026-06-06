'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const advantages = [
  {
    emoji: '🏛️',
    title: '36+ Year Institution',
    description:
      "Not a chain. Not a trend. Costa Mesa has trusted French's since 1989 — and we've never stopped baking fresh.",
    accentColor: 'from-brioche/20 to-brioche/5',
    borderAccent: 'border-brioche/30',
    iconBg: 'bg-brioche/15',
    iconRing: 'ring-brioche/20',
  },
  {
    emoji: '🎡',
    title: 'Famous Wagon Wheels',
    description:
      'Our legendary 12-inch round coffeecake in 40+ flavors. A Costa Mesa original you won\'t find anywhere else.',
    accentColor: 'from-raspberry/20 to-raspberry/5',
    borderAccent: 'border-raspberry/30',
    iconBg: 'bg-raspberry/15',
    iconRing: 'ring-raspberry/20',
  },
  {
    emoji: '📝',
    title: 'Bring Your Recipe',
    description:
      "Have a cherished family recipe? We'll bake it to perfection. It's our way of honoring homemade tradition.",
    accentColor: 'from-herbe/20 to-herbe/5',
    borderAccent: 'border-herbe/30',
    iconBg: 'bg-herbe/15',
    iconRing: 'ring-herbe/20',
  },
  {
    emoji: '🍽️',
    title: 'Bakery & Restaurant',
    description:
      'Artisan pastries AND French-inspired dining. Start with a croissant, stay for quiche Lorraine.',
    accentColor: 'from-cafe/20 to-cafe/5',
    borderAccent: 'border-cafe/30',
    iconBg: 'bg-cafe/15',
    iconRing: 'ring-cafe/20',
  },
  {
    emoji: '🧁',
    title: '$1 Tuesday Cupcakes',
    description:
      "A beloved weekly tradition. Every Tuesday, all cupcakes just $1. Costa Mesa's sweetest deal.",
    accentColor: 'from-raspberry-light/20 to-raspberry-light/5',
    borderAccent: 'border-raspberry-light/30',
    iconBg: 'bg-raspberry-light/15',
    iconRing: 'ring-raspberry-light/20',
  },
  {
    emoji: '🚗',
    title: 'Delivery Available',
    description:
      "Can't make it? Order via GrubHub or DoorDash. Fresh bakery delivered to your door.",
    accentColor: 'from-brioche-light/20 to-brioche-light/5',
    borderAccent: 'border-brioche-light/30',
    iconBg: 'bg-brioche-light/15',
    iconRing: 'ring-brioche-light/20',
  },
];

const marqueeText =
  '★ FRESH DAILY ★ WAGON WHEELS ★ CUSTOM CAKES ★ SINCE 1989 ★ FRESH DAILY ★ WAGON WHEELS ★ CUSTOM CAKES ★ SINCE 1989 ★';

function AdvantageCard({
  advantage,
  index,
}: {
  advantage: (typeof advantages)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(200, 135, 58, 0.15)' }}
      className="group relative bg-whipped rounded-2xl border border-flaky/60 p-6 sm:p-8 transition-shadow duration-300 hover:shadow-xl overflow-hidden"
    >
      {/* Gradient accent background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${advantage.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Emoji icon circle */}
        <motion.div
          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full ${advantage.iconBg} ring-2 ${advantage.iconRing} flex items-center justify-center text-3xl sm:text-4xl mb-5 relative`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Pulse ring animation */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current" style={{ animationDuration: '3s' }} />
          {advantage.emoji}
        </motion.div>

        {/* Title */}
        <h3 className="font-playfair font-bold text-xl sm:text-2xl text-espresso mb-3 group-hover:text-brioche-dark transition-colors duration-300">
          {advantage.title}
        </h3>

        {/* Decorative line */}
        <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${advantage.accentColor.replace('from-', 'from-').replace('to-', 'to-')} mb-4 group-hover:w-20 transition-all duration-500`} />
        <div className="h-0.5 w-12 rounded-full bg-brioche/30 mb-4 group-hover:w-20 transition-all duration-500" />

        {/* Description */}
        <p className="text-cafe-light leading-relaxed text-sm sm:text-base">
          {advantage.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${advantage.accentColor.replace('from-', 'from-').replace('to-', 'to-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brioche/40 to-raspberry/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function CompetitiveEdge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="why-frenchs"
      className="py-16 sm:py-24 bg-whipped relative overflow-hidden"
    >
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brioche/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-raspberry/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cafe/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className="bg-brioche/15 text-brioche border-brioche/25 mb-4 font-caveat text-lg sm:text-xl px-5 py-1.5">
            Why French&apos;s
          </Badge>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-4 leading-tight">
            What Makes Us Different
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl text-cafe max-w-2xl mx-auto leading-relaxed">
            In a neighborhood filled with bakeries, here&apos;s why Costa Mesa keeps coming back.
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-brioche/40" />
            <div className="w-2 h-2 rounded-full bg-brioche/60 rotate-45" />
            <div className="h-px w-24 bg-brioche/40" />
            <div className="w-2 h-2 rounded-full bg-brioche/60 rotate-45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-brioche/40" />
          </div>
        </motion.div>

        {/* Advantage Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advantages.map((advantage, i) => (
            <AdvantageCard key={advantage.title} advantage={advantage} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="mt-16 sm:mt-24 overflow-hidden relative">
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-whipped to-transparent z-10 pointer-events-none" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-whipped to-transparent z-10 pointer-events-none" />

        <div className="bg-espresso/5 border-y border-brioche/15 py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="font-caveat text-xl sm:text-2xl text-brioche/70 tracking-wider mx-4">
              {marqueeText}
            </span>
            <span className="font-caveat text-xl sm:text-2xl text-brioche/70 tracking-wider mx-4">
              {marqueeText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
