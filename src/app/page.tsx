'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/bakery/Header';
import Hero from '@/components/bakery/Hero';
import HeritageBar from '@/components/bakery/HeritageBar';
import DisplayCase from '@/components/bakery/DisplayCase';
import WagonWheel from '@/components/bakery/WagonWheel';
import DailySpecials from '@/components/bakery/DailySpecials';
import MenuPreview from '@/components/bakery/MenuPreview';
import CustomCakes from '@/components/bakery/CustomCakes';
import ProcessSection from '@/components/bakery/ProcessSection';
import Community from '@/components/bakery/Community';
import Testimonials from '@/components/bakery/Testimonials';
import VisitUs from '@/components/bakery/VisitUs';
import Footer from '@/components/bakery/Footer';
import OrderForm from '@/components/bakery/OrderForm';
import { Phone } from 'lucide-react';
import { onOpenOrderForm } from '@/lib/order-events';

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    const cleanup = onOpenOrderForm(() => setOrderOpen(true));
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <HeritageBar />
        <DisplayCase />
        <WagonWheel />
        <DailySpecials />
        <MenuPreview />
        <CustomCakes />
        <ProcessSection />
        <Community />
        <Testimonials />
        <VisitUs />
      </main>

      <Footer />

      {/* Order form modal */}
      <OrderForm open={orderOpen} onOpenChange={setOrderOpen} />

      {/* Mobile floating call button */}
      <a
        href="tel:7145466386"
        className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 rounded-full bg-brioche text-whipped shadow-lg shadow-brioche/30 flex items-center justify-center hover:bg-brioche-dark transition-colors animate-pulse-glow"
        aria-label="Call French's Bakery"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Mobile floating order button */}
      <button
        onClick={() => setOrderOpen(true)}
        className="fixed bottom-6 left-6 z-40 lg:hidden bg-raspberry text-whipped rounded-full px-4 py-3 shadow-lg shadow-raspberry/30 font-semibold text-sm hover:bg-raspberry-light transition-colors flex items-center gap-1.5"
      >
        🎂 Order Now
      </button>
    </div>
  );
}
