import React, { useRef, useCallback } from 'react';

import FeatureIn from './FeatureIn';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';
import Pricing from './Pricing';
import Testimonials from './Testimonials';

const Home = (props) => {
  const observer = useRef();

  const heroRef = useCallback(
    (hero) => {
      observer.current = new IntersectionObserver(
        (entries) => {
          !entries[0].isIntersecting ? props.onNav(true) : props.onNav(null);
        },
        { root: null, threshold: 0, rootMargin: '-96px' }
      );
      if (!hero) return;
      observer.current.observe(hero);
    },
    [heroRef]
  );

  return (
    <>
      <Hero ref={heroRef} />
      <div className="bg-white-100 w-full">
        <FeatureIn />
        <Features />
      </div>
      <Testimonials />
      <div className="bg-white-100 w-full">
        <Pricing />
      </div>
      <Footer />
    </>
  );
};

export default Home;
