import React from 'react';

const Collections = () => {
  const packages = [
    {
      name: 'Intimate',
      price: 'From ₹15L',
      guests: 'Up to 100 Guests',
      features: [
        'Dedicated Wedding Manager',
        'Venue Sourcing & Styling',
        'Floral Design & Decor',
        'Catering Coordination',
        'Photography & Videography',
        'Guest Management'
      ],
      popular: false,
      border: 'border-gray-200'
    },
    {
      name: 'Grand',
      price: 'From ₹35L',
      guests: 'Up to 300 Guests',
      features: [
        'Everything in Intimate',
        'Multi-Day Event Planning',
        'Celebrity Entertainment',
        'International Destinations',
        'Luxury Stay Coordination',
        'AI Planning Suite Access'
      ],
      popular: true,
      border: 'border-amber-800'
    },
    {
      name: 'Palace',
      price: 'Custom',
      guests: 'Bespoke — No Limits',
      features: [
        'Everything in Grand',
        'Private Palace Booking',
        'Couture Floral Architecture',
        'Full Concierge for Guests',
        'Cinematic Film Production',
        'Legacy Keepsake Design'
      ],
      popular: false,
      border: 'border-gray-200'
    }
  ];

  return (
    <section id="collections" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-600 mb-4 font-light">
            Collections
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">
            Curated Packages
          </h2>
          <p className="text-gray-600 font-light mt-4 max-w-2xl mx-auto">
            Every celebration is bespoke. These collections are starting points — refined together in private consultation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-sm border-2 ${pkg.border} p-8 relative hover:shadow-md transition-shadow`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-800 text-white text-xs px-4 py-1 tracking-wider">
                  Most Popular
                </span>
              )}
              <div className="text-center">
                <p className="text-sm text-gray-500 font-light">{pkg.guests}</p>
                <h3 className="text-2xl font-serif text-gray-900 mt-2">{pkg.name}</h3>
                <p className="text-xl font-serif text-amber-800 mt-2">{pkg.price}</p>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600">✓</span>
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-6 py-2 text-sm tracking-wider transition-colors ${
                pkg.popular 
                  ? 'bg-amber-800 text-white hover:bg-amber-900' 
                  : 'border border-amber-800 text-amber-800 hover:bg-amber-50'
              }`}>
                Inquire Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;