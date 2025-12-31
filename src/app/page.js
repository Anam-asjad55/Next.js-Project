 "use client";
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { trips } from '../data/trips';

export default function Home() {
  const displayTrips = trips.map(t => ({
    ...t,
    tag: t.tag === 'Romantic' ? 'Scenic' : t.tag
  }));

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        {/* FIXED: Direct path to image in public folder */}
        <img 
          src="/mnt2.png" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold">Tour & Travel</h1>
          <p className="mt-4 text-lg text-white/90">
            Mood‑based suggestions, snack guides, and hidden gems — no heavy planning.
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link href="/services" className="btn-primary">Start Your Getaway</Link>
          </div>
          <div className="mt-10 animate-bounce">
            <ChevronDownIcon className="h-8 w-8 mx-auto text-white/70" />
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold">Popular Trips</h2>
          <Link href="/services#trips" className="btn-outline">View all trips</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {displayTrips.map(t => (
            <article key={t.id} className="relative group overflow-hidden rounded-2xl shadow-lg">
              {/* Ensure t.img in your data file is also a public path like "/trip1.jpg" */}
              <img src={t.img} alt={t.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{t.title}</h3>
                <span className="text-xs bg-sky-500 px-2 py-1 rounded">{t.tag}</span>
              </div>
              <Link 
                href={`/trip/${t.id}`} 
                className="absolute bottom-4 right-4 btn-primary opacity-0 group-hover:opacity-100 transition"
              >
                Discover
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}