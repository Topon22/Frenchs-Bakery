'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    name: 'Cheese Danish',
    category: 'Pastries',
    price: '$3.95',
    description: 'Our best-selling Danish — rich cream cheese filling in flaky puff pastry',
    image: '🥐',
    fresh: true,
    color: 'from-amber-100 to-orange-50',
  },
  {
    name: 'Wagon Wheel Coffeecake',
    category: 'Signature',
    price: '$13.98+',
    description: 'Our legendary 12-inch round coffeecake — 40+ flavors, serves 10-12',
    image: '🍰',
    fresh: true,
    color: 'from-rose-100 to-pink-50',
  },
  {
    name: 'French Bread',
    category: 'Breads',
    price: '$4.50',
    description: 'Crispy on the outside, deliciously soft inside — baked fresh daily',
    image: '🥖',
    fresh: true,
    color: 'from-yellow-100 to-amber-50',
  },
  {
    name: 'Carrot Cake',
    category: 'Desserts',
    price: '$5.50',
    description: 'Divine carrot cake with rich cream cheese frosting — a customer favorite',
    image: '🥕',
    fresh: true,
    color: 'from-orange-100 to-amber-50',
  },
  {
    name: 'Butter Croissant',
    category: 'Pastries',
    price: '$3.50',
    description: 'Golden, flaky layers of buttery French pastry perfection',
    image: '🥐',
    fresh: false,
    color: 'from-amber-100 to-yellow-50',
  },
  {
    name: 'German Chocolate Cake',
    category: 'Desserts',
    price: '$5.75',
    description: 'Rich chocolate layers with coconut-pecan frosting — divine',
    image: '🍫',
    fresh: true,
    color: 'from-stone-100 to-neutral-50',
  },
  {
    name: 'Cookies Assortment',
    category: 'Cookies',
    price: '$1.00',
    description: 'Fresh-baked cookies with perfect balance of flavors — $1 each on Tuesdays!',
    image: '🍪',
    fresh: true,
    color: 'from-amber-100 to-orange-50',
    tuesdaySpecial: true,
  },
  {
    name: 'Fruit Tart',
    category: 'Desserts',
    price: '$6.50',
    description: 'Fresh seasonal fruit on velvety pastry cream in a buttery shell',
    image: '🥧',
    fresh: true,
    color: 'from-lime-100 to-green-50',
  },
];

export default function DisplayCase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-caveat text-2xl text-brioche mb-1">Fresh From The Oven</p>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-espresso">
              Today&apos;s Display Case
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-cafe/30 text-cafe hover:bg-flaky hover:text-brioche"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-cafe/30 text-cafe hover:bg-flaky hover:text-brioche"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex-none w-72 snap-start"
            >
              <div className="group bg-whipped rounded-2xl border border-flaky shadow-sm hover:shadow-lg hover:shadow-brioche/10 transition-all duration-300 overflow-hidden">
                {/* Product image area */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${product.color} flex items-center justify-center`}
                >
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    {product.image}
                  </span>
                  {'tuesdaySpecial' in product && (
                    <Badge className="absolute top-3 right-3 bg-raspberry text-whipped text-[10px] font-semibold px-2 py-0.5 rounded-full animate-pulse">
                      $1 Tuesday!
                    </Badge>
                  )}
                  {product.fresh && !('tuesdaySpecial' in product) && (
                    <Badge className="absolute top-3 right-3 bg-herbe text-whipped text-[10px] font-semibold px-2 py-0.5 rounded-full animate-pulse">
                      Fresh Today
                    </Badge>
                  )}
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
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-xs text-cafe border-cafe/30 font-normal"
                    >
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-3 h-3 fill-brioche text-brioche"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="sm:hidden text-center text-xs text-muted-foreground mt-4 font-caveat text-lg">
          ← Swipe to explore →
        </p>
      </div>
    </section>
  );
}
