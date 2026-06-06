'use client';

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/* ─── Product Data ─── */
const products = [
  {
    name: 'Cheese Danish',
    badge: 'Best Seller',
    badgeColor: 'bg-brioche text-whipped',
    price: '$3.95',
    description: 'Our best-selling Danish — rich cream cheese filling in flaky puff pastry',
    emoji: '🥐',
    fresh: true,
    gradient: 'from-amber-100 via-orange-50 to-amber-50',
    steamColor: 'rgba(200,135,58,0.12)',
    glowColor: 'rgba(200,135,58,0.25)',
  },
  {
    name: 'Wagon Wheel Coffeecake',
    badge: 'Signature',
    badgeColor: 'bg-raspberry text-whipped',
    price: '$13.98+',
    description: 'Our legendary 12-inch round coffeecake — 40+ flavors, serves 10-12',
    emoji: '🍰',
    fresh: true,
    gradient: 'from-rose-100 via-pink-50 to-rose-50',
    steamColor: 'rgba(192,51,77,0.10)',
    glowColor: 'rgba(192,51,77,0.20)',
  },
  {
    name: 'French Bread',
    badge: 'Fresh Baked',
    badgeColor: 'bg-herbe text-whipped',
    price: '$4.50',
    description: 'Crispy on the outside, deliciously soft inside — baked fresh daily',
    emoji: '🥖',
    fresh: true,
    gradient: 'from-yellow-100 via-amber-50 to-yellow-50',
    steamColor: 'rgba(200,135,58,0.15)',
    glowColor: 'rgba(200,135,58,0.25)',
  },
  {
    name: 'Carrot Cake',
    badge: 'Customer Favorite',
    badgeColor: 'bg-raspberry-light text-whipped',
    price: '$5.50',
    description: 'Divine carrot cake with rich cream cheese frosting — a Yelp favorite',
    emoji: '🥕',
    fresh: true,
    gradient: 'from-orange-100 via-amber-50 to-orange-50',
    steamColor: 'rgba(200,135,58,0.12)',
    glowColor: 'rgba(200,135,58,0.20)',
  },
  {
    name: 'Chocolate Custard Eclair',
    badge: 'Indulgent',
    badgeColor: 'bg-espresso-light text-whipped',
    price: '$4.25',
    description: 'Rich chocolate glaze over silky custard filling in choux pastry',
    emoji: '🍫',
    fresh: true,
    gradient: 'from-stone-100 via-neutral-50 to-stone-50',
    steamColor: 'rgba(74,53,37,0.10)',
    glowColor: 'rgba(74,53,37,0.18)',
  },
  {
    name: 'Ham & Cheese Croissant',
    badge: 'Savory',
    badgeColor: 'bg-cafe text-whipped',
    price: '$5.95',
    description: 'Buttery flaky croissant stuffed with savory ham and melted cheese',
    emoji: '🥐',
    fresh: true,
    gradient: 'from-amber-100 via-yellow-50 to-amber-50',
    steamColor: 'rgba(139,94,60,0.12)',
    glowColor: 'rgba(139,94,60,0.20)',
  },
  {
    name: 'Cookies Assortment',
    badge: '$1 Tuesday Special',
    badgeColor: 'bg-raspberry text-whipped',
    price: '$1.00',
    description: 'Fresh-baked cookies with perfect balance of flavors — $1 each on Tuesdays!',
    emoji: '🍪',
    fresh: true,
    gradient: 'from-amber-100 via-orange-50 to-amber-50',
    steamColor: 'rgba(200,135,58,0.12)',
    glowColor: 'rgba(200,135,58,0.20)',
    tuesdaySpecial: true,
  },
  {
    name: 'Fruit Danish',
    badge: 'Fresh & Flaky',
    badgeColor: 'bg-herbe text-whipped',
    price: '$3.95',
    description: 'Seasonal fruit atop cream cheese in golden flaky Danish pastry',
    emoji: '🥧',
    fresh: true,
    gradient: 'from-lime-100 via-green-50 to-lime-50',
    steamColor: 'rgba(107,142,107,0.10)',
    glowColor: 'rgba(107,142,107,0.18)',
  },
  {
    name: 'German Chocolate Cake',
    badge: 'Classic',
    badgeColor: 'bg-espresso-light text-whipped',
    price: '$5.75',
    description: 'Rich chocolate layers with coconut-pecan frosting — a timeless classic',
    emoji: '🍫',
    fresh: true,
    gradient: 'from-stone-100 via-neutral-50 to-stone-50',
    steamColor: 'rgba(74,53,37,0.10)',
    glowColor: 'rgba(74,53,37,0.18)',
  },
  {
    name: 'Baklava',
    badge: "Tony's Special",
    badgeColor: 'bg-brioche text-whipped',
    price: '$4.50',
    description: "Tony's handmade baklava — layers of flaky phyllo with honey and nuts",
    emoji: '🍯',
    fresh: true,
    gradient: 'from-amber-100 via-yellow-50 to-amber-50',
    steamColor: 'rgba(200,135,58,0.12)',
    glowColor: 'rgba(200,135,58,0.20)',
  },
];

