'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const milestones = [
  { year: '1965', event: 'French\'s Pastry opens its doors in Costa Mesa\'s Mesa-North Shopping Center' },
  { year: '1972', event: 'The Wagon Wheel Coffeecake becomes a local phenomenon' },
  { year: '1985', event: 'Expanded to offer full restaurant dining alongside the bakery' },
  { year: '1998', event: 'Introduced "Bring Your Recipe" — custom baking from family recipes' },
  { year: '2010', event: 'Wagon Wheel Coffeecake flavor count surpasses 40 varieties' },
  { year: '2024', event: '60 years and still baking fresh every morning — a Costa Mesa institution' },
];

export default function Community() {
  return (
    <section id="our-story" className="py-16 sm:py-24 bg-espresso text-whipped relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">🌾</div>
        <div className="absolute bottom-10 right-10 text-9xl">🌿</div>
      </div>

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
              Est. 1965
            </Badge>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-whipped mb-6 leading-tight">
              60 Years of Baking Fresh in Costa Mesa
            </h2>
            <div className="space-y-4 text-flaky/70 leading-relaxed">
              <p className="font-cormorant italic text-xl text-brioche-light">
                &ldquo;What started as a single bakery on Baker Street grew into one of Orange
                County&apos;s most cherished culinary institutions.&rdquo;
              </p>
              <p>
                French&apos;s Bakery was born from a love of honest, artisan baking. We believe that
                food made by hand, from real ingredients, with real care — tastes like nothing else
                in the world.
              </p>
              <p>
                For over 60 years, Costa Mesa has agreed. Our ovens have been warm every single
                morning since 1965, and our commitment to freshness, quality, and community has
                never wavered.
              </p>
            </div>

            {/* Bring Your Recipe callout */}
            <div className="mt-8 bg-brioche/10 rounded-xl p-6 border border-brioche/20">
              <p className="font-caveat text-2xl text-brioche-light mb-2">
                📝 Bring Us Your Recipe
              </p>
              <p className="text-sm text-flaky/60">
                Have a cherished family recipe? A childhood favorite? Bring it to us and we&apos;ll
                bake it to perfection. It&apos;s our way of honoring the tradition of homemade baking
                — and the stories that come with it.
              </p>
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
            <div className="space-y-6">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex gap-4 items-start group"
                >
                  <div className="shrink-0 w-16 text-right">
                    <span className="font-playfair font-bold text-lg text-brioche group-hover:text-brioche-light transition-colors">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="relative flex-1">
                    {/* Timeline dot */}
                    <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-brioche border-2 border-espresso" />
                    <p className="text-sm text-flaky/70 leading-relaxed pl-2">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
