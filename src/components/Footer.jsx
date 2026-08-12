import React from 'react';

function Footer() {
  return (
    <footer className="w-full text-center py-12 bg-neutral-900 text-xs text-gray-400 tracking-wider border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-amber-400 font-medium uppercase tracking-[0.2em] mb-2">
          The Wedding Canvas
        </p>
        <p className="mb-6">
          Subscribe for exclusive insights and wedding inspiration.
        </p>
        
        {/* Newsletter Form */}
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="w-full bg-neutral-950 border border-neutral-800 p-3 text-sm focus:outline-none focus:border-amber-500 text-white transition"
            required
          />
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-amber-500 text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-amber-400 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-gray-500">
          Founded by <span className="text-white">Komal Priyadarshi</span>. 
          Contact: priyayadashi36@gmail.com | +91 9296327465
        </p>
        <p className="mt-4 text-neutral-600">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;