'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openOrderForm } from '@/lib/order-events';

/* ────────────────────────────────────────────
   Business-hours helper
   ──────────────────────────────────────────── */
function useIsOpen() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay(); // 0=Sun
      const h = now.getHours();
      const m = now.getMinutes();
      const t = h * 60 + m; // minutes since midnight (local)

      if (day === 0) {
        // Sunday — closed
        setIsOpen(false);
      } else if (day >= 1 && day <= 5) {
        // Mon-Fri 7:00 – 18:00
        setIsOpen(t >= 420 && t < 1080);
      } else {
        // Sat 7:00 – 17:00
        setIsOpen(t >= 420 && t < 1020);
      }
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return isOpen;
}

/* ────────────────────────────────────────────
   Animated variants
   ──────────────────────────────────────────── */
const badgeVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const subVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 1.5 + i * 0.15,
    },
  }),
};

const hoursVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 2 } },
};

/* ────────────────────────────────────────────
   Flour-dust particle config
   ──────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

function useParticles(count: number): Particle[] {
  return useMemo(() => {
    const seed = (n: number) => {
      // deterministic-ish pseudo-random per index
      let x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seed(i) * 100,
      size: 2 + seed(i + 50) * 4,
      duration: 8 + seed(i + 100) * 8,
      delay: seed(i + 200) * 10,
      drift: (seed(i + 300) - 0.5) * 40,
      opacity: 0.15 + seed(i + 400) * 0.35,
    }));
  }, [count]);
}

/* ────────────────────────────────────────────
   Wheat / flour decorative SVG shapes
   ──────────────────────────────────────────── */
function WheatStalk({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 60 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Stem */}
      <path d="M30 180 Q28 90 30 0" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      {/* Wheat berries */}
      <ellipse cx="30" cy="20" rx="5" ry="12" fill="currentColor" opacity="0.2" transform="rotate(-15 30 20)" />
      <ellipse cx="30" cy="45" rx="5" ry="12" fill="currentColor" opacity="0.18" transform="rotate(10 30 45)" />
      <ellipse cx="30" cy="70" rx="5" ry="12" fill="currentColor" opacity="0.15" transform="rotate(-8 30 70)" />
      <ellipse cx="30" cy="95" rx="5" ry="12" fill="currentColor" opacity="0.12" transform="rotate(12 30 95)" />
      {/* Whiskers */}
      <path d="M30 8 Q18 -2 10 0" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <path d="M30 8 Q42 -2 50 0" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <path d="M30 33 Q20 26 14 28" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
      <path d="M30 33 Q40 26 46 28" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    </svg>
  );
}

/* ────────────────────────────────────────────
   Hero Component
   ──────────────────────────────────────────── */
