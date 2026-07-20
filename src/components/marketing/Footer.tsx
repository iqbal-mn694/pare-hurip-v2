'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Github, MessageCircleMore } from 'lucide-react';

const footerLinks = [
  { title: 'Our Story', items: ['About', 'Mission'] },
  { title: 'Products', items: ['Analytics', 'Forecasting'] },
  { title: 'Brands', items: ['PARE HURIP'] },
  { title: 'Social Media', items: ['Facebook', 'Twitter', 'Discord'] },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-12 sm:px-8 lg:px-10 text-slate-700">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Our Service</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="transition hover:text-slate-900">Products</Link></li>
              <li><Link href="#" className="transition hover:text-slate-900">Brands</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Social Media</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="transition hover:text-slate-900">Facebook</Link></li>
              <li><Link href="#" className="transition hover:text-slate-900">Twitter</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#" className="transition hover:text-slate-900">Privacy Policy</Link></li>
              <li><Link href="#" className="transition hover:text-slate-900">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © 2026 Badan Pusat Statistik Tasikmalaya. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
