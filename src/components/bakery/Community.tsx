'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const milestones = [
  { year: 1989, event: "French's Bakery opens its doors on Baker Street in Costa Mesa" },
  { year: 1992, event: 'The Wagon Wheel Coffeecake becomes a local phenomenon' },
  { year: 2001, event: 'Expanded offerings to include full French-inspired menu' },
  { year: 2008, event: "Introduced \"Bring Your Recipe\" — custom baking from family recipes" },
  { year: 2018, event: 'Wagon Wheel Coffeecake flavor count surpasses 40 varieties' },
  { year: 2025, event: '36 years and still baking fresh every morning — a Costa Mesa institution' },
];

const parallaxEmojis = [
  { emoji: '🌾', x: '8%', y: '15%', speed: 0.15, size: '5rem' },
  { emoji: '🌿', x: '85%', y: '10%', speed: 0.25, size: '4rem' },
  { emoji: '🍃', x: '70%', y: '70%', speed: 0.1, size: '3rem' },
  { emoji: '🌾', x: '20%', y: '80%', speed: 0.2, size: '4.5rem' },
  { emoji: '🌿', x: '50%', y: '50%', speed: 0.3, size: '3.5rem' },
  { emoji: '🍃', x: '92%', y: '45%', speed: 0.12, size: '2.5rem' },
  { emoji: '🌾', x: '35%', y: '30%', speed: 0.18, size: '3rem' },
  { emoji: '🌿', x: '60%', y: '85%', speed: 0.22, size: '4rem' },
];

function ParallaxEmoji({
  emoji,
  x,
  y: top,
  speed,
  size,
  scrollYProgress,
}: {
  emoji: string;
  x: string;
  y: string;
  speed: number;
  size: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -120]);
  return (
    <motion.div
      className="absolute pointer-events-none select-none opacity-[0.06] z-0"
      style={{
        left: x,
        top,
        y,
        fontSize: size,
      }}
    >
      {emoji}
    </motion.div>
  );
}

function AnimatedYear({ year, isInView, delay }: { year: number; isInView: boolean; delay: number }) {
  const [displayYear, setDisplayYear] = useState(year);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const motionVal = { value: year - 3 };
      const controls = animate(motionVal, { value: year }, {
        duration: 0.8,
        delay,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayYear(Math.round(latest.value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, year, delay]);

  return (
    <motion.span
      className="font-playfair font-bold text-lg text-brioche group-hover:text-brioche-light transition-colors"
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.5, delay: delay - 0.1 }}
    >
      {displayYear}
    </motion.span>
  );
}

function MilestoneItem({ milestone, index }: { milestone: (typeof milestones)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 items-start group"
    >
      <div className="shrink-0 w-16 text-right">
        <AnimatedYear year={milestone.year} isInView={isInView} delay={index * 0.1} />
      </div>
      <div className="relative flex-1">
        {/* Timeline dot with glow */}
        <motion.div
          className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-brioche border-2 border-espresso"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
        />
        {/* Glow behind dot */}
        <motion.div
          className="absolute -left-[29px] top-[3px] w-[19px] h-[19px] rounded-full bg-brioche/30 blur-sm"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        />
        <p className="text-sm text-flaky/70 leading-relaxed pl-2 group-hover:text-flaky/90 transition-colors">
          {milestone.event}
        </p>
      </div>
    </motion.div>
  );
}

export default function Community() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="our-story"
      className="py-16 sm:py-24 bg-espresso text-whipped relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Grain/noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Parallax background emojis */}
      {parallaxEmojis.map((item, i) => (
        <ParallaxEmoji
          key={i}
          emoji={item.emoji}
          x={item.x}
          y={item.y}
          speed={item.speed}
          size={item.size}
          scrollYProgress={scrollYProgress}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-brioche/20 text-brioche-light border-brioche/30 mb-6 font-caveat text-lg px-4">
              Est. 1989
            </Badge>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-whipped mb-6 leading-tight">
              36 Years of Baking Fresh in Costa Mesa
            </h2>
            <div className="space-y-4 text-flaky/70 leading-relaxed">
              {/* Decorative quote with quote marks */}
              <div className="relative">
                <span className="absolute -top-4 -left-3 text-5xl text-brioche/25 font-playfair leading-none select-none">
                  &ldquo;
                </span>
                <p className="font-cormorant italic text-xl text-brioche-light pl-4">
                  What started as a single bakery on Baker Street grew into one of Orange
                  County&apos;s most cherished culinary institutions.
                </p>
                <span className="absolute -bottom-6 right-0 text-5xl text-brioche/25 font-playfair leading-none select-none">
                  &rdquo;
                </span>
              </div>

              <p className="pt-4">
                French&apos;s Bakery was born from a love of honest, artisan baking. We believe that
                food made by hand, from real ingredients, with real care — tastes like nothing else
                in the world.
              </p>
              <p>
                For over 36 years, Costa Mesa has agreed. Our ovens have been warm every single
                morning since 1989, and our commitment to freshness, quality, and community has
                never wavered.
              </p>
            </div>

            {/* Bring Your Recipe callout with animated border */}
            <div className="mt-10 relative">
              {/* Animated gradient border */}
              <motion.div
                className="absolute -inset-[2px] rounded-xl opacity-60"
                style={{
                  background: 'linear-gradient(90deg, #C8873A, #D9A05C, #C8873A, #A86E28, #C8873A)',
                  backgroundSize: '300% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative bg-espresso rounded-xl p-6 border border-brioche/20">
                <p className="font-caveat text-2xl text-brioche-light mb-2">
                  📝 Bring Us Your Recipe
                </p>
                <p className="text-sm text-flaky/60">
                  Have a cherished family recipe? A childhood favorite? Bring it to us and we&apos;ll
                  bake it to perfection. It&apos;s our way of honoring the tradition of homemade baking
                  — and the stories that come with it.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-lora font-semibold text-lg text-brioche-light mb-8">
              Our Journey
            </h3>

            {/* Timeline connecting line */}
            <div className="relative ml-8 pl-0">
              {/* Vertical line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-brioche/10 via-brioche/40 to-brioche/10" />

              <div className="space-y-6">
                {milestones.map((milestone, i) => (
                  <MilestoneItem key={milestone.year} milestone={milestone} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
