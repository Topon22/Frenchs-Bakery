'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { openOrderForm } from '@/lib/order-events';

const flavorCategories = ['All', 'Classic', 'Fruit', 'Nut', 'Seasonal'];

const flavors = [
  { name: 'Cinnamon', category: 'Classic', popular: true },
  { name: 'Blueberry', category: 'Fruit', popular: true },
  { name: 'Apple', category: 'Fruit', popular: false },
  { name: 'Pecan', category: 'Nut', popular: true },
  { name: 'Walnut', category: 'Nut', popular: false },
  { name: 'Raspberry', category: 'Fruit', popular: false },
  { name: 'Lemon', category: 'Fruit', popular: false },
  { name: 'Orange', category: 'Fruit', popular: false },
  { name: 'Chocolate Chip', category: 'Classic', popular: true },
  { name: 'Marble', category: 'Classic', popular: false },
  { name: 'Sour Cream', category: 'Classic', popular: false },
  { name: 'Cream Cheese', category: 'Classic', popular: true },
  { name: 'Strawberry', category: 'Fruit', popular: false },
  { name: 'Cherry', category: 'Fruit', popular: false },
  { name: 'Peach', category: 'Fruit', popular: false },
  { name: 'Pineapple', category: 'Fruit', popular: false },
  { name: 'Almond', category: 'Nut', popular: false },
  { name: 'Hazelnut', category: 'Nut', popular: false },
  { name: 'Coconut', category: 'Nut', popular: false },
  { name: 'Pumpkin Spice', category: 'Seasonal', popular: true },
  { name: 'Gingerbread', category: 'Seasonal', popular: false },
  { name: 'Cranberry', category: 'Seasonal', popular: false },
  { name: 'Eggnog', category: 'Seasonal', popular: false },
  { name: 'Maple', category: 'Classic', popular: false },
  { name: 'Brown Sugar', category: 'Classic', popular: false },
  { name: 'Vanilla', category: 'Classic', popular: false },
  { name: 'Red Velvet', category: 'Classic', popular: false },
  { name: 'Carrot', category: 'Classic', popular: false },
  { name: 'Banana', category: 'Fruit', popular: false },
  { name: 'Blackberry', category: 'Fruit', popular: false },
  { name: 'Mango', category: 'Fruit', popular: false },
  { name: 'Apricot', category: 'Fruit', popular: false },
  { name: 'Rhubarb', category: 'Fruit', popular: false },
  { name: 'Pistachio', category: 'Nut', popular: false },
  { name: 'Macadamia', category: 'Nut', popular: false },
  { name: 'Peanut Butter', category: 'Nut', popular: false },
  { name: 'Apple Cider', category: 'Seasonal', popular: false },
  { name: 'Peppermint', category: 'Seasonal', popular: false },
  { name: 'Spiced Pear', category: 'Seasonal', popular: false },
  { name: 'Toffee', category: 'Classic', popular: false },
  { name: 'Caramel', category: 'Classic', popular: false },
  { name: 'Mocha', category: 'Classic', popular: false },
];

const flavorDescriptions: Record<string, string> = {
  Cinnamon: 'The OG — our original best-seller with swirls of cinnamon sugar and streusel topping',
  Blueberry: 'Plump wild blueberries folded into our signature buttery coffeecake base',
  Pecan: 'Toasted pecans and brown sugar streusel in a rich, nutty celebration',
  'Chocolate Chip': 'Semisweet chocolate chips throughout with a cocoa-kissed crumb',
  'Cream Cheese': 'Rich cream cheese ribbon running through our classic sour cream base',
  'Pumpkin Spice': 'Fall favorite — warm spices and real pumpkin in every bite',
};

export default function WagonWheel() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFlavor, setSelectedFlavor] = useState('Cinnamon');

  const filteredFlavors =
    activeCategory === 'All'
      ? flavors
      : flavors.filter((f) => f.category === activeCategory);

  return (
    <section id="wagon-wheel" className="py-16 sm:py-24 bg-flaky relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brioche/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cafe/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-brioche/10 text-brioche border-brioche/20 mb-4 px-4 py-1 font-caveat text-lg">
            ★ Our Signature ★
          </Badge>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-4">
            Famous Wagon Wheels
          </h2>
          <p className="font-cormorant italic text-xl text-cafe max-w-2xl mx-auto">
            A Costa Mesa legend since 1965 — our 12-inch round coffeecake available in over 40 incredible flavors. Starting at $13.98, serves 10–12.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Cake visual */}
            <div className="relative bg-gradient-to-br from-brioche/20 via-flaky to-cafe/10 rounded-3xl p-8 sm:p-12 flex items-center justify-center min-h-[350px] sm:min-h-[400px]">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="text-8xl sm:text-9xl mb-4 inline-block"
                >
                  🍰
                </motion.div>
                <p className="font-caveat text-2xl text-brioche">
                  {selectedFlavor} Flavor
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-2xl opacity-30">🌿</div>
              <div className="absolute bottom-4 right-4 text-2xl opacity-30">✨</div>
              <div className="absolute top-4 right-4 text-2xl opacity-20">🌾</div>
            </div>

            {/* Flavor description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlavor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-whipped rounded-xl p-5 border border-flaky shadow-sm"
              >
                <h3 className="font-playfair font-bold text-lg text-espresso mb-1">
                  {selectedFlavor}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {flavorDescriptions[selectedFlavor] ||
                    `Our delicious ${selectedFlavor.toLowerCase()} Wagon-Wheel Coffeecake, made with premium ingredients and baked fresh.`}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Flavor selector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-lora font-semibold text-lg text-espresso mb-4">
              Choose Your Flavor
            </h3>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {flavorCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-brioche text-whipped shadow-sm'
                      : 'bg-flaky text-cafe hover:bg-brioche/10 border border-cafe/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Flavor badges grid */}
            <div className="flex flex-wrap gap-2 mb-8 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
              {filteredFlavors.map((flavor, i) => (
                <motion.button
                  key={flavor.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  onClick={() => setSelectedFlavor(flavor.name)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedFlavor === flavor.name
                      ? 'bg-brioche text-whipped shadow-md ring-2 ring-brioche/30'
                      : 'bg-whipped text-espresso border border-flaky hover:border-brioche hover:bg-brioche/5'
                  }`}
                >
                  {flavor.name}
                  {flavor.popular && (
                    <span className="ml-1 text-[10px] text-raspberry">★</span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Button
                  onClick={() => openOrderForm()}
                className="w-full bg-brioche hover:bg-brioche-dark text-whipped font-semibold rounded-full py-6 text-base"
              >
                Order This Flavor
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Minimum 2-day advance order • Pickup at Costa Mesa location
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
