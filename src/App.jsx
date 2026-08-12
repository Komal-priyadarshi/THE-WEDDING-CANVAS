import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import WhatWeDo from './components/WhatWeDo';
import Portfolio from './components/Portfolio';
import WhereWeWork from './components/WhereWeWork';
import Collections from './components/Collections';
import ThePromise from './components/ThePromise';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <OurStory />
        <WhatWeDo />
        <Portfolio />
        <WhereWeWork />
        <Collections />
        <ThePromise />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;