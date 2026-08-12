import React, { useState } from 'react';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { 
      id: 1, 
      title: 'Udaipur Palace Wedding', 
      location: 'Rajasthan, India',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'
    },
    { 
      id: 2, 
      title: 'Bali Destination Wedding', 
      location: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'
    },
    { 
      id: 3, 
      title: 'Maldives Beach Ceremony', 
      location: 'Indian Ocean',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'
    },
    { 
      id: 4, 
      title: 'Dubai Luxury Wedding', 
      location: 'United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'
    },
    { 
      id: 5, 
      title: 'Jaipur Heritage Wedding', 
      location: 'Rajasthan, India',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'
    },
    { 
      id: 6, 
      title: 'Goa Beach Wedding', 
      location: 'India',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-600 mb-4 font-light">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">
            A Living Archive.
          </h2>
          <p className="text-gray-600 font-light mt-4 max-w-2xl mx-auto">
            Moments captured across palaces, coastlines and private estates — each a chapter of our atelier's story.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image) => (
            <div 
              key={image.id}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image.image} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-serif">{image.title}</p>
                <p className="text-xs opacity-80">{image.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-white text-center mt-4">
              <p className="text-xl font-serif">{selectedImage.title}</p>
              <p className="text-sm opacity-70">{selectedImage.location}</p>
            </div>
            <button 
              className="absolute top-4 right-4 text-white text-2xl hover:text-amber-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;