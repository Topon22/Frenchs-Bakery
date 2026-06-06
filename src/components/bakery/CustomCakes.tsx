'use client';

import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Heart, Cake, Truck, Cookie } from 'lucide-react';
import { openOrderForm } from '@/lib/order-events';

// ─── Step Data ───

const steps = [
  {
    icon: Sparkles,
    title: 'Share Your Vision',
    description:
      'Share your dream cake design, flavor preferences, and any reference photos. Browse our display cases for inspiration!',
  },
  {
    icon: Palette,
    title: 'We Craft & Bake',
    description:
      'Our expert bakers bring your vision to life using premium ingredients and 36 years of artisan expertise.',
  },
  {
    icon: Heart,
    title: 'Pick Up & Celebrate',
    description:
      'Pick up your one-of-a-kind creation and make your celebration unforgettable. Made with love, always.',
  },
];

// ─── Cake Types ───

const cakeTypes = [
  { name: 'Birthday Cakes', emoji: '🎂', description: 'Make their day unforgettable with a custom design' },
  { name: 'Wedding Cakes', emoji: '💍', description: 'Elegant multi-tier creations for your perfect day' },
  { name: 'Corporate Events', emoji: '🏢', description: 'Professional designs that impress clients and teams' },
  { name: 'Bring Your Recipe', emoji: '📝', description: "Have a family recipe? We'll bake it to perfection" },
  { name: 'Holiday Cakes', emoji: '🎄', description: 'Yule logs, pumpkin spice & seasonal specialties' },
  { name: 'Cookie Trays', emoji: '🍪', description: 'Custom cookie trays for any occasion' },
];

// ─── Floating Decorations ───

const floatingEmojis = [
  { emoji: '🧁', x: '8%', y: '15%', size: 28, delay: 0, duration: 7 },
  { emoji: '🍰', x: '88%', y: '20%', size: 24, delay: 1.5, duration: 8 },
  { emoji: '🥐', x: '5%', y: '55%', size: 22, delay: 0.8, duration: 6.5 },
  { emoji: '🎂', x: '92%', y: '50%', size: 26, delay: 2, duration: 7.5 },
  { emoji: '🍪', x: '15%', y: '80%', size: 20, delay: 1, duration: 9 },
  { emoji: '🥖', x: '85%', y: '78%', size: 24, delay: 2.5, duration: 8 },
  { emoji: '🍩', x: '50%', y: '8%', size: 22, delay: 0.5, duration: 7 },
  { emoji: '🪵', x: '75%', y: '90%', size: 20, delay: 3, duration: 6 },
];

// ─── Gradient configs for cake type cards ───

const cardGradients = [
  'from-espresso via-espresso/95 to-espresso-light/80',
  'from-espresso-light/90 via-espresso to-espresso/95',
  'from-espresso via-espresso-light/85 to-espresso',
  'from-espresso-light/85 via-espresso/95 to-espresso-light/90',
  'from-espresso/95 via-espresso-light/80 to-espresso',
  'from-espresso-light/90 via-espresso to-espresso-light/85',
];

// ─── Component ───

export default function CustomCakes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: '-100px' });

  return (
    <section
      id="custom-orders"
      className="py-16 sm:py-24 bg-parchment relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-brioche/5 rounded-full translate-x-1/2" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-cafe/5 rounded-full -translate-x-1/2" />

      {/* Floating pastry emojis */}
      {floatingEmojis.map((item, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none opacity-[0.12]"
          style={{
            left: item.x,
            top: item.y,
            fontSize: item.size,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, 6, -4, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-caveat text-2xl text-brioche mb-1">Something Special</p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-4">
            Your Vision. Our Oven.
          </h2>
          <p className="font-cormorant italic text-xl text-cafe max-w-2xl mx-auto">
            Every celebration deserves something freshly baked. From towering wedding cakes to a
            cherished family recipe — we make it magic.
          </p>
        </motion.div>

        {/* 3-Step Process with connecting line */}
        <div ref={stepsRef} className="relative">
          {/* SVG connecting line */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Line from step 1 to step 2 */}
            <motion.line
              x1="16.67%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke="var(--color-brioche)"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset="300"
              animate={stepsInView ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
              opacity={0.4}
            />
            {/* Line from step 2 to step 3 */}
            <motion.line
              x1="50%"
              y1="50%"
              x2="83.33%"
              y2="50%"
              stroke="var(--color-brioche)"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset="300"
              animate={stepsInView ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}
              opacity={0.4}
            />
            {/* Decorative dots at midpoints */}
            <motion.circle
              cx="33.33%"
              cy="50%"
              r="4"
              fill="var(--color-brioche)"
              opacity={0}
              animate={stepsInView ? { opacity: 0.4 } : {}}
              transition={{ duration: 0.4, delay: 1 }}
            />
            <motion.circle
              cx="66.67%"
              cy="50%"
              r="4"
              fill="var(--color-brioche)"
              opacity={0}
              animate={stepsInView ? { opacity: 0.4 } : {}}
              transition={{ duration: 0.4, delay: 1.5 }}
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative bg-whipped rounded-2xl border border-flaky p-8 text-center group hover:shadow-lg hover:shadow-brioche/10 transition-all duration-300"
              >
                {/* Step number with pulsing ring */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  {/* Pulsing ring */}
                  <span className="absolute inset-0 rounded-full bg-brioche/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <span className="relative w-8 h-8 rounded-full bg-brioche text-whipped text-sm font-bold flex items-center justify-center shadow-md shadow-brioche/30">
                    {i + 1}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-full bg-brioche/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brioche/20 transition-colors">
                  <step.icon className="w-7 h-7 text-brioche" />
                </div>
                <h3 className="font-playfair font-bold text-lg text-espresso mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cake Types Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 mt-14">
          {cakeTypes.map((cake, i) => (
            <motion.div
              key={cake.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{
                y: -4,
                boxShadow: '0 12px 28px -8px rgba(43, 26, 15, 0.35)',
              }}
              className={`bg-gradient-to-br ${cardGradients[i]} rounded-xl p-6 text-center cursor-pointer group`}
            >
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                {cake.emoji}
              </span>
              <h3 className="font-lora font-semibold text-whipped mb-1">{cake.name}</h3>
              <p className="text-xs text-flaky/70">{cake.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Delivery info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-whipped border border-flaky rounded-full px-5 py-2.5 text-sm text-cafe">
            <Truck className="w-4 h-4 text-brioche" />
            <span>Also available on <strong className="text-espresso">GrubHub</strong> & <strong className="text-espresso">DoorDash</strong> for delivery</span>
          </div>
        </motion.div>

        {/* CTA with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative inline-block">
            {/* Shimmer glow behind button */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-raspberry via-raspberry-light to-raspberry animate-gradient-shift bg-[length:200%_200%] blur-md opacity-40 scale-110" />
            <Button
              onClick={() => openOrderForm()}
              size="lg"
              className="relative bg-raspberry hover:bg-raspberry-light text-whipped font-semibold rounded-full px-10 py-6 text-base sm:text-lg shadow-lg shadow-raspberry/20 transition-all hover:scale-105"
            >
              <Cake className="w-5 h-5 mr-2" />
              Start Your Custom Order
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Minimum 2-day advance notice required • Pickup at our Costa Mesa location
          </p>
        </motion.div>
      </div>
    </section>
  );
}