/* ─── Floating Flour Particles ─── */
function FlourParticles() {
  /* Seeded pseudo-random based on index — deterministic for SSR consistency */
  const particles = useMemo(() => {
    const seed = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${seed(i * 2) * 100}%`,
      size: seed(i * 3 + 1) * 4 + 2,
      delay: seed(i * 5 + 2) * 8,
      duration: seed(i * 7 + 3) * 6 + 8,
      opacity: seed(i * 11 + 4) * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brioche/30"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -400, -800],
            x: [0, Math.sin(p.id) * 30, Math.cos(p.id) * 20],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Steam Effect for Fresh Items ─── */
function SteamEffect({ color }: { color: string }) {
  const streams = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        left: `${30 + i * 20}%`,
        delay: i * 0.6,
        width: 8 + i * 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bottom-2 rounded-full"
          style={{
            left: s.left,
            width: s.width,
            height: 30,
            background: `radial-gradient(ellipse at center, ${color}, transparent)`,
            filter: 'blur(6px)',
          }}
          animate={{
            y: [0, -50, -90],
            opacity: [0, 0.7, 0],
            scaleX: [1, 1.4, 0.6],
            scaleY: [1, 1.2, 0.8],
          }}
          transition={{
            duration: 2.5,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Sparkle Burst on Reveal ─── */
function SparkleBurst({ active }: { active: boolean }) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i / 8) * 360,
        distance: 30 + Math.random() * 20,
      })),
    []
  );

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none">
          {sparks.map((s) => {
            const rad = (s.angle * Math.PI) / 180;
            return (
              <motion.div
                key={s.id}
                className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-brioche"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * s.distance,
                  y: Math.sin(rad) * s.distance,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── 3D Tilt Card with Enhanced Animations ─── */
function TiltCard({
  product,
  index,
  inView,
}: {
  product: (typeof products)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [sparkleDone, setSparkleDone] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });

  /* Parallax emoji offset on hover */
  const emojiX = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });
  const emojiY = useSpring(useTransform(y, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px);
      y.set(py);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  useEffect(() => {
    if (inView && !sparkleDone) {
      const timer = setTimeout(() => setSparkleDone(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [inView, sparkleDone]);

  const isTuesday =
    typeof window !== 'undefined' && new Date().getDay() === 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -15, scale: 0.85 }}
      animate={
        inView
          ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
          : { opacity: 0, y: 80, rotateX: -15, scale: 0.85 }
      }
      transition={{
        delay: index * 0.12,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        scale: { delay: index * 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
      }}
      className="flex-none w-72 sm:w-80 snap-start"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="group relative bg-whipped rounded-2xl border border-flaky shadow-sm overflow-hidden cursor-pointer"
      >
        {/* Animated glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          animate={{
            boxShadow: isHovered
              ? `0 20px 60px -15px ${product.glowColor}, 0 0 30px ${product.glowColor}`
              : '0 1px 3px rgba(0,0,0,0.05)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Glass reflection overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
          <motion.div
            className="absolute -top-full -left-full w-[200%] h-[200%]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 60%, rgba(255,255,255,0) 100%)',
            }}
            animate={
              isHovered
                ? { x: ['0%', '100%'], y: ['0%', '100%'] }
                : { x: '0%', y: '0%' }
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>

        {/* Product image area with gradient */}
        <div
          className={`relative h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
        >
          {/* Steam effect for fresh items */}
          {product.fresh && <SteamEffect color={product.steamColor} />}

          {/* Sparkle burst on first reveal */}
          <SparkleBurst active={inView && !sparkleDone} />

          {/* Parallax emoji */}
          <motion.span
            className="text-7xl select-none relative z-[5]"
            style={{ x: emojiX, y: emojiY, transform: 'translateZ(40px)' }}
            whileHover={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {product.emoji}
          </motion.span>

          {/* Floating badge */}
          <motion.div
            className="absolute top-3 right-3 z-20"
            initial={{ y: -20, opacity: 0, scale: 0.5 }}
            animate={
              inView
                ? { y: 0, opacity: 1, scale: 1 }
                : { y: -20, opacity: 0, scale: 0.5 }
            }
            transition={{
              delay: index * 0.12 + 0.3,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            {product.tuesdaySpecial ? (
              <Badge
                className={`${product.badgeColor} text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm ${
                  isTuesday ? 'animate-wiggle' : ''
                }`}
              >
                {product.badge}
              </Badge>
            ) : product.fresh ? (
              <Badge
                className={`${product.badgeColor} text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm relative overflow-hidden`}
              >
                <Sparkles className="w-3 h-3 mr-0.5" />
                {product.badge}
                <span
                  className="absolute inset-0 animate-shimmer pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)',
                    backgroundSize: '200% auto',
                  }}
                />
              </Badge>
            ) : null}
          </motion.div>

          {/* "Fresh" pulsing indicator */}
          {product.fresh && (
            <motion.div
              className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: index * 0.12 + 0.5, duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[9px] font-semibold text-green-700 uppercase tracking-wider">
                Fresh
              </span>
            </motion.div>
          )}

          {/* Decorative corner swirl */}
          <motion.svg
            className="absolute bottom-0 left-0 w-16 h-16 text-white/20 pointer-events-none"
            viewBox="0 0 64 64"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: index * 0.12 + 0.6, duration: 1.2, ease: 'easeInOut' }}
          >
            <motion.path
              d="M0,64 C0,40 20,20 40,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: index * 0.12 + 0.6, duration: 1.2, ease: 'easeInOut' }}
            />
          </motion.svg>
        </div>

        {/* Product info with animated reveal */}
        <div className="p-5 relative">
          <div className="flex items-start justify-between gap-2 mb-2">
            <motion.h3
              className="font-playfair font-semibold text-lg text-espresso leading-tight"
              initial={{ x: -15, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -15, opacity: 0 }}
              transition={{ delay: index * 0.12 + 0.4, duration: 0.5 }}
            >
              {product.name}
            </motion.h3>

            {/* Swinging price tag */}
            <motion.div
              className="relative origin-top"
              initial={{ rotateZ: -30, opacity: 0, scale: 0.5 }}
              animate={
                inView
                  ? { rotateZ: 0, opacity: 1, scale: 1 }
                  : { rotateZ: -30, opacity: 0, scale: 0.5 }
              }
              transition={{
                delay: index * 0.12 + 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              <div className="relative">
                {/* Tag string */}
                <div className="absolute -top-2 left-1/2 w-px h-2 bg-cafe/30" />
                <span className="font-lora font-bold text-brioche text-lg whitespace-nowrap bg-flaky/60 px-2 py-0.5 rounded-md">
                  {product.price}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.p
            className="text-sm text-muted-foreground leading-relaxed mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ delay: index * 0.12 + 0.6, duration: 0.5 }}
          >
            {product.description}
          </motion.p>

          <motion.div
            className="flex items-center justify-between"
            initial={{ y: 10, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ delay: index * 0.12 + 0.7, duration: 0.5 }}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ y: 5, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: 5, opacity: 0 }}
                  transition={{
                    delay: index * 0.12 + 0.8 + j * 0.05,
                    duration: 0.3,
                  }}
                >
                  <Star className="w-3 h-3 fill-brioche text-brioche" />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="flex items-center gap-1 text-xs text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-3 h-3" />
              <span className="font-source">Baked today</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom shelf shadow line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-flaky to-transparent opacity-60" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated Progress Bar ─── */
function ScrollProgressBar({
  activeIndex,
  total,
  onDotClick,
}: {
  activeIndex: number;
  total: number;
  onDotClick: (idx: number) => void;
}) {
  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  return (
    <div className="flex items-center gap-3 mt-8">
      {/* Left decorative line */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-flaky" />

      {/* Progress track */}
      <div className="relative flex items-center gap-2">
        {/* Background track */}
        <div className="absolute h-0.5 bg-flaky rounded-full" style={{ left: 4, right: 4 }} />

        {/* Animated progress fill */}
        <motion.div
          className="absolute h-0.5 bg-brioche rounded-full"
          animate={{ left: 4, width: `${Math.max(progress * 100, 8)}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ right: 4 }}
        />

        {/* Dots */}
        {Array.from({ length: total }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => onDotClick(i)}
            className={`relative z-10 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-brioche shadow-md shadow-brioche/30'
                : 'bg-cafe/20 hover:bg-cafe/40'
            }`}
            animate={{
              width: i === activeIndex ? 28 : 8,
              height: 8,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            aria-label={`Go to product ${i + 1}`}
          />
        ))}
      </div>

      {/* Right decorative line */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-flaky" />
    </div>
  );
}

/* ─── Main DisplayCase Component ─── */
export default function DisplayCase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isTuesday = typeof window !== 'undefined' && new Date().getDay() === 2;

  const CARD_WIDTH = 336; // card width + gap
  const totalCards = products.length;

  /* Auto-scroll with pause on hover */
  useEffect(() => {
    if (!isAutoScrolling || !scrollRef.current) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 10) {
        // Loop back to start smoothly
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    setIsAutoScrolling(false);
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -CARD_WIDTH : CARD_WIDTH,
      behavior: 'smooth',
    });
    // Resume auto-scroll after 8 seconds of inactivity
    setTimeout(() => setIsAutoScrolling(true), 8000);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const idx = Math.round(progress * (totalCards - 1));
    setActiveIndex(idx);
    setScrollProgress(progress);
  }, [totalCards]);

  const scrollToIndex = useCallback((idx: number) => {
    if (!scrollRef.current) return;
    setIsAutoScrolling(false);
    const target = idx * CARD_WIDTH;
    scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
    setTimeout(() => setIsAutoScrolling(true), 8000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-parchment overflow-hidden"
    >
      {/* Background floating particles */}
      <FlourParticles />

      {/* Decorative top border - counter edge */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brioche/20 via-brioche/40 to-brioche/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <motion.p
              className="font-caveat text-2xl sm:text-3xl text-brioche mb-1 flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brioche opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brioche" />
              </span>
              Fresh From The Oven
            </motion.p>
            <motion.h2
              className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-espresso"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Today&apos;s Display Case
            </motion.h2>
            <motion.div
              className="mt-2 h-0.5 bg-gradient-to-r from-brioche via-brioche/60 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: 120 } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-cafe/30 text-cafe hover:bg-flaky hover:text-brioche hover:border-brioche/40 transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-cafe/30 text-cafe hover:bg-flaky hover:text-brioche hover:border-brioche/40 transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Tuesday banner */}
        <AnimatePresence>
          {isTuesday && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-6 p-3 bg-raspberry/10 border border-raspberry/20 rounded-xl text-center relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-raspberry/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <p className="font-caveat text-xl text-raspberry font-bold relative z-10">
                🎉 It&apos;s $1 Tuesday — All cookies just $1 each!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display case glass frame */}
        <motion.div
          className="relative rounded-2xl border-2 border-flaky/60 bg-whipped/30 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Glass top reflection */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/20 to-transparent z-10 pointer-events-none" />

          {/* Horizontal scroll carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={() => setIsAutoScrolling(false)}
            onTouchEnd={() => {
              setTimeout(() => setIsAutoScrolling(true), 5000);
            }}
            className="flex gap-5 overflow-x-auto py-6 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, i) => (
              <TiltCard
                key={product.name}
                product={product}
                index={i}
                inView={inView}
              />
            ))}
          </div>

          {/* Shelf bottom gradient */}
          <div className="h-3 bg-gradient-to-b from-espresso/5 to-espresso/10 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-espresso/10 to-transparent" />
          </div>

          {/* Left/right fade indicators */}
          <div className="absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-whipped/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-whipped/80 to-transparent z-10 pointer-events-none" />
        </motion.div>

        {/* Animated progress bar */}
        <ScrollProgressBar
          activeIndex={activeIndex}
          total={totalCards}
          onDotClick={scrollToIndex}
        />

        {/* Auto-scroll indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex gap-0.5"
            animate={isAutoScrolling ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-brioche"
                animate={
                  isAutoScrolling
                    ? { y: [0, -3, 0] }
                    : { y: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
          <span className="text-xs text-muted-foreground/60 font-source">
            {isAutoScrolling ? 'Auto-scrolling' : 'Paused'}
          </span>
        </motion.div>

        {/* Mobile scroll hint */}
        <motion.p
          className="sm:hidden text-center text-xs text-muted-foreground mt-2 font-caveat text-lg"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ← Swipe to explore →
        </motion.p>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brioche/20 to-transparent" />
    </section>
  );
}
