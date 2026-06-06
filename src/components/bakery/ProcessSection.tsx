'use client';

import { motion } from 'framer-motion';
import { Wheat, Blend, Flame, Store, Heart } from 'lucide-react';

const steps = [
  {
    icon: Wheat,
    title: 'Premium Ingredients',
    description: 'We source the finest flour, butter, and ingredients — no shortcuts, no compromises.',
    time: 'Always',
  },
  {
    icon: Blend,
    title: 'Mixed Fresh Every Morning',
    description: 'Our bakers arrive at 4 AM to prepare every dough, batter, and filling from scratch.',
    time: '4:00 AM',
  },
  {
    icon: Flame,
    title: 'Baked in Small Batches',
    description: 'Throughout the day, we bake in small batches to ensure everything is perfectly fresh.',
    time: 'All Day',
  },
  {
    icon: Store,
    title: 'On the Shelf by 7 AM',
    description: 'Fresh breads and pastries are ready for you when we open our doors each morning.',
    time: '7:00 AM',
  },
  {
    icon: Heart,
    title: 'Made with 36 Years of Love',
    description: 'Every item carries decades of baking tradition, community trust, and genuine care.',
    time: 'Since 1988',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-24 bg-flaky">
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
          {/* Connecting line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brioche/20 via-brioche to-brioche/20 hidden sm:block" />

          <div className="space-y-8 sm:space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative flex gap-5 sm:gap-8 items-start"
              >
                {/* Timeline dot */}
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-whipped border-2 border-brioche flex items-center justify-center shadow-md">
                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-brioche" />
                  </div>
                </div>

                {/* Content */}
                <div className="bg-whipped rounded-xl border border-flaky p-5 sm:p-6 flex-1 group hover:shadow-md hover:shadow-brioche/10 transition-shadow">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-playfair font-bold text-lg sm:text-xl text-espresso">
                      {step.title}
                    </h3>
                    <span className="text-xs font-caveat text-brioche bg-brioche/10 px-2 py-0.5 rounded-full shrink-0">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
