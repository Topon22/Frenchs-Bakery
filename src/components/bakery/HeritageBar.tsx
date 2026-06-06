'use client';

import { motion } from 'framer-motion';
import { Award, Clock, Flame, Heart } from 'lucide-react';

const stats = [
  { icon: Clock, label: 'Years Baking Fresh', value: '60+' },
  { icon: Flame, label: 'Baking From Scratch', value: 'Daily' },
  { icon: Award, label: 'Wagon Wheel Flavors', value: '40+' },
  { icon: Heart, label: 'Tuesday Cupcakes', value: '$1' },
];

export default function HeritageBar() {
  return (
    <section id="heritage" className="relative py-6 bg-espresso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 justify-center py-2"
            >
              <stat.icon className="w-5 h-5 text-brioche shrink-0" />
              <div>
                <p className="font-playfair font-bold text-xl sm:text-2xl text-whipped leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-flaky/50 mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
