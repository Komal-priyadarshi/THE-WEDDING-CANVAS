import React from 'react';

const WhereWeWork = () => {
  const destinations = [
    { 
      name: 'Udaipur', 
      location: 'Rajasthan, India', 
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
      emoji: '🏰'
    },
    { 
      name: 'Bali', 
      location: 'Indonesia', 
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
      emoji: '🌴'
    },
    { 
      name: 'Maldives', 
      location: 'Indian Ocean', 
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
      emoji: '🏝️'
    },
    { 
      name: 'Dubai', 
      location: 'United Arab Emirates', 
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      emoji: '🌆'
    }
  ];

  const otherDestinations = ['Jaipur', 'Goa', 'Kerala', 'Kashmir', 'Italy', 'Paris', 'Switzerland', 'Thailand'];

  return (
    <section id="destinations" className="py-20 bg-amber-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-600 mb-4 font-light">
            Where We Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">
            Destination Weddings
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {destinations.map((dest, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="text-2xl mb-1">{dest.emoji}</div>
                <h3 className="text-lg font-serif">{dest.name}</h3>
                <p className="text-sm opacity-80">{dest.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 font-light">
            Also — {otherDestinations.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhereWeWork;