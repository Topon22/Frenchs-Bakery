'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: 'tweav',
    location: 'Aliso Viejo',
    rating: 5,
    text: 'We always get cakes for special occasions from French\'s. Their cakes are a bit pricey, but worth every penny. They have a selection to choose from on display, but we always special order.',
    product: 'Custom Cakes',
    source: 'YellowPages',
  },
  {
    name: 'Rebecca W.',
    location: 'Costa Mesa',
    rating: 5,
    text: 'We came for the cookies. We loved them all. Fresh, baked to right consistency, perfect balance of flavors and served with a smile.',
    product: 'Cookies',
    source: 'Yelp',
  },
  {
    name: 'Hairycalgrad',
    location: 'Temecula',
    rating: 5,
    text: 'Go on a Tuesday for the $1.00 cupcakes, they are the best.',
    product: 'Tuesday Cupcakes',
    source: 'Yelp',
  },
  {
    name: 'Tinaray107',
    location: 'Utah',
    rating: 5,
    text: 'This is by far the best bakery for goodies. Cookies, pastries, cakes. Outrageously delectable.',
    product: 'Pastries & Cakes',
    source: 'TripAdvisor',
  },
  {
    name: 'auroracoleman09',
    location: 'Costa Mesa',
    rating: 5,
    text: 'This bakery is one of a kind and has the best selection of Cheese Danishes.',
    product: 'Cheese Danishes',
    source: 'Yelp',
  },
  {
    name: 'Yelp Reviewer',
    location: 'Costa Mesa',
    rating: 5,
    text: 'Through the years my wife has had several cakes from French\'s and they have all been delicious. The staff is always friendly, helpful and accommodating.',
    product: 'Custom Cakes',
    source: 'Yelp',
  },
  {
    name: 'Yelp Reviewer',
    location: 'Orange County',
    rating: 5,
    text: 'The desserts are wonderful! My favorite by far is the carrot cake. We also purchased German chocolate cake.',
    product: 'Carrot Cake',
    source: 'Yelp',
  },
  {
    name: 'TripAdvisor Reviewer',
    location: '',
    rating: 5,
    text: 'The French Bread was crispy on the outside and deliciously soft inside. Customer service was extremely nice, samples were offered.',
    product: 'French Bread',
    source: 'TripAdvisor',
  },
  {
    name: 'YellowPages Reviewer',
    location: '',
    rating: 5,
    text: 'The bakery has a \'happy hour\' during the week where they have great deals on items.',
    product: 'Custom Cakes',
    source: 'YellowPages',
  },
];

function AnimatedStars({ rating, inView }: { rating: number; inView: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            delay: i * 0.12,
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
        >
          <Star
            className={`w-4 h-4 ${
              i < rating
                ? 'fill-brioche text-brioche'
                : 'fill-flaky text-flaky'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

function TestimonialCard({
  review,
  index,
}: {
  review: typeof testimonials[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className="glass-card rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-brioche/10 transition-shadow duration-300 relative"
    >
      {/* Gradient border on left side */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brioche via-raspberry to-cafe rounded-l-xl" />

      <div className="p-6 pl-7">
        {/* Quote icon */}
        <Quote className="w-8 h-8 text-brioche/20 mb-3 group-hover:text-brioche/40 transition-colors" />

        {/* Review text */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Stars */}
        <div className="mb-4">
          <AnimatedStars rating={review.rating} inView={isInView} />
        </div>

        {/* Reviewer info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-lora font-semibold text-espresso text-sm">{review.name}</p>
            {review.location && (
              <p className="text-xs text-muted-foreground">{review.location}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-brioche bg-brioche/10 px-2 py-0.5 rounded-full font-medium">
              {review.product}
            </span>
            <span className="text-[10px] text-cafe bg-cafe/10 px-1.5 py-0.5 rounded-full">
              {review.source}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Determine how many cards to show based on viewport
  const getCardsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(getCardsPerView());
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, [getCardsPerView]);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, maxIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Get visible testimonials for carousel
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerView);
  // If near end and not enough cards, wrap around
  const needsWrap = currentIndex + cardsPerView > testimonials.length;
  const wrappedTestimonials = needsWrap
    ? [...visibleTestimonials, ...testimonials.slice(0, (currentIndex + cardsPerView) - testimonials.length)]
    : visibleTestimonials;

  const totalDots = maxIndex + 1;

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 bg-parchment relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brioche/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-raspberry/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-caveat text-2xl text-brioche mb-1">What Our Community Says</p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-6">
            Loved by Costa Mesa
          </h2>

          {/* Yelp Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-whipped/80 backdrop-blur-sm border border-flaky rounded-full px-5 py-2.5 shadow-sm"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 3
                      ? 'fill-raspberry text-raspberry'
                      : i < 4
                      ? 'fill-raspberry/60 text-raspberry/60'
                      : 'fill-flaky text-flaky'
                  }`}
                />
              ))}
            </div>
            <span className="font-source font-semibold text-espresso text-sm">
              3.4 on Yelp
            </span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">399+ reviews</span>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 bg-whipped/90 backdrop-blur-sm border-flaky hover:bg-brioche hover:text-whipped hover:border-brioche rounded-full shadow-lg transition-all duration-200 h-10 w-10"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Right arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 bg-whipped/90 backdrop-blur-sm border-flaky hover:bg-brioche hover:text-whipped hover:border-brioche rounded-full shadow-lg transition-all duration-200 h-10 w-10"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Cards container */}
          <div className="overflow-hidden mx-6 sm:mx-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
                }}
              >
                {wrappedTestimonials.map((review, i) => (
                  <TestimonialCard
                    key={`${currentIndex}-${i}`}
                    review={review}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? 'w-8 h-3 bg-brioche'
                  : 'w-3 h-3 bg-flaky hover:bg-cafe/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Auto-rotate indicator */}
        <div className="flex items-center justify-center mt-4 gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isPaused ? 'bg-cafe/40' : 'bg-herbe animate-pulse'
            }`}
          />
          <span className="text-xs text-muted-foreground">
            {isPaused ? 'Paused' : 'Auto-rotating every 5s'}
          </span>
        </div>
      </div>
    </section>
  );
}
