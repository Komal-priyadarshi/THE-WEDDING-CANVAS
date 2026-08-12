import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    guestCount: '',
    destination: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          weddingDate: '',
          guestCount: '',
          destination: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300 mb-4 font-light">
              Let's Create Together
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
              Begin your story.
            </h2>
            <p className="text-white/80 font-light mt-4">
              We meet with a limited number of couples each season. Share a few details and 
              Komal will personally respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-1">Wedding Date</label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-1">Guest Count</label>
                <input
                  type="number"
                  name="guestCount"
                  placeholder="e.g., 150"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-1">Preferred Destination</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g., Udaipur, Bali"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-light text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Tell us about your vision..."
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full mt-6 px-8 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors tracking-wider text-sm disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
            </button>
            {status === 'success' && (
              <p className="text-green-600 text-center mt-4 text-sm">Thank you! We'll be in touch within 24 hours.</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center mt-4 text-sm">Something went wrong. Please try again.</p>
            )}
          </form>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-light">Phone</p>
              <p className="text-amber-700 font-serif">+91 92963 27465</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-light">Email</p>
              <p className="text-amber-700 font-serif text-sm">komalpriyadarshi36@gmail.com</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-light">Studio</p>
              <p className="text-amber-700 font-serif">India · Worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;