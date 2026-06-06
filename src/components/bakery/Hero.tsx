'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openOrderForm } from '@/lib/order-events';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with warm gradient overlay */}
      <div className="absolute inset-0">
        {/* Base warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-cafe/90 to-brioche-dark" />

        {/* Decorative pattern overlay - flour dust effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(200, 135, 58, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(245, 232, 208, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139, 94, 60, 0.15) 0%, transparent 70%)`,
          }}
        />

        {/* Flour dust particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-whipped/30 rounded-full animate-float-up"
              style={{
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-espresso/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Heritage badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-brioche/20 backdrop-blur-sm border border-brioche/30 rounded-full px-5 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-brioche-light" />
          <span className="text-sm font-lora font-semibold text-brioche-light tracking-wide">
Baking Fresh in Costa Mesa Since 1965
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-whipped leading-[1.1] mb-6"
        >
          Baked Fresh
          <br />
          <span className="text-brioche">Every Morning</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-flaky/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From artisan pastries and fresh-baked cookies to legendary Wagon Wheels — made from scratch
          with 60 years of love.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-brioche hover:bg-brioche-dark text-whipped font-semibold rounded-full px-8 py-6 text-base sm:text-lg shadow-lg shadow-brioche/25 animate-pulse-glow"
          >
            <a href="#menu">View Our Menu</a>
          </Button>
          <Button
            onClick={() => openOrderForm()}
            variant="outline"
            size="lg"
            className="border-whipped/40 text-whipped hover:bg-whipped/10 hover:text-whipped font-semibold rounded-full px-8 py-6 text-base sm:text-lg bg-transparent"
          >
            Order a Custom Cake
          </Button>
        </motion.div>

        {/* Quick info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-flaky/60"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-herbe" />
            Mon – Fri 7AM – 6PM
          </span>
          <span className="hidden sm:inline text-flaky/30">|</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-herbe" />
            Sat 7AM – 5PM
          </span>
          <span className="hidden sm:inline text-flaky/30">|</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brioche" />
            Mesa-North Shopping Center
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#heritage" className="flex flex-col items-center gap-2 text-whipped/40 hover:text-whipped/70 transition-colors">
          <span className="text-xs font-lora tracking-wider uppercase">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
