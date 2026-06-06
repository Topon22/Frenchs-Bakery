'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/* ─── Product Data (Real menu items) ─── */
const products = [
  {
    name: 'Cheese Danish',
    badge: 'Best Seller',
    badgeColor: 'bg-brioche text-whipped',
    price: '$3.95',
    description: 'Our best-selling Danish — rich cream cheese filling in flaky puff pastry',
    emoji: '🥐',
    fresh: true,
    gradient: 'from-amber-100 to-orange-50',
  },
  {
    name: 'Wagon Wheel Coffeecake',
    badge: 'Signature',
    badgeColor: 'bg-raspberry text-whipped',
    price: '$13.98+',
    description: 'Our legendary 12-inch round coffeecake — 40+ flavors, serves 10-12',
    emoji: '🍰',
    fresh: true,
    gradient: 'from-rose-100 to-pink-50',
  },
  {
    name: 'French Bread',
    badge: 'Fresh Baked',
    badgeColor: 'bg-herbe text-whipped',
    price: '$4.50',
    description: 'Crispy on the outside, deliciously soft inside — baked fresh daily',
    emoji: '🥖',
    fresh: true,
    gradient: 'from-yellow-100 to-amber-50',
  },
  {
    name: 'Carrot Cake',
    badge: 'Customer Favorite',
    badgeColor: 'bg-raspberry-light text-whipped',
    price: '$5.50',
    description: 'Divine carrot cake with rich cream cheese frosting — a Yelp favorite',
    emoji: '🥕',
    fresh: true,
    gradient: 'from-orange-100 to-amber-50',
  },
  {
    name: 'Chocolate Custard Eclair',
    badge: 'Indulgent',
    badgeColor: 'bg-espresso-light text-whipped',
    price: '$4.25',
    description: 'Rich chocolate glaze over silky custard filling in choux pastry',
    emoji: '🍫',
    fresh: true,
    gradient: 'from-stone-100 to-neutral-50',
  },
  {
    name: 'Ham & Cheese Croissant',
    badge: 'Savory',
    badgeColor: 'bg-cafe text-whipped',
    price: '$5.95',
    description: 'Buttery flaky croissant stuffed with savory ham and melted cheese',
    emoji: '🥐',
    fresh: true,
    gradient: 'from-amber-100 to-yellow-50',
  },
  {
    name: 'Cookies Assortment',
    badge: '$1 Tuesday Special',
    badgeColor: 'bg-raspberry text-whipped',
    price: '$1.00',
    description: 'Fresh-baked cookies with perfect balance of flavors — $1 each on Tuesdays!',
    emoji: '🍪',
    fresh: true,
    gradient: 'from-amber-100 to-orange-50',
    tuesdaySpecial: true,
  },
  {
    name: 'Fruit Danish',
    badge: 'Fresh & Flaky',
    badgeColor: 'bg-herbe text-whipped',
    price: '$3.95',
    description: 'Seasonal fruit atop cream cheese in golden flaky Danish pastry',
    emoji: '🥧',
    fresh: true,
    gradient: 'from-lime-100 to-green-50',
  },
  {
    name: 'German Chocolate Cake',
    badge: 'Classic',
    badgeColor: 'bg-espresso-light text-whipped',
    price: '$5.75',
    description: 'Rich chocolate layers with coconut-pecan frosting — a timeless classic',
    emoji: '🍫',
    fresh: true,
    gradient: 'from-stone-100 to-neutral-50',
  },
  {
    name: 'Baklava',
    badge: "Tony's Special",
    badgeColor: 'bg-brioche text-whipped',
    price: '$4.50',
    description: "Tony's handmade baklava — layers of flaky phyllo with honey and nuts",
    emoji: '🍯',
    fresh: true,
    gradient: 'from-amber-100 to-yellow-50',
  },
];

/* ─── 3D Tilt Card ─── */
function TiltCard({
  product,
  index,
  inView,
}: {
  product: (typeof products)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px);
      y.set(py);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const isTuesday =
    typeof window !== 'undefined' && new Date().getDay() === 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex-none w-72 sm:w-80 snap-start"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="group bg-whipped rounded-2xl border border-flaky shadow-sm hover:shadow-xl hover:shadow-brioche/15 transition-shadow duration-500 overflow-hidden cursor-pointer"
      >
        {/* Product image area */}
        <div
          className={`relative h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
        >
          <motion.span
            className="text-7xl select-none"
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{ transform: 'translateZ(40px)' }}
          >
            {product.emoji}
          </motion.span>

          {/* Badge */}
          {product.tuesdaySpecial ? (
            <Badge
              className={`absolute top-3 right-3 ${product.badgeColor} text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                isTuesday ? 'animate-wiggle' : ''
              }`}
            >
              {product.badge}
            </Badge>
          ) : product.fresh ? (
            <Badge
              className={`absolute top-3 right-3 ${product.badgeColor} text-[10px] font-semibold px-2.5 py-1 rounded-full relative overflow-hidden`}
            >
              <Sparkles className="w-3 h-3 mr-0.5" />
              {product.badge}
              {/* Shimmer overlay */}
              <span
                className="absolute inset-0 animate-shimmer pointer-events-none"
                style={{
                  background:
                    'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)',
                  backgroundSize: '200% auto',
                }}
              />
            </Badge>
          ) : null}
        </div>

        {/* Product info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-playfair font-semibold text-lg text-espresso leading-tight">
              {product.name}
            </h3>
            <span className="font-lora font-bold text-brioche text-lg whitespace-nowrap">
              {product.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {product.description}
          </p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, j) => (
              <Star
                key={j}
                className="w-3 h-3 fill-brioche text-brioche"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main DisplayCase Component ─── */
export default function DisplayCase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const isTuesday = typeof window !== 'undefined' && new Date().getDay() === 2;

  const CARD_WIDTH = 320; // approximate width + gap
  const totalCards = products.length;

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -CARD_WIDTH : CARD_WIDTH,
        behavior: 'smooth',
      });
    },
    []
  );

  /* Track scroll position for progress dots */
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const idx = Math.round(progress * (totalCards - 1));
    setActiveIndex(idx);
  }, [totalCards]);

  const scrollToIndex = useCallback((idx: number) => {
    if (!scrollRef.current) return;
    const target = idx * CARD_WIDTH;
    scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-caveat text-2xl text-brioche mb-1">
              Fresh From The Oven
            </p>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-espresso">
              Today&apos;s Display Case
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-cafe/30 text-cafe hover:bg-flaky hover:text-brioche hover:border-brioche/40 transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-cafe/30 text-cafe hover:bg-flaky hover:text-brioche hover:border-brioche/40 transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Tuesday banner */}
        {isTuesday && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3 bg-raspberry/10 border border-raspberry/20 rounded-xl text-center"
          >
            <p className="font-caveat text-xl text-raspberry font-bold">
              🎉 It&apos;s $1 Tuesday — All cookies just $1 each!
            </p>
          </motion.div>
        )}

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product, i) => (
            <TiltCard
              key={product.name}
              product={product}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-brioche w-6'
                  : 'bg-cafe/25 hover:bg-cafe/50'
              }`}
              aria-label={`Go to product ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="sm:hidden text-center text-xs text-muted-foreground mt-3 font-caveat text-lg">
          ← Swipe to explore →
        </p>
      </div>
    </section>
  );
}
