'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ─── Real Menu Data (GrubHub / Yelp / TikTok) ───

interface MenuItem {
  name: string;
  price?: string;
}

interface MenuCategory {
  name: string;
  emoji: string;
  items: MenuItem[];
  badge?: string;
}

const bakeryItems: MenuCategory[] = [
  {
    name: 'Wagon Wheels',
    emoji: '🍰',
    badge: 'Signature',
    items: [
      { name: 'Cinnamon' },
      { name: 'Blueberry' },
      { name: 'Pecan' },
      { name: 'Cream Cheese' },
      { name: 'Chocolate Chip' },
      { name: '40+ Flavors Available', price: '$13.98+' },
    ],
  },
  {
    name: 'Danishes',
    emoji: '🥐',
    items: [
      { name: 'Cheese Danish', price: '$3.95' },
      { name: 'Apple Danish', price: '$3.95' },
      { name: 'Cherry Danish' },
      { name: 'Apricot Danish' },
      { name: 'Blueberry Danish' },
      { name: 'Fruit Danish', price: '$3.95' },
    ],
  },
  {
    name: 'French Breads',
    emoji: '🥖',
    items: [
      { name: 'French Bread Loaf', price: '$4.50' },
      { name: 'Baguette' },
      { name: 'Sourdough Boule' },
    ],
  },
  {
    name: 'Cookies & Bars',
    emoji: '🍪',
    items: [
      { name: 'Butter Cookies' },
      { name: 'Chocolate Chip' },
      { name: 'Oatmeal Raisin' },
      { name: 'Brownies' },
      { name: 'Lemon Bars' },
      { name: 'Palmiers' },
    ],
  },
  {
    name: 'Croissants',
    emoji: '🥐',
    badge: 'NEW',
    items: [
      { name: 'Butter Croissant', price: '$3.50' },
      { name: 'Ham & Cheese Croissant', price: '$5.95' },
      { name: 'Almond Croissant', price: '$4.25' },
    ],
  },
];

const dessertItems: MenuCategory[] = [
  {
    name: 'Cakes by the Slice',
    emoji: '🎂',
    items: [
      { name: 'Carrot Cake', price: '$5.50' },
      { name: 'German Chocolate Cake', price: '$5.75' },
      { name: 'Red Velvet' },
      { name: 'Chocolate Ganache' },
    ],
  },
  {
    name: 'Tarts & Pies',
    emoji: '🥧',
    items: [
      { name: 'Fruit Tart' },
      { name: 'Lemon Tart' },
      { name: 'Apple Tart Tatin' },
    ],
  },
  {
    name: 'Individual Desserts',
    emoji: '🍮',
    items: [
      { name: 'Chocolate Custard Eclairs', price: '$4.25' },
      { name: 'Profiteroles' },
      { name: 'Mille-Feuille' },
      { name: 'Crème Brûlée' },
    ],
  },
  {
    name: 'Cupcakes',
    emoji: '🧁',
    badge: '$1 Tuesday!',
    items: [
      { name: 'Mini Cupcakes', price: '$3.95' },
      { name: 'Full-Size Cupcakes', price: '$4.95' },
      { name: '$1 Every Tuesday!' },
    ],
  },
  {
    name: 'Yule Log Cakes',
    emoji: '🪵',
    badge: 'Seasonal',
    items: [
      { name: 'Chocolate Yule Log' },
      { name: 'Vanilla Yule Log' },
      { name: 'Seasonal Varieties' },
    ],
  },
];

const restaurantItems: MenuCategory[] = [
  {
    name: 'French-Inspired',
    emoji: '🇫🇷',
    items: [
      { name: 'French Onion Soup' },
      { name: 'Croque Monsieur' },
      { name: 'Quiche Lorraine' },
    ],
  },
  {
    name: 'Breakfast & Brunch',
    emoji: '🍳',
    items: [
      { name: 'Omelette du Jour' },
      { name: 'Quiche of the Day' },
      { name: 'Croissant Sandwiches' },
    ],
  },
  {
    name: 'Daily Specials',
    emoji: '📋',
    items: [
      { name: "Chef's Daily Soup" },
      { name: 'Seasonal Salad' },
      { name: "See chalkboard for today's selection" },
    ],
  },
];

const allMenuData: Record<string, MenuCategory[]> = {
  bakery: bakeryItems,
  desserts: dessertItems,
  restaurant: restaurantItems,
};

// ─── Animation Variants ───

const tabContentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

// ─── Component ───

export default function MenuPreview() {
  const [activeTab, setActiveTab] = useState('bakery');

  const menuCategories = allMenuData[activeTab];

  return (
    <section id="menu" className="py-16 sm:py-24 bg-whipped">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-caveat text-2xl text-brioche mb-1">Made From Scratch</p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-4">
            Our Menu
          </h2>
          <p className="font-cormorant italic text-lg text-cafe max-w-xl mx-auto">
            Every item on our menu is made fresh daily — from our artisan breads to our French-inspired dishes
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mx-auto flex w-fit bg-flaky border border-flaky rounded-full p-1 mb-10">
            <TabsTrigger
              value="bakery"
              className="rounded-full px-6 py-2.5 font-lora font-semibold data-[state=active]:bg-brioche data-[state=active]:text-whipped transition-all"
            >
              🥐 Bakery
            </TabsTrigger>
            <TabsTrigger
              value="desserts"
              className="rounded-full px-6 py-2.5 font-lora font-semibold data-[state=active]:bg-brioche data-[state=active]:text-whipped transition-all"
            >
              🎂 Desserts
            </TabsTrigger>
            <TabsTrigger
              value="restaurant"
              className="rounded-full px-6 py-2.5 font-lora font-semibold data-[state=active]:bg-brioche data-[state=active]:text-whipped transition-all"
            >
              🍽️ Restaurant
            </TabsTrigger>
          </TabsList>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <MenuGrid categories={menuCategories} />
            </motion.div>
          </AnimatePresence>
        </Tabs>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Menu items and availability may vary • Ask about custom variations
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-brioche text-brioche hover:bg-brioche hover:text-whipped px-8"
          >
            <a href="#custom-orders">Place a Special Order</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MenuGrid with staggered card reveal ───

function MenuGrid({ categories }: { categories: MenuCategory[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, i) => (
        <motion.div
          key={category.name}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            y: -6,
            boxShadow: '0 20px 40px -12px rgba(200, 135, 58, 0.15)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-parchment rounded-xl border border-flaky p-6 group cursor-default"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.emoji}</span>
            <div className="flex-1">
              <h3 className="font-playfair font-bold text-xl text-espresso">
                {category.name}
              </h3>
            </div>
            {category.badge && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                category.badge === 'NEW'
                  ? 'bg-herbe/15 text-herbe'
                  : category.badge === '$1 Tuesday!'
                    ? 'bg-raspberry/15 text-raspberry'
                    : category.badge === 'Signature'
                      ? 'bg-brioche/15 text-brioche-dark'
                      : 'bg-cafe/15 text-cafe'
              }`}>
                {category.badge}
              </span>
            )}
          </div>

          {/* Items with staggered reveal */}
          <ul className="space-y-2">
            {category.items.map((item, j) => (
              <motion.li
                key={item.name}
                custom={j}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between gap-2 text-sm group/item rounded-md px-2 py-1 -mx-2 hover:bg-brioche/5 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 text-muted-foreground group-hover/item:text-espresso transition-colors">
                  <span className="w-1 h-1 rounded-full bg-brioche shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.price && (
                  <span className="text-xs font-lora font-semibold text-brioche-dark bg-brioche/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {item.price}
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
