'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
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
  Apple: 'Tender cinnamon-spiced apple chunks baked into our golden coffeecake',
  Walnut: 'Crunchy California walnuts with a brown sugar glaze throughout',
  Raspberry: 'Tart raspberry swirl with a hint of almond in every slice',
  Lemon: 'Bright citrus zest and a delicate lemon glaze drizzle',
  Orange: 'Candied orange peel and fresh zest in a fragrant, sunny cake',
  Strawberry: 'Sweet strawberry ribbons through our tender sour cream base',
  Cherry: 'Dark sweet cherries and a hint of almond extract — a classic combo',
  Peach: 'Juicy ripe peach slices with warm cinnamon and vanilla',
  Pineapple: 'Tropical pineapple chunks with a coconut-streusel topping',
  Almond: 'Toasted almond slices and amaretto-kissed crumb topping',
  Hazelnut: 'Roasted hazelnuts with a Nutella-inspired ribbon',
  Coconut: 'Shredded coconut and a creamy coconut glaze — island vibes',
  Marble: 'Swirled vanilla and chocolate batters — best of both worlds',
  'Sour Cream': 'Extra-moist sour cream base that melts in your mouth',
  Maple: 'Pure maple syrup and warm spices in a New England–style treat',
  'Brown Sugar': 'Caramelized brown sugar layers with a buttery crunch',
  Vanilla: 'Madagascar vanilla bean specks in our richest, most tender base',
  'Red Velvet': 'Classic red velvet with a cream cheese–swirl crown',
  Carrot: 'Spiced carrot cake meets coffeecake — with pineapple and walnuts',
  Banana: 'Ripe banana puree with walnut pieces and a rum glaze',
  Blackberry: 'Wild blackberries with a hint of lemon zest and vanilla',
  Mango: 'Tropical mango puree with coconut and lime zest',
  Apricot: 'Sweet dried apricots with honey and warm cardamom',
  Rhubarb: 'Tangy rhubarb and strawberry in a sweet-tart springtime combo',
  Pistachio: 'Crushed pistachios with rosewater and a honey glaze',
  Macadamia: 'Buttery macadamia nuts with white chocolate chips',
  'Peanut Butter': 'Creamy peanut butter swirl with a chocolate drizzle',
  Gingerbread: 'Molasses, ginger, and warming spices — holiday in a cake',
  Cranberry: 'Tart cranberries with orange zest and pecan streusel',
  Eggnog: 'Nutmeg, rum extract, and creamy custard — festive and rich',
  'Apple Cider': 'Spiced apple cider reduction with cinnamon streusel',
  Peppermint: 'Candy cane crunch with white chocolate and peppermint cream',
  'Spiced Pear': 'Bosc pear slices with cardamom, ginger, and caramel',
  Toffee: 'Sticky toffee bits with a butterscotch drizzle',
  Caramel: 'Salted caramel ribbons through our signature buttery base',
  Mocha: 'Espresso-kissed chocolate batter with a coffee cream swirl',
};

