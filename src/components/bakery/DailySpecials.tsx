'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const specials = [
  { name: '$1 Cupcakes on Tuesday!', price: '$1.00', emoji: '🧁', tag: 'Tuesday Special', featured: true },
  { name: 'Cheese Danish', price: '$3.95', emoji: '🥐', tag: 'Best Seller' },
  { name: 'Wagon Wheel Coffeecake', price: '$13.98+', emoji: '🍰', tag: 'Signature' },
  { name: 'Carrot Cake Slice', price: '$5.50', emoji: '🥕', tag: 'Favorite' },
  { name: 'French Bread', price: '$4.50', emoji: '🥖', tag: 'Fresh Baked' },
  { name: 'Cookies (per dozen)', price: '$12.00', emoji: '🍪', tag: 'Classic' },
];

export default function DailySpecials() {
  return (
    <section className="py-16 sm:py-24 bg-parchment relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-caveat text-2xl text-brioche mb-1">Written Fresh Every Morning</p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-espresso">
            Today&apos;s Specials
          </h2>
        </motion.div>

        {/* Chalkboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="chalkboard-bg rounded-2xl p-6 sm:p-10 lg:p-14 max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Chalkboard frame effect */}
          <div className="absolute inset-0 border-4 border-espresso-light/50 rounded-2xl pointer-events-none" />

          {/* Chalk dust corner effects */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-white/3 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/3 rounded-tl-full" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h3 className="font-caveat text-3xl sm:text-4xl chalk-text mb-2">
              ✦ Today&apos;s Specials ✦
            </h3>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-xs chalk-text/60 font-caveat">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </div>

          {/* Specials list */}
          <div className="space-y-4 sm:space-y-5 relative z-10">
            {specials.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`flex items-center justify-between gap-4 group ${'featured' in item && item.featured ? 'bg-raspberry/15 -mx-3 px-3 py-2 rounded-lg' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                  <div>
                    <span className="font-caveat text-xl sm:text-2xl chalk-text group-hover:text-brioche-light transition-colors">
                      {item.name}
                    </span>
                    <div className="mt-0.5">
                      <Badge className="text-[9px] px-1.5 py-0 bg-raspberry/20 text-raspberry-light border-0">
                        {item.tag}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 min-w-[40px] bg-white/15 hidden sm:block" />
                  <span className="font-caveat text-xl sm:text-2xl chalk-text whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
            <p className="font-caveat text-sm chalk-text/50">
              Prices may vary • All items baked fresh this morning • While supplies last
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
