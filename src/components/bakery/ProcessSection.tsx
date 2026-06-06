'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Wheat, Blend, Flame, Store, Heart } from 'lucide-react';

const steps = [
  {
    icon: Wheat,
    title: 'Premium Ingredients',
    description: 'We source the finest flour, butter, and ingredients — no shortcuts, no compromises.',
    time: 'Always',
    accentColor: 'border-l-herbe',
  },
  {
    icon: Blend,
    title: 'Mixed Fresh Every Morning',
    description: 'Our bakers arrive at 4 AM to prepare every dough, batter, and filling from scratch.',
    time: '4:00 AM',
    accentColor: 'border-l-brioche',
  },
  {
    icon: Flame,
    title: 'Baked in Small Batches',
    description: 'Throughout the day, we bake in small batches to ensure everything is perfectly fresh.',
    time: 'All Day',
    accentColor: 'border-l-raspberry',
  },
  {
    icon: Store,
    title: 'On the Shelf by 7 AM',
    description: 'Fresh breads and pastries are ready for you when we open our doors each morning.',
    time: '7:00 AM',
    accentColor: 'border-l-cafe',
  },
  {
    icon: Heart,
    title: 'Made with 36 Years of Love',
    description: 'Every item carries decades of baking tradition, community trust, and genuine care.',
    time: 'Since 1989',
    accentColor: 'border-l-brioche-light',
  },
];

function TimelineDot({
  icon: Icon,
  isInView,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  isInView: boolean;
  index: number;
}) {
  return (
    <div className="relative z-10 shrink-0">
      {/* Expanding ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-brioche"
        initial={{ scale: 1, opacity: 0 }}
        animate={isInView ? { scale: 1.8, opacity: 0 } : { scale: 1, opacity: 0 }}
        transition={{ duration: 1.2, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
      />
      {/* Second ring with stagger */}
      <motion.div
        className="absolute inset-0 rounded-full border border-brioche/40"
        initial={{ scale: 1, opacity: 0 }}
        animate={isInView ? { scale: 2.2, opacity: 0 } : { scale: 1, opacity: 0 }}
        transition={{ duration: 1.5, delay: index * 0.15 + 0.5, ease: 'easeOut' }}
      />
      {/* Pulse glow behind the dot */}
      <motion.div
        className="absolute inset-[-4px] rounded-full bg-brioche/20 blur-sm"
        animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 0.8 }}
      />
      {/* Main dot circle */}
      <motion.div
        className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-whipped border-2 border-brioche flex items-center justify-center shadow-md"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: index * 0.15,
        }}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-brioche" />
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Progress bar height transforms from 0% to 100%
  const progressHeight = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  return (
    <section className="py-16 sm:py-24 bg-flaky relative overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-caveat text-2xl text-brioche mb-1">No Shortcuts. No Exceptions.</p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-4">
            Made From Scratch. Every Day.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient connecting line - background track */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brioche/20 via-brioche to-brioche/20 hidden sm:block" />

          {/* Scroll progress bar */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px hidden sm:block overflow-hidden">
            <motion.div
              className="w-full bg-brioche origin-top"
              style={{ height: progressHeight }}
            />
          </div>

          <div className="space-y-8 sm:space-y-10">
            {steps.map((step, i) => (
              <StepItem key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-5 sm:gap-8 items-start"
    >
      {/* Timeline dot with animations */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <TimelineDot icon={step.icon} isInView={isInView} index={index} />
      </motion.div>

      {/* Content card - slides in from the right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`bg-whipped rounded-xl border border-flaky p-5 sm:p-6 flex-1 group hover:shadow-md hover:shadow-brioche/10 transition-shadow ${step.accentColor} border-l-4`}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-playfair font-bold text-lg sm:text-xl text-espresso">
            {step.title}
          </h3>
          {/* Time badge with slight rotation for handwritten feel */}
          <motion.span
            className="text-xs font-caveat text-brioche bg-brioche/10 px-2.5 py-0.5 rounded-full shrink-0 inline-block"
            initial={{ rotate: -3, opacity: 0, scale: 0.8 }}
            animate={isInView ? { rotate: [-3, 2, -1][index % 3], opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          >
            {step.time}
          </motion.span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
