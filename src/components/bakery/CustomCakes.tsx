'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Palette, Heart, Cake } from 'lucide-react';
import { openOrderForm } from '@/lib/order-events';

const features = [
  {
    icon: Sparkles,
    title: 'Tell Us Your Vision',
    description:
      'Share your dream cake design, flavor preferences, and any reference photos. No idea is too creative!',
  },
  {
    icon: Palette,
    title: 'We Design & Bake',
    description:
      'Our expert bakers bring your vision to life using premium ingredients and 60 years of artisan expertise.',
  },
  {
    icon: Heart,
    title: 'You Celebrate',
    description:
      'Pick up your one-of-a-kind creation and make your celebration unforgettable. Made with love, always.',
  },
];

const cakeTypes = [
  { name: 'Birthday Cakes', emoji: '🎂', description: 'Make their day unforgettable with a custom design' },
  { name: 'Wedding Cakes', emoji: '💍', description: 'Elegant multi-tier creations for your perfect day' },
  { name: 'Corporate Events', emoji: '🏢', description: 'Professional designs that impress clients and teams' },
  { name: 'Bring Your Recipe', emoji: '📝', description: 'Have a family recipe? We\'ll bake it to perfection' },
];

export default function CustomCakes() {
  return (
    <section id="custom-orders" className="py-16 sm:py-24 bg-parchment relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-brioche/5 rounded-full translate-x-1/2" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-cafe/5 rounded-full -translate-x-1/2" />

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

        {/* 3-Step Process */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative bg-whipped rounded-2xl border border-flaky p-8 text-center group hover:shadow-lg hover:shadow-brioche/10 transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-brioche text-whipped text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>

              <div className="w-14 h-14 rounded-full bg-brioche/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brioche/20 transition-colors">
                <feature.icon className="w-7 h-7 text-brioche" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-espresso mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cake Types Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {cakeTypes.map((cake, i) => (
            <motion.div
              key={cake.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-espresso rounded-xl p-6 text-center hover:bg-espresso-light transition-colors group cursor-pointer"
            >
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                {cake.emoji}
              </span>
              <h3 className="font-lora font-semibold text-whipped mb-1">{cake.name}</h3>
              <p className="text-xs text-flaky/60">{cake.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={() => openOrderForm()}
            size="lg"
            className="bg-raspberry hover:bg-raspberry-light text-whipped font-semibold rounded-full px-10 py-6 text-base sm:text-lg shadow-lg shadow-raspberry/20"
          >
            <Cake className="w-5 h-5 mr-2" />
            Start Your Custom Order
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Minimum 2-day advance notice required • Pickup at our Costa Mesa location
          </p>
        </motion.div>
      </div>
    </section>
  );
}
