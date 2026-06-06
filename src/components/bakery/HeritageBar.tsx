'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Clock, Flame, Award, Heart, Star } from 'lucide-react';

/* ─── Animated Counter Hook ─── */
function useAnimatedCounter(target: number, inView: boolean, duration = 2) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, target, {
        duration,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [inView, target, duration, motionVal]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return display;
}

/* ─── Stats Data ─── */
const stats = [
  { icon: Clock, label: 'Years Baking Fresh', value: '36+', numericValue: 36, suffix: '+' },
  { icon: Flame, label: 'Baking From Scratch', value: 'Daily', numericValue: 0, suffix: '' },
  { icon: Award, label: 'Wagon Wheel Flavors', value: '40+', numericValue: 40, suffix: '+' },
  { icon: Heart, label: 'Tuesday Cupcakes', value: '$1', numericValue: 1, suffix: '', prefix: '$' },
  { icon: Star, label: 'Yelp Reviews', value: '399+', numericValue: 399, suffix: '+' },
];

/* ─── Diamond Separator ─── */
function DiamondSeparator() {
  return (
    <div className="hidden md:flex items-center justify-center px-2">
      <div className="w-2 h-2 rotate-45 bg-brioche/40" />
    </div>
  );
}

/* ─── Single Stat Item ─── */
function StatItem({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = stat.icon;
  const isTextValue = stat.value === 'Daily';
  const count = useAnimatedCounter(stat.numericValue, inView, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 justify-center py-3"
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="group/icon relative"
      >
        <Icon className="w-6 h-6 text-brioche shrink-0 transition-colors duration-300 group-hover/icon:text-brioche-light" />
        {/* Pulse ring on hover */}
        <span className="absolute inset-0 rounded-full bg-brioche/20 scale-0 group-hover/icon:scale-150 group-hover/icon:opacity-0 transition-all duration-500" />
      </motion.div>
      <div>
        <p className="font-playfair font-bold text-2xl sm:text-3xl text-whipped leading-none">
          {isTextValue ? (
            stat.value
          ) : (
            <>
              {stat.prefix && <span>{stat.prefix}</span>}
              <span>{count}</span>
              {stat.suffix && <span>{stat.suffix}</span>}
            </>
          )}
        </p>
        <p className="text-xs text-flaky/60 mt-1 font-source tracking-wide uppercase">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── HeritageBar Component ─── */
export default function HeritageBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="heritage" className="relative bg-espresso">
      {/* Top gold gradient line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #C8873A55 15%, #C8873A 50%, #C8873A55 85%, transparent 100%)',
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {/* Diamond separator before each stat (except first) */}
              {i > 0 && <DiamondSeparator />}
              <StatItem stat={stat} index={i} inView={inView} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gold gradient line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #C8873A55 15%, #C8873A 50%, #C8873A55 85%, transparent 100%)',
        }}
      />
    </section>
  );
}
