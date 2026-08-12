import React from 'react';

const ThePromise = () => {
  const features = [
    {
      title: 'Dedicated Wedding Manager',
      description: 'A single point of contact from first call to last dance.'
    },
    {
      title: 'Curated Vendor Circle',
      description: 'Only trusted artisans, chefs and performers make the list.'
    },
    {
      title: 'Transparent Pricing',
      description: 'Line-item clarity, no hidden costs, no surprises.'
    },
    {
      title: '24×7 Concierge',
      description: 'Around-the-clock support for you and every guest.'
    },
    {
      title: 'AI-Assisted Planning',
      description: 'Budget, guest list and theme intelligence at your fingertips.'
    },
    {
      title: 'Zero-Stress Execution',
      description: 'You show up. We orchestrate the rest.'
    }
  ];

  return (
    <section className="py-20 bg-amber-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-600 mb-4 font-light">
            The Promise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">
            The details you'll never see —<br className="hidden sm:block" />
            <span className="text-amber-800">because they're already handled.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-serif text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-light text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThePromise;