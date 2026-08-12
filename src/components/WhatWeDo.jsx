import React from 'react';

const WhatWeDo = () => {
  const services = [
    {
      title: 'Palace & Destination Weddings',
      description: 'From the marble corridors of Udaipur to the shores of Bali, we craft immersive multi-day celebrations that leave every guest breathless.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
      icon: '🏰'
    },
    {
      title: 'Elite Floral Architecture',
      description: 'Rare blooms, sculptural mandaps and bespoke installations — floral design engineered like couture, alive with scent and story.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
      icon: '🌸'
    },
    {
      title: 'Cinematic Sangeet & Reception',
      description: 'Choreography, celebrity artists, sound and light staged as a single unforgettable performance. A night your family will retell for decades.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
      icon: '🎭'
    }
  ];

  return (
    <section id="services" className="py-20 bg-amber-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-600 mb-4 font-light">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">
            Signature Services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-3xl">{service.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;