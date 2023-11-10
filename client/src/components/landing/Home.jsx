import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import FeatureIn from './FeatureIn';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';
import Pricing from './Pricing';
import Testimonials from './Testimonials';

export default function Home({ onNav }) {
  const observer = useRef();

  const heroRef = useCallback(
    (hero) => {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            onNav(true);
          } else {
            onNav(null);
          }
        },
        { root: null, threshold: 0, rootMargin: '-96px' },
      );
      if (!hero) return;
      observer.current.observe(hero);
    },
    [heroRef],
  );

  return (
    <>
      <Hero ref={heroRef} />
      <div className="w-full bg-white-100">
        <FeatureIn />
        <Features />
      </div>
      <Testimonials />
      <div className="w-full bg-white-100">
        <Pricing />
      </div>
      <Footer />
    </>
  );
}

Home.propTypes = {
  onNav: PropTypes.func.isRequired,
};