export default function Hero() {
  const isOpen = useIsOpen();
  const particles = useParticles(24);

  // ── Parallax on scroll ──
  const { scrollY } = useScroll();
  const bgY1 = useTransform(scrollY, [0, 600], [0, 80]);
  const bgY2 = useTransform(scrollY, [0, 600], [0, 200]);
  const bgY3 = useTransform(scrollY, [0, 600], [0, 300]);
  const contentY = useTransform(scrollY, [0, 600], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // ── Mouse-following light spot ──
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const lightX = useTransform(springX, [0, 1], ['10%', '90%']);
  const lightY = useTransform(springY, [0, 1], ['10%', '90%']);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ════════════════════════════════════════
          LAYER 1 — Deep warm gradient base
          ════════════════════════════════════════ */}
      <motion.div className="absolute inset-0" style={{ y: bgY1 }}>
        {/* Bakery interior photo with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bakery-interior.png')" }}
        />
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-espresso/85 via-cafe/80 to-brioche-dark/85" />
        {/* Subtle radial warmth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 30% 70%, rgba(200,135,58,0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 70% 30%, rgba(139,94,60,0.2) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* ════════════════════════════════════════
          LAYER 2 — Floating wheat / flour SVGs
          ════════════════════════════════════════ */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY2 }}>
        {/* Left wheat stalk */}
        <WheatStalk
          className="absolute text-flaky w-12 sm:w-16 md:w-20"
          style={{ left: '5%', top: '10%', transform: 'rotate(-20deg)' }}
        />
        {/* Right wheat stalk */}
        <WheatStalk
          className="absolute text-flaky w-10 sm:w-14 md:w-18"
          style={{ right: '8%', top: '5%', transform: 'rotate(25deg) scaleX(-1)' }}
        />
        {/* Bottom-left decorative */}
        <WheatStalk
          className="absolute text-brioche-light w-14 sm:w-18 md:w-22"
          style={{ left: '12%', bottom: '15%', transform: 'rotate(10deg)' }}
        />
        {/* Bottom-right decorative */}
        <WheatStalk
          className="absolute text-brioche-light w-8 sm:w-12 md:w-16"
          style={{ right: '15%', bottom: '20%', transform: 'rotate(-15deg) scaleX(-1)' }}
        />

        {/* Scattered flour puffs (large decorative) */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-flaky/[0.04] blur-2xl"
          style={{ left: '20%', top: '25%' }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-brioche/[0.06] blur-3xl"
          style={{ right: '15%', top: '40%' }}
          animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-whipped/[0.03] blur-3xl"
          style={{ left: '55%', top: '60%' }}
          animate={{ y: [0, -25, 0], x: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ════════════════════════════════════════
          LAYER 3 — Flour dust particles (24)
          ════════════════════════════════════════ */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY3 }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-whipped"
            style={{
              left: `${p.x}%`,
              bottom: '-5%',
              width: p.size,
              height: p.size,
              opacity: 0,
            }}
            animate={{
              y: [0, -1200],
              x: [0, p.drift],
              opacity: [0, p.opacity, p.opacity * 0.5, 0],
              scale: [0.5, 1, 0.6],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* ════════════════════════════════════════
          LAYER 4 — Steam / mist rising from bottom
          ════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`steam-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${15 + i * 18}%`,
              width: 120 + i * 30,
              height: 60 + i * 10,
            }}
          >
            <div
              className="w-full h-full rounded-full animate-steam"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,253,249,0.12) 0%, transparent 70%)',
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          </motion.div>
        ))}
        {/* Wide mist band */}
        <motion.div
          className="absolute -bottom-10 left-0 right-0 h-48"
          style={{
            background:
              'linear-gradient(to top, rgba(43,26,15,0.9) 0%, rgba(139,94,60,0.15) 60%, transparent 100%)',
          }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ════════════════════════════════════════
          Mouse-following light spot
          ════════════════════════════════════════ */}
      <motion.div
        className="absolute w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          left: lightX,
          top: lightY,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(200,135,58,0.08) 0%, rgba(200,135,58,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-espresso/40 pointer-events-none" />

      {/* ════════════════════════════════════════
          CONTENT
          ════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* ── Heritage badge ── */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-8 sm:mb-10"
        >
          <div className="relative overflow-hidden bg-brioche/20 backdrop-blur-sm border border-brioche/30 rounded-full px-5 py-2.5">
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 animate-shimmer pointer-events-none"
              style={{
                background:
                  'linear-gradient(110deg, transparent 25%, rgba(200,135,58,0.25) 50%, transparent 75%)',
                backgroundSize: '200% auto',
              }}
            />
            <div className="relative flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brioche-light" />
              <span className="text-sm font-lora font-semibold text-brioche-light tracking-wide">
                Baking Fresh in Costa Mesa Since 1989
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Main headline — staggered word reveal ── */}
        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="visible"
          className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-whipped leading-[1.1] mb-6 sm:mb-8"
        >
          {/* Line 1: "Baked Fresh" */}
          <span className="inline-flex flex-wrap justify-center">
            {'Baked Fresh'.split(' ').map((word, i) => (
              <motion.span key={`l1-${i}`} variants={wordReveal} className="inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
          </span>
          <br />
          {/* Line 2: "Every Morning" — gold color */}
          <span className="inline-flex flex-wrap justify-center text-brioche">
            {'Every Morning'.split(' ').map((word, i) => (
              <motion.span key={`l2-${i}`} variants={wordReveal} className="inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* ── Subheadline ── */}
        <motion.p
          variants={subVariants}
          initial="hidden"
          animate="visible"
          className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-flaky/80 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed"
        >
          From artisan pastries and fresh-baked cookies to legendary Wagon Wheels — made from scratch
          with 36 years of love.
        </motion.p>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16">
          <motion.div custom={0} variants={ctaVariants} initial="hidden" animate="visible">
            <Button
              asChild
              size="lg"
              className="bg-brioche hover:bg-brioche-dark text-whipped font-semibold rounded-full px-8 py-6 text-base sm:text-lg shadow-lg shadow-brioche/25 animate-pulse-glow"
            >
              <a href="#menu">View Our Menu</a>
            </Button>
          </motion.div>
          <motion.div custom={1} variants={ctaVariants} initial="hidden" animate="visible">
            <Button
              onClick={() => openOrderForm()}
              variant="outline"
              size="lg"
              className="border-whipped/40 text-whipped hover:bg-whipped/10 hover:text-whipped font-semibold rounded-full px-8 py-6 text-base sm:text-lg bg-transparent"
            >
              Order a Custom Cake
            </Button>
          </motion.div>
        </div>

        {/* ── Hours strip + live status ── */}
        <motion.div
          variants={hoursVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-sm text-flaky/60"
        >
          {/* Live open/closed indicator */}
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              {isOpen && (
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-herbe opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-herbe' : 'bg-raspberry'}`}
              />
            </span>
            <span className={`font-lora font-semibold ${isOpen ? 'text-herbe-light' : 'text-raspberry-light'}`}>
              {isOpen ? 'Now Open' : 'Closed'}
            </span>
          </span>

          <span className="hidden sm:inline text-flaky/30">|</span>
          <span className="flex items-center gap-1.5">
            Mon–Fri 7AM–6PM
          </span>
          <span className="hidden sm:inline text-flaky/30">|</span>
          <span className="flex items-center gap-1.5">
            Sat 7AM–5PM
          </span>
          <span className="hidden sm:inline text-flaky/30">|</span>
          <span className="flex items-center gap-1.5">
            Sun Closed
          </span>
          <span className="hidden sm:inline text-flaky/30">|</span>
          <span className="flex items-center gap-1.5 font-caveat text-base text-flaky/70">
            1170 Baker St, Costa Mesa
          </span>
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════
          Scroll indicator
          ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#heritage"
          className="flex flex-col items-center gap-2 text-whipped/40 hover:text-whipped/70 transition-colors group"
        >
          <span className="text-xs font-lora tracking-wider uppercase">Scroll to Explore</span>
          <span className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <span className="absolute w-8 h-8 rounded-full border border-whipped/20 animate-pulse-ring" />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </span>
        </a>
      </motion.div>
    </section>
  );
}
