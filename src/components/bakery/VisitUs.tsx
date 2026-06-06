'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Car, Navigation, Star, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const hours = [
  { day: 'Monday', hours: '7:00 AM – 6:00 PM', open: true },
  { day: 'Tuesday', hours: '7:00 AM – 6:00 PM', open: true },
  { day: 'Wednesday', hours: '7:00 AM – 6:00 PM', open: true },
  { day: 'Thursday', hours: '7:00 AM – 6:00 PM', open: true },
  { day: 'Friday', hours: '7:00 AM – 6:00 PM', open: true },
  { day: 'Saturday', hours: '7:00 AM – 5:00 PM', open: true },
  { day: 'Sunday', hours: 'Closed', open: false },
];

export default function VisitUs() {
  const today = new Date().getDay(); // 0 = Sunday
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0 format

  return (
    <section id="visit" className="py-16 sm:py-24 bg-whipped">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-caveat text-2xl text-brioche mb-1">Come Say Bonjour</p>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl text-espresso mb-4">
            Visit Us in Costa Mesa
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-flaky rounded-2xl overflow-hidden border border-flaky shadow-sm h-full min-h-[350px] lg:min-h-[450px]">
              {/* Stylized map placeholder */}
              <div className="relative h-full bg-gradient-to-br from-herbe/5 via-flaky to-brioche/5 flex items-center justify-center p-8">
                {/* Decorative map elements */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                    <path d="M50 200 Q100 100 200 150 T350 200" stroke="#C8873A" strokeWidth="2" fill="none" />
                    <path d="M100 50 Q150 200 100 350" stroke="#8B5E3C" strokeWidth="1.5" fill="none" />
                    <path d="M200 30 Q250 150 200 370" stroke="#6B8E6B" strokeWidth="1" fill="none" />
                    <path d="M300 50 Q280 200 320 350" stroke="#C8873A" strokeWidth="1.5" fill="none" />
                    <circle cx="200" cy="200" r="5" fill="#C0334D" />
                    <circle cx="150" cy="150" r="3" fill="#8B5E3C" />
                    <circle cx="280" cy="250" r="3" fill="#6B8E6B" />
                  </svg>
                </div>

                {/* Location pin */}
                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-4"
                  >
                    <span className="text-6xl">🥐</span>
                  </motion.div>
                  <h3 className="font-playfair font-bold text-xl text-espresso mb-1">
                    French&apos;s Pastry & Bakery
                  </h3>
                  <p className="text-sm text-muted-foreground">Mesa-North Shopping Center</p>
                  <p className="text-sm text-muted-foreground">Costa Mesa, CA 92626</p>

                  <Button
                    asChild
                    className="mt-4 bg-brioche hover:bg-brioche-dark text-whipped rounded-full"
                    size="sm"
                  >
                    <a
                      href="https://maps.google.com/?q=French%27s+Bakery+Costa+Mesa+CA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Address & Phone */}
            <div className="bg-parchment rounded-xl border border-flaky p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brioche shrink-0 mt-0.5" />
                  <div>
                    <p className="font-lora font-semibold text-espresso">Address</p>
                    <p className="text-sm text-muted-foreground">
                      1170 W. Baker St, Suite B
                      <br />
                      Costa Mesa, CA 92626
                    </p>
                    <p className="text-xs text-cafe mt-1">Mesa-North Shopping Center</p>
                  </div>
                </div>

                <div className="h-px bg-flaky" />

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brioche shrink-0 mt-0.5" />
                  <div>
                    <p className="font-lora font-semibold text-espresso">Phone</p>
                    <a
                      href="tel:7145466386"
                      className="text-sm text-brioche hover:text-brioche-dark transition-colors font-semibold"
                    >
                      (714) 546-6386
                    </a>
                  </div>
                </div>

                <div className="h-px bg-flaky" />

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-brioche shrink-0 mt-0.5" />
                  <div>
                    <p className="font-lora font-semibold text-espresso">Parking</p>
                    <p className="text-sm text-muted-foreground">
                      Free parking available in Mesa-North Shopping Center lot
                    </p>
                  </div>
                </div>

                <div className="h-px bg-flaky" />

                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-brioche shrink-0 mt-0.5" />
                  <div>
                    <p className="font-lora font-semibold text-espresso">Payment</p>
                    <p className="text-sm text-muted-foreground">
                      All major credit cards accepted
                    </p>
                    <p className="text-xs text-cafe mt-0.5">Visa • Mastercard • Amex • Discover</p>
                  </div>
                </div>

                <div className="h-px bg-flaky" />

                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-brioche shrink-0 mt-0.5" />
                  <div>
                    <p className="font-lora font-semibold text-espresso">TripAdvisor</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(4)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-brioche text-brioche" />
                      ))}
                    </div>
                    <p className="text-xs text-cafe mt-0.5">4.0 stars • 13 reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-parchment rounded-xl border border-flaky p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-brioche" />
                <h3 className="font-lora font-semibold text-espresso">Business Hours</h3>
              </div>
              <div className="space-y-2">
                {hours.map((day, i) => (
                  <div
                    key={day.day}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-sm ${
                      i === todayIndex
                        ? 'bg-brioche/10 font-semibold'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          i === todayIndex && day.open
                            ? 'bg-herbe'
                            : day.open
                            ? 'bg-flaky'
                            : 'bg-muted'
                        }`}
                      />
                      <span className={i === todayIndex ? 'text-espresso' : 'text-muted-foreground'}>
                        {day.day}
                        {i === todayIndex && (
                          <span className="text-xs text-brioche ml-1">(Today)</span>
                        )}
                      </span>
                    </div>
                    <span
                      className={
                        day.open
                          ? i === todayIndex
                            ? 'text-espresso font-semibold'
                            : 'text-muted-foreground'
                          : 'text-muted-foreground/50'
                      }
                    >
                      {day.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
