import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The Wedding Canvas didn't just plan our wedding — they created an experience we relive every time we close our eyes. Every single detail was flawless.",
      name: "Priya & Arjun Mehta",
      location: "Udaipur Palace Wedding",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80"
    },
    {
      quote: "Komal and her team understood our vision better than we did. The floral architecture alone made our guests gasp. Truly a couture experience.",
      name: "Sneha & Rohan Kapoor",
      location: "Bali Destination Wedding",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&q=80"
    },
    {
      quote: "From the first consultation to the final farewell, every moment was orchestrated with such grace. Our family is still talking about it six months later.",
      name: "Ananya & Vikram Singh",
      location: "Jaipur Heritage Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-600 mb-4 font-light">
            Voices
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">
            From our couples.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-amber-50/30 p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-200"
                />
                <div>
                  <p className="font-serif text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 font-light">{testimonial.location}</p>
                </div>
              </div>
              <div className="text-4xl text-amber-400 mb-2">"</div>
              <p className="text-gray-700 font-light leading-relaxed italic">
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;