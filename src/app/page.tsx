import Image from 'next/image';
import { Hero } from '@/components/marketing/Hero';
import { Navbar } from '@/components/marketing/Navbar';
import { About } from '@/components/marketing/About';
import { KsaMethod } from '@/components/marketing/KsaMethod';
import { Technology } from '@/components/marketing/Technology';
import { PadiCycle } from '@/components/marketing/PadiCycle';
import { Footer } from '@/components/marketing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <Image src="/images/home-bg-user.svg" alt="Background" fill className="fixed inset-0 object-cover -z-50" priority />
      <div className="fixed inset-0 bg-black/75 -z-40" />
      <div className="fixed right-6 top-6 h-28 w-28 rounded-full bg-yellow-600/95 -z-30" />
      <Hero />
      <About />
      <KsaMethod />
      <Technology />
      <PadiCycle />
      <Footer />
    </main>
  );
}
