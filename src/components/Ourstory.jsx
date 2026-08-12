import React from 'react';
import { ArrowRight } from 'lucide-react';

const OurStory = () => {
  return (
    <section id="our-story" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" 
                  alt="Luxury Wedding Decoration"
                  className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white p-6 rounded-lg shadow-xl">
                  <p className="text-2xl font-serif">15+</p>
                  <p className="text-xs uppercase tracking-wider">Years of Excellence</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-600 mb-4 font-light">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-6">
                A vision of elegance,<br />
                <span className="text-amber-800">quietly staged.</span>
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="font-light leading-relaxed">
                  The Wedding Canvas was founded on a single belief: every wedding is a blank canvas, 
                  painted with heritage, emotion and craft. Under Komal Priyadarshi's direction, our 
                  atelier curates a small number of celebrations each year — treating each as an 
                  heirloom in the making.
                </p>
                <p className="font-light leading-relaxed">
                  From the first mood board to the final send-off, we orchestrate every scent, 
                  sound and silhouette with the discipline of a couture house and the warmth of family.
                </p>
              </div>
              <button className="mt-6 px-8 py-3 border border-amber-800 text-amber-800 hover:bg-amber-50 transition-colors tracking-wider text-sm flex items-center gap-2">
                Explore Our Services
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 sm:gap-16 pt-12 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-serif text-amber-800">500+</p>
              <p className="text-xs uppercase tracking-wider text-gray-500">Weddings Crafted</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-serif text-amber-800">20+</p>
              <p className="text-xs uppercase tracking-wider text-gray-500">Destinations</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-serif text-amber-800">100%</p>
              <p className="text-xs uppercase tracking-wider text-gray-500">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;