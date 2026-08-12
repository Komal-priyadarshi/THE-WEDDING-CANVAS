import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['Our Story', 'Services', 'Portfolio', 'Collections', 'Contact'];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-serif tracking-wider text-amber-800">
              The Wedding Canvas
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-light tracking-wider text-gray-700 hover:text-amber-700 transition-colors"
              >
                {link}
              </a>
            ))}
            <button className="px-6 py-2 bg-amber-800 text-white text-sm tracking-wider hover:bg-amber-900 transition-colors">
              Inquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-light tracking-wider text-gray-700 hover:text-amber-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              ))}
              <button className="px-6 py-2 bg-amber-800 text-white text-sm tracking-wider hover:bg-amber-900 transition-colors w-full">
                Inquire Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;