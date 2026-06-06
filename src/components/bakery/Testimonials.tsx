'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Costa Mesa regular since 2008',
    rating: 5,
    text: 'The Wagon-Wheel Coffeecake is a weekly tradition in our house. I\'ve tried the cinnamon, blueberry, and pumpkin spice — they\'re all incredible. French\'s is truly a Costa Mesa treasure.',
    product: 'Wagon-Wheel Coffeecake',
  },
  {
    name: 'David L.',
    location: 'Newport Beach',
    rating: 5,
    text: 'We ordered a custom wedding cake and it exceeded all expectations. The team was so accommodating and the cake was absolutely stunning. Our guests are still talking about it!',
    product: 'Custom Wedding Cake',
  },
  {
    name: 'Maria G.',
    location: 'Costa Mesa regular since 2015',
    rating: 5,
    text: 'I brought in my grandmother\'s recipe for her famous tres leches cake and they nailed it perfectly. The "Bring Your Recipe" service is such a special and unique offering.',
    product: 'Bring Your Recipe',
  },
  {
    name: 'Tom R.',
    location: 'Huntington Beach',
    rating: 5,
    text: 'Best croissants in Orange County, hands down. Flaky, buttery perfection every single time. I drive 20 minutes just for their almond croissant and it\'s worth every minute.',
    product: 'Almond Croissant',
  },
  {
    name: 'Jennifer K.',
    location: 'Costa Mesa regular since 2012',
    rating: 5,
    text: 'French\'s Bakery has been part of our family\'s celebrations for over a decade. From birthday cakes to holiday pies — everything is made with such care and quality.',
    product: 'Birthday Cakes',
  },
  {
    name: 'Mike P.',
    location: 'Irvine',
    rating: 5,
    text: 'Their sourdough boule is incredible — crispy crust, tangy interior. And the restaurant menu is a hidden gem. The French onion soup is the best I\'ve had outside of Paris.',
    product: 'Sourdough Boule',
  },
];

export default function Testimonials() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-caveat text-2xl text-brioche mb-1">What Our Community Says</p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-4">
            Loved by Costa Mesa
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-whipped rounded-xl border border-flaky p-6 hover:shadow-lg hover:shadow-brioche/5 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-brioche/20 mb-3 group-hover:text-brioche/40 transition-colors" />

              {/* Review text */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brioche text-brioche" />
                ))}
              </div>

              {/* Reviewer */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-lora font-semibold text-espresso text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </div>
                <span className="text-xs text-brioche bg-brioche/10 px-2 py-0.5 rounded-full font-medium">
                  {review.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
