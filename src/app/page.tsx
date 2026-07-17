import { Hero } from "@/components/marketing/Hero";
import { Navbar } from "@/components/marketing/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111827] text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