/* ─── SVG Wagon Wheel Component ─── */
function WagonWheelSVG() {
  const spokeCount = 12;
  const spokes = useMemo(
    () =>
      Array.from({ length: spokeCount }, (_, i) => ({
        angle: (360 / spokeCount) * i,
        id: i,
      })),
    []
  );

  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D9A05C" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#C8873A" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#C8873A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9A05C" />
          <stop offset="50%" stopColor="#C8873A" />
          <stop offset="100%" stopColor="#A86E28" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9A05C" />
          <stop offset="100%" stopColor="#A86E28" />
        </linearGradient>
        <filter id="wheelShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2B1A0F" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Outer glow circle */}
      <circle cx="150" cy="150" r="148" fill="url(#wheelGlow)" />

      <g filter="url(#wheelShadow)">
        {/* Outer rim */}
        <circle
          cx="150" cy="150" r="130"
          fill="none" stroke="url(#rimGrad)" strokeWidth="10"
        />
        {/* Second rim */}
        <circle
          cx="150" cy="150" r="118"
          fill="none" stroke="#C8873A" strokeWidth="2" opacity="0.5"
        />
        {/* Inner ring */}
        <circle
          cx="150" cy="150" r="45"
          fill="none" stroke="url(#rimGrad)" strokeWidth="6"
        />
        {/* Inner ring detail */}
        <circle
          cx="150" cy="150" r="38"
          fill="none" stroke="#C8873A" strokeWidth="1.5" opacity="0.4"
        />
        {/* Hub center */}
        <circle cx="150" cy="150" r="14" fill="#C8873A" />
        <circle cx="150" cy="150" r="8" fill="#D9A05C" />
        <circle cx="150" cy="150" r="4" fill="#A86E28" />

        {/* Spokes */}
        {spokes.map(({ angle, id }) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 150 + 45 * Math.cos(rad);
          const y1 = 150 + 45 * Math.sin(rad);
          const x2 = 150 + 125 * Math.cos(rad);
          const y2 = 150 + 125 * Math.sin(rad);
          return (
            <line
              key={id}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#spokeGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Decorative dots at spoke intersections on inner ring */}
        {spokes.map(({ angle, id }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 150 + 45 * Math.cos(rad);
          const y = 150 + 45 * Math.sin(rad);
          return (
            <circle
              key={`dot-inner-${id}`}
              cx={x} cy={y} r="3"
              fill="#D9A05C"
            />
          );
        })}

        {/* Decorative dots at spoke intersections on outer rim */}
        {spokes.map(({ angle, id }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 150 + 125 * Math.cos(rad);
          const y = 150 + 125 * Math.sin(rad);
          return (
            <circle
              key={`dot-outer-${id}`}
              cx={x} cy={y} r="4"
              fill="#D9A05C"
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ─── Rotating Flavor Label ─── */
function RotatingFlavorLabel({ flavor }: { flavor: string }) {
  const chars = flavor.split('');
  const radius = 155;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{ width: 310, height: 310 }}
      >
        {chars.map((char, i) => {
          const angle = (360 / chars.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 155 + radius * Math.cos(rad);
          const y = 155 + radius * Math.sin(rad);
          return (
            <span
              key={i}
              className="absolute text-xs font-caveat font-bold text-brioche/70"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function WagonWheel() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFlavor, setSelectedFlavor] = useState('Cinnamon');

  const filteredFlavors =
    activeCategory === 'All'
      ? flavors
      : flavors.filter((f) => f.category === activeCategory);

  const selectedFlavorData = flavors.find((f) => f.name === selectedFlavor);
  const description =
    flavorDescriptions[selectedFlavor] ||
    `Our delicious ${selectedFlavor.toLowerCase()} Wagon-Wheel Coffeecake, made with premium ingredients and baked fresh.`;

  return (
    <section id="wagon-wheel" className="py-16 sm:py-24 bg-flaky relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brioche/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cafe/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-brioche/3 rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-cafe/3 rounded-full" />

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
            A Costa Mesa legend — our 12-inch round coffeecake available in over 40 incredible flavors. Starting at $13.98, serves 10–12. Made with 36 years of love.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Visual — Spinning Wheel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Wheel container */}
            <div className="relative bg-gradient-to-br from-brioche/10 via-flaky to-cafe/5 rounded-3xl p-8 sm:p-12 flex items-center justify-center min-h-[350px] sm:min-h-[420px]">
              {/* Glow pulse behind wheel */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-brioche/15 blur-2xl"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.35, 0.15],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-brioche/10 blur-3xl"
                />
              </div>

              {/* The spinning wagon wheel */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
                {/* Rotating flavor label around the wheel */}
                <RotatingFlavorLabel flavor={selectedFlavor} />

                {/* Spinning wheel SVG */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-full"
                >
                  <WagonWheelSVG />
                </motion.div>

                {/* Center label — static, not spinning */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-caveat text-brioche-dark text-sm sm:text-base font-bold mt-1">
                    {selectedFlavor}
                  </span>
                  <span className="font-caveat text-cafe text-xs sm:text-sm">
                    Flavor
                  </span>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 text-2xl opacity-30">🌿</div>
              <div className="absolute bottom-4 right-4 text-2xl opacity-30">✨</div>
              <div className="absolute top-4 right-4 text-2xl opacity-20">🌾</div>
              <div className="absolute bottom-4 left-4 text-2xl opacity-20">🍰</div>
            </div>

            {/* Animated flavor description card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlavor}
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 bg-whipped rounded-xl p-5 border border-flaky shadow-sm relative overflow-hidden"
              >
                {/* Shimmer accent bar */}
                <motion.div
                  layoutId="flavor-accent"
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brioche-light via-brioche to-brioche-dark"
                  style={{
                    backgroundSize: '200% auto',
                  }}
                />

                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-playfair font-bold text-lg text-espresso">
                        {selectedFlavor}
                      </h3>
                      {selectedFlavorData?.popular && (
                        <Badge className="bg-raspberry/10 text-raspberry border-raspberry/20 text-[10px] px-1.5 py-0">
                          <Star className="w-2.5 h-2.5 mr-0.5 fill-current" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
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

            {/* Category filter with animated active state */}
            <div className="flex flex-wrap gap-2 mb-6">
              {flavorCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-brioche text-whipped shadow-md'
                      : 'bg-flaky text-cafe hover:bg-brioche/10 border border-cafe/20'
                  }`}
                >
                  <motion.span
                    layout
                    className="relative z-10"
                  >
                    {cat}
                  </motion.span>
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="category-pill"
                      className="absolute inset-0 bg-brioche rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Flavor badges grid */}
            <div className="flex flex-wrap gap-2 mb-8 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredFlavors.map((flavor) => (
                  <motion.button
                    key={flavor.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setSelectedFlavor(flavor.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedFlavor === flavor.name
                        ? 'bg-brioche text-whipped shadow-md ring-2 ring-brioche/30'
                        : 'bg-whipped text-espresso border border-flaky hover:border-brioche hover:bg-brioche/5'
                    }`}
                  >
                    <span>{flavor.name}</span>
                    {flavor.popular && (
                      <Star className="inline-block w-3 h-3 ml-1 text-raspberry fill-raspberry" />
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => openOrderForm()}
                  className="w-full bg-brioche hover:bg-brioche-dark text-whipped font-semibold rounded-full py-6 text-base shadow-lg shadow-brioche/20 hover:shadow-xl hover:shadow-brioche/30 transition-all duration-300"
                >
                  Order This Flavor
                </Button>
              </motion.div>
              <p className="text-center text-xs text-muted-foreground">
                Minimum 2-day advance order · Pickup at Costa Mesa location
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
