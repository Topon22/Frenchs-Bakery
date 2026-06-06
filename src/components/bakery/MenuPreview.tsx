'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const bakeryItems = [
  { name: 'Wagon Wheels', items: ['Cinnamon', 'Blueberry', 'Pecan', 'Cream Cheese', 'Chocolate Chip', '40+ Flavors Available'], emoji: '🍰' },
  { name: 'Danishes', items: ['Cheese Danish', 'Apple Danish', 'Cherry Danish', 'Apricot Danish', 'Blueberry Danish'], emoji: '🥐' },
  { name: 'French Breads', items: ['French Bread Loaf', 'Baguette', 'Sourdough Boule', 'Rustic Ciabatta', 'Rosemary Focaccia'], emoji: '🥖' },
  { name: 'Cookies & Bars', items: ['Butter Cookies', 'Chocolate Chip', 'Oatmeal Raisin', 'Brownies', 'Lemon Bars', 'Palmiers'], emoji: '🍪' },
];

const dessertItems = [
  { name: 'Layer Cakes', items: ['Carrot Cake', 'German Chocolate Cake', 'Red Velvet', 'Chocolate Ganache', 'Lemon Raspberry', 'Coconut Cake'], emoji: '🎂' },
  { name: 'Tarts & Pies', items: ['Fruit Tart', 'Lemon Tart', 'Chocolate Tart', 'Apple Tart Tatin', 'Pear Almond Tart'], emoji: '🥧' },
  { name: 'Individual Desserts', items: ['Crème Brûlée', 'Chocolate Mousse', 'Panna Cotta', 'Profiteroles', 'Éclairs', 'Mille-Feuille'], emoji: '🍮' },
];

const restaurantItems = [
  { name: 'French-Inspired', items: ['French Onion Soup', 'Croque Monsieur', 'Quiche Lorraine', 'Niçoise Salad', 'Ratatouille Tartine'], emoji: '🇫🇷' },
  { name: 'Breakfast & Brunch', items: ['Omelette du Jour', 'Avocado Toast on Sourdough', 'French Toast with Berries', 'Quiche of the Day', 'Crêpes Suzette'], emoji: '🍳' },
  { name: 'Daily Specials', items: ['Chef\'s Daily Soup', 'Seasonal Salad', 'Hot Special Entrée', 'See chalkboard for today\'s selection'], emoji: '📋' },
];

export default function MenuPreview() {
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
        <Tabs defaultValue="bakery" className="w-full">
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

          <TabsContent value="bakery">
            <MenuGrid items={bakeryItems} />
          </TabsContent>
          <TabsContent value="desserts">
            <MenuGrid items={dessertItems} />
          </TabsContent>
          <TabsContent value="restaurant">
            <MenuGrid items={restaurantItems} />
          </TabsContent>
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

function MenuGrid({
  items,
}: {
  items: { name: string; items: string[]; emoji: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {items.map((category, i) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="bg-parchment rounded-xl border border-flaky p-6 hover:shadow-md hover:shadow-brioche/5 transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.emoji}</span>
            <h3 className="font-playfair font-bold text-xl text-espresso">
              {category.name}
            </h3>
          </div>
          <ul className="space-y-2">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1 h-1 rounded-full bg-brioche shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
