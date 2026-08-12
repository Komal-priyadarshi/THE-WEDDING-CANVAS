import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300 mb-4 font-light">
            Luxury Wedding Atelier
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6">
            Turning Dreams Into
            <span className="block text-amber-300 mt-2">Timeless Celebrations.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Bespoke luxury weddings, palace destinations, and cinematic experiences — 
            curated end-to-end by Komal Priyadarshi and The Wedding Canvas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors tracking-wider text-sm">
              Begin Your Journey
            </button>
            <button className="px-8 py-3 border border-white text-white hover:bg-white/10 transition-colors tracking-wider text-sm flex items-center gap-2">
              Explore Our World
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="mt-12 flex justify-center items-center gap-8 sm:gap-12">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-serif text-amber-300">15+</p>
              <p className="text-xs uppercase tracking-wider text-white/70">Years of Excellence</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-serif text-amber-300">500+</p>
              <p className="text-xs uppercase tracking-wider text-white/70">Weddings Crafted</p>
            </div>
            <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
            <div className="text-center hidden sm:block">
              <p className="text-2xl sm:text-3xl font-serif text-amber-300">20+</p>
              <p className="text-xs uppercase tracking-wider text-white/70">Destinations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;