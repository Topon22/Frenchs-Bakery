'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'tweav',
    location: 'Aliso Viejo',
    rating: 5,
    text: 'We always get cakes for special occasions from French\'s. Their cakes are a bit pricey, but worth every penny.',
    product: 'Custom Cakes',
  },
  {
    name: 'Rebecca W.',
    location: 'Costa Mesa',
    rating: 5,
    text: 'We came for the cookies. We loved them all. Fresh, baked to right consistency, perfect balance of flavors and served with a smile.',
    product: 'Cookies',
  },
  {
    name: 'Hairycalgrad',
    location: 'Temecula',
    rating: 5,
    text: 'Go on a Tuesday for the $1.00 cupcakes, they are the best.',
    product: 'Tuesday Cupcakes',
  },
  {
    name: 'Tinaray107',
    location: 'Utah',
    rating: 4,
    text: 'This is by far the best bakery for goodies. Cookies, pastries, cakes. Outrageously delectable.',
    product: 'Pastries & Cakes',
  },
  {
    name: 'auroracoleman09',
    location: 'Costa Mesa',
    rating: 5,
    text: 'This bakery is one of a kind and has the best selection of Cheese Danishes.',
    product: 'Cheese Danishes',
  },
  {
    name: 'Yelp Reviewer',
    location: 'Costa Mesa',
    rating: 5,
    text: 'Through the years my wife has had several cakes from French\'s and they have all been delicious. The staff is always friendly, helpful and accommodating.',
    product: 'Custom Cakes',
  },
  {
    name: 'Yelp Reviewer',
    location: 'Orange County',
    rating: 5,
    text: 'The desserts are wonderful! We purchased carrot cake & it was divine. We also purchased German chocolate cake.',
    product: 'Carrot Cake',
  },
  {
    name: 'Yelp Reviewer',
    location: 'Costa Mesa',
    rating: 5,
    text: 'Additionally, the French Bread was crispy on the outside and deliciously soft inside. Customer service was extremely nice, samples were offered.',
    product: 'French Bread',
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
