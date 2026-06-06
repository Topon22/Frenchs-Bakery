'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

const specials = [
  { name: '$1 Cupcakes on Tuesday!', price: '$1.00', emoji: '🧁', tag: 'Tuesday Special', featured: true, note: '' },
  { name: 'Cheese Danish', price: '$3.95', emoji: '🥐', tag: 'Best Seller', featured: false, note: '' },
  { name: 'Wagon Wheel Coffeecake', price: '$13.98+', emoji: '🍰', tag: 'Signature', featured: false, note: '' },
  { name: 'Carrot Cake Slice', price: '$5.50', emoji: '🥕', tag: 'Yelp Favorite', featured: false, note: 'Yelp says: "my favorite by far is the carrot cake"' },
  { name: 'French Bread Loaf', price: '$4.50', emoji: '🥖', tag: 'Fresh Baked', featured: false, note: '' },
  { name: 'Chocolate Custard Eclair', price: '$4.25', emoji: '🍫', tag: 'Indulgent', featured: false, note: '' },
];

/* ─── Chalk Dust Particle ─── */
function ChalkDustParticle({ delay, left, size, duration }: { delay: number; left: string; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/20 pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        bottom: '10%',
      }}
      animate={{
        y: [0, -60, -120],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

/* ─── Chalk Smudge Corner ─── */
function ChalkSmudge({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = 'absolute w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-30';
  const positions: Record<string, string> = {
    tl: 'top-0 left-0 rounded-br-full',
    tr: 'top-0 right-0 rounded-bl-full',
    bl: 'bottom-0 left-0 rounded-tr-full',
    br: 'bottom-0 right-0 rounded-tl-full',
  };
  return (
    <div
      className={`${base} ${positions[position]}`}
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
      }}
    />
  );
}

export default function DailySpecials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const today = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    []
  );

  // Chalk dust particles — 7 particles with varied positions and timing
  const chalkDustParticles = [
    { delay: 0, left: '12%', size: 3, duration: 3.2 },
    { delay: 0.8, left: '28%', size: 2.5, duration: 2.8 },
    { delay: 1.5, left: '45%', size: 3.5, duration: 3.5 },
    { delay: 0.4, left: '60%', size: 2, duration: 2.6 },
    { delay: 2.0, left: '75%', size: 3, duration: 3.0 },
    { delay: 1.2, left: '88%', size: 2.5, duration: 3.3 },
    { delay: 0.6, left: '38%', size: 2, duration: 2.9 },
  ];

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
          className="relative max-w-3xl mx-auto"
        >
          {/* Wood frame border */}
          <div
            className="absolute -inset-3 sm:-inset-4 rounded-xl sm:rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #5C3A1E 0%, #3D2510 30%, #6B4226 50%, #3D2510 70%, #5C3A1E 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(43,26,15,0.4)',
            }}
          >
            {/* Wood grain texture lines */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden opacity-20">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-px"
                  style={{
                    top: `${8 + i * 8}%`,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(139,94,60,0.4) 20%, rgba(139,94,60,0.6) 50%, rgba(139,94,60,0.4) 80%, transparent 100%)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Chalkboard surface */}
          <div
            ref={ref}
            className="chalkboard-bg rounded-xl sm:rounded-2xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden"
          >
            {/* Inner shadow for depth */}
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
              style={{
                boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.15)',
              }}
            />

            {/* Chalk smudge corners */}
            <ChalkSmudge position="tl" />
            <ChalkSmudge position="tr" />
            <ChalkSmudge position="bl" />
            <ChalkSmudge position="br" />

            {/* Floating chalk dust particles */}
            {chalkDustParticles.map((p, i) => (
              <ChalkDustParticle
                key={i}
                delay={p.delay}
                left={p.left}
                size={p.size}
                duration={p.duration}
              />
            ))}

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="font-caveat text-3xl sm:text-4xl chalk-text mb-2"
              >
                ✦ Today&apos;s Specials ✦
              </motion.h3>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-white/20" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xs chalk-text/60 font-caveat"
                >
                  {today}
                </motion.span>
                <div className="h-px w-12 bg-white/20" />
              </div>
            </div>

            {/* Specials list — staggered typewriter reveal */}
            <div className="space-y-4 sm:space-y-5 relative z-10">
              {specials.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.18,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative flex items-center justify-between gap-4 rounded-lg transition-all duration-300 ${
                    item.featured
                      ? 'bg-raspberry/15 -mx-3 px-3 py-3 sm:py-4'
                      : 'px-1 py-2 sm:py-2.5 hover:bg-brioche-light/10'
                  }`}
                >
                  {/* Hover glow effect — brioche-light chalk glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(217,160,92,0.12) 0%, transparent 70%)',
                    }}
                  />

                  <div className="flex items-center gap-3 relative z-10">
                    <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                    <div>
                      <span className={`font-caveat text-xl sm:text-2xl chalk-text transition-colors duration-300 ${
                        item.featured ? 'text-raspberry-light' : 'group-hover:text-brioche-light'
                      }`}>
                        {item.name}
                      </span>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                        <Badge className="text-[9px] px-1.5 py-0 bg-raspberry/20 text-raspberry-light border-0">
                          {item.tag}
                        </Badge>
                        {item.featured && (
                          <Badge className="text-[9px] px-1.5 py-0 bg-brioche/20 text-brioche-light border-0 animate-pulse">
                            ★ Featured
                          </Badge>
                        )}
                      </div>
                      {/* Review quote for Yelp favorite */}
                      {item.note && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={isInView ? { opacity: 0.7, height: 'auto' } : {}}
                          transition={{ delay: 1.2 + i * 0.18, duration: 0.6 }}
                          className="font-caveat text-xs chalk-text/50 mt-1 italic"
                        >
                          &ldquo;{item.note.replace(/^Yelp says: /, '')}&rdquo;
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="h-px flex-1 min-w-[40px] bg-white/15 hidden sm:block" />
                    <span className="font-caveat text-xl sm:text-2xl chalk-text whitespace-nowrap group-hover:text-brioche-light transition-colors duration-300">
                      {item.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Happy Hour mention */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-8 pt-5 border-t border-white/10 text-center relative z-10"
            >
              <p className="font-caveat text-sm chalk-text/60 mb-2">
                Prices may vary · All items baked fresh this morning · While supplies last
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="h-px w-8 bg-brioche-light/30" />
                <span className="font-caveat text-base text-brioche-light/80">
                  🕐 Happy Hour during the week — great deals!
                </span>
                <div className="h-px w-8 bg-brioche-light/30" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
