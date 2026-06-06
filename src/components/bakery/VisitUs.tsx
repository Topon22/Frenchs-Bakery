'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Navigation,
  Star,
  CreditCard,
  Accessibility,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const hours = [
  { day: 'Monday', short: 'Mon', hours: '7:00 AM – 6:00 PM', open: '07:00', close: '18:00' },
  { day: 'Tuesday', short: 'Tue', hours: '7:00 AM – 6:00 PM', open: '07:00', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', hours: '7:00 AM – 6:00 PM', open: '07:00', close: '18:00' },
  { day: 'Thursday', short: 'Thu', hours: '7:00 AM – 6:00 PM', open: '07:00', close: '18:00' },
  { day: 'Friday', short: 'Fri', hours: '7:00 AM – 6:00 PM', open: '07:00', close: '18:00' },
  { day: 'Saturday', short: 'Sat', hours: '7:00 AM – 5:00 PM', open: '07:00', close: '17:00' },
  { day: 'Sunday', short: 'Sun', hours: 'Closed', open: null, close: null },
];

function getBusinessStatus() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday
  const todayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const todayHours = hours[todayIndex];

  if (!todayHours.open || !todayHours.close) {
    return { isOpen: false, todayIndex, statusText: 'Closed Today' };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  return {
    isOpen,
    todayIndex,
    statusText: isOpen ? 'Open Now' : 'Closed',
  };
}

export default function VisitUs() {
  const { isOpen, todayIndex, statusText } = getBusinessStatus();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to avoid synchronous setState in effect
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="visit" className="py-16 sm:py-24 bg-whipped relative">
      {/* Floating "Now Open" Badge */}
      <AnimatePresence>
        {mounted && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-24 right-6 z-30"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-herbe/30 rounded-full blur-md animate-pulse" />
              <div className="relative bg-herbe text-whipped text-sm font-semibold px-4 py-2 rounded-full shadow-lg shadow-herbe/30 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whipped opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-whipped" />
                </span>
                Now Open
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          {/* Open/Closed status under header */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
                isOpen
                  ? 'bg-herbe/10 text-herbe'
                  : 'bg-raspberry/10 text-raspberry'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpen ? 'bg-herbe animate-pulse' : 'bg-raspberry'
                }`}
              />
              {statusText}
            </motion.div>
          )}
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
            <div className="rounded-2xl overflow-hidden border border-flaky shadow-lg h-full min-h-[350px] lg:min-h-[500px]">
              <iframe
                src="https://maps.google.com/maps?q=French%27s+Bakery+1170+Baker+St+Costa+Mesa+CA+92626&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="French's Pastry & Bakery Location"
                className="w-full h-full min-h-[350px] lg:min-h-[500px]"
              />
            </div>

            {/* Map overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 sm:bottom-6 glass-card rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brioche/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brioche" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-lora font-semibold text-espresso text-sm truncate">
                      French&apos;s Pastry & Bakery
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      1170 Baker St, Suite B, Costa Mesa
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="bg-brioche hover:bg-brioche-dark text-whipped rounded-full shrink-0"
                >
                  <a
                    href="https://maps.google.com/?q=French%27s+Bakery+1170+Baker+St+Costa+Mesa+CA+92626"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    Directions
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Info area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Address, Phone & CTA */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-parchment rounded-xl border border-flaky p-6 hover:shadow-md hover:shadow-brioche/5 transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brioche shrink-0 mt-0.5" />
                  <div>
                    <p className="font-lora font-semibold text-espresso">Address</p>
                    <p className="text-sm text-muted-foreground">
                      1170 Baker St, Suite B
                      <br />
                      Costa Mesa, CA 92626
                    </p>
                    <p className="text-xs text-cafe mt-1">Mesa-North Shopping Center</p>
                  </div>
                </div>

                <div className="h-px bg-flaky" />

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brioche shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-lora font-semibold text-espresso">Phone</p>
                    <a
                      href="tel:7145466386"
                      className="text-sm text-brioche hover:text-brioche-dark transition-colors font-semibold"
                    >
                      (714) 546-6386
                    </a>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    asChild
                    className="bg-brioche hover:bg-brioche-dark text-whipped rounded-full flex-1 min-w-[140px]"
                  >
                    <a href="tel:7145466386">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-brioche text-brioche hover:bg-brioche hover:text-whipped rounded-full flex-1 min-w-[140px]"
                  >
                    <a
                      href="https://maps.google.com/?q=French%27s+Bakery+1170+Baker+St+Costa+Mesa+CA+92626"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-parchment rounded-xl border border-flaky p-6 hover:shadow-md hover:shadow-brioche/5 transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-brioche" />
                <h3 className="font-lora font-semibold text-espresso">Business Hours</h3>
                {mounted && (
                  <span
                    className={`ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isOpen
                        ? 'bg-herbe/10 text-herbe'
                        : 'bg-raspberry/10 text-raspberry'
                    }`}
                  >
                    {statusText}
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                {hours.map((day, i) => {
                  const isToday = i === todayIndex;
                  const isClosedDay = day.open === null;

                  return (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors duration-300 ${
                        isToday
                          ? 'bg-brioche/10 ring-1 ring-brioche/20'
                          : 'hover:bg-flaky/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Glowing indicator for today */}
                        <span className="relative flex h-2.5 w-2.5">
                          {isToday && !isClosedDay && mounted && isOpen && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-herbe opacity-75" />
                          )}
                          <span
                            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                              isToday
                                ? isClosedDay
                                  ? 'bg-raspberry'
                                  : isOpen
                                  ? 'bg-herbe'
                                  : 'bg-brioche'
                                : isClosedDay
                                ? 'bg-muted'
                                : 'bg-flaky'
                            }`}
                          />
                        </span>
                        <span
                          className={
                            isToday
                              ? 'text-espresso font-semibold'
                              : 'text-muted-foreground'
                          }
                        >
                          {day.day}
                          {isToday && (
                            <span className="text-xs text-brioche ml-1.5 font-semibold">
                              (Today)
                            </span>
                          )}
                        </span>
                      </div>
                      <span
                        className={
                          isClosedDay
                            ? 'text-muted-foreground/50'
                            : isToday
                            ? 'text-espresso font-semibold'
                            : 'text-muted-foreground'
                        }
                      >
                        {day.hours}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Amenities & Info row */}
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Parking & Accessibility */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-parchment rounded-xl border border-flaky p-5 hover:shadow-md hover:shadow-brioche/5 transition-shadow duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Car className="w-4 h-4 text-brioche shrink-0 mt-0.5" />
                    <div>
                      <p className="font-lora font-semibold text-espresso text-sm">Parking</p>
                      <p className="text-xs text-muted-foreground">
                        Free parking in shopping center lot
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-flaky" />

                  <div className="flex items-start gap-3">
                    <Accessibility className="w-4 h-4 text-herbe shrink-0 mt-0.5" />
                    <div>
                      <p className="font-lora font-semibold text-espresso text-sm">Accessibility</p>
                      <p className="text-xs text-muted-foreground">Wheelchair accessible</p>
                    </div>
                  </div>

                  <div className="h-px bg-flaky" />

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-4 h-4 text-brioche shrink-0 mt-0.5" />
                    <div>
                      <p className="font-lora font-semibold text-espresso text-sm">Payment</p>
                      <p className="text-xs text-muted-foreground">
                        Visa · Mastercard · Amex · Discover
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ratings & Delivery */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-parchment rounded-xl border border-flaky p-5 hover:shadow-md hover:shadow-brioche/5 transition-shadow duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-brioche shrink-0 mt-0.5" />
                    <div>
                      <p className="font-lora font-semibold text-espresso text-sm">TripAdvisor</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(4)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-brioche text-brioche" />
                        ))}
                      </div>
                      <p className="text-xs text-cafe mt-0.5">4.0 stars · 13 reviews</p>
                    </div>
                  </div>

                  <div className="h-px bg-flaky" />

                  {/* Delivery Platforms */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-brioche shrink-0" />
                      <p className="font-lora font-semibold text-espresso text-sm">
                        Also available on
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://www.grubhub.com/restaurant/frenchs-pastry-bakery-1170-w-baker-st-costa-mesa/2233906"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-whipped border border-flaky rounded-lg px-3 py-2 hover:border-brioche hover:shadow-sm transition-all duration-200"
                      >
                        <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
                          <span className="text-white font-bold text-[10px]">GH</span>
                        </div>
                        <span className="text-xs font-semibold text-espresso">GrubHub</span>
                      </a>
                      <a
                        href="https://www.doordash.com/store/french-s-pastry-bakery-costa-mesa-2233906/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-whipped border border-flaky rounded-lg px-3 py-2 hover:border-brioche hover:shadow-sm transition-all duration-200"
                      >
                        <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center">
                          <span className="text-white font-bold text-[10px]">DD</span>
                        </div>
                        <span className="text-xs font-semibold text-espresso">DoorDash</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
