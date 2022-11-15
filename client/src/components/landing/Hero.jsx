import React from 'react';
import { Link } from 'react-router-dom';

import customer1 from '../../assets/customers/customer-1.jpg';
import customer2 from '../../assets/customers/customer-2.jpg';
import customer3 from '../../assets/customers/customer-3.jpg';
import customer4 from '../../assets/customers/customer-4.jpg';
import customer5 from '../../assets/customers/customer-5.jpg';
import customer6 from '../../assets/customers/customer-6.jpg';
import heroImage from '../../assets/hero.png';

const Hero = React.forwardRef((props, ref) => {
  const smoothScrollHandler = (e) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="max-w-[80rem] mx-auto px-8 pt-12 pb-24 grid grid-cols-2 items-center gap-24"
      ref={ref}
    >
      <div className="text-white-100">
        <p className="display-large font-primary font-bold mb-8">
          Build a Bar at Home, Master Skills of Mixology
        </p>
        <p className="heading-h6 font-primary font-bold mb-16">
          Start a professional bar yourself, no need to go out, just stay at
          home and chill with friends. Make your friends impress of your
          bartending skill.
        </p>
        <Link
          className="transition-all heading-h6 font-secondary font-bold px-8 py-4 mr-6 bg-primary-main inline-block rounded w-fit hover:bg-primary-tint-200"
          to="/signup"
        >
          Start for FREE
        </Link>
        <a
          onClick={smoothScrollHandler}
          className="cursor-pointer transition-all text-primary-main heading-h6 font-secondary font-bold px-8 py-4 mr-6 bg-primary-tint-800 inline-block rounded w-fit hover:bg-white-300"
        >
          Learn More
        </a>
        <div className="flex pt-20 gap-4 items-center">
          <div className="flex">
            <img
              src={customer1}
              alt="Customer photo"
              className="-mr-4 h-10 w-10 rounded-full border-white-100 border-2"
            />
            <img
              src={customer2}
              alt="Customer photo"
              className="-mr-4 h-10 w-10 rounded-full border-white-100 border-2"
            />
            <img
              src={customer3}
              alt="Customer photo"
              className="-mr-4 h-10 w-10 rounded-full border-white-100 border-2"
            />
            <img
              src={customer4}
              alt="Customer photo"
              className="-mr-4 h-10 w-10 rounded-full border-white-100 border-2"
            />
            <img
              src={customer5}
              alt="Customer photo"
              className="-mr-4 h-10 w-10 rounded-full border-white-100 border-2"
            />
            <img
              src={customer6}
              alt="Customer photo"
              className="-mr-4 h-10 w-10 rounded-full border-white-100 border-2 last:m-0"
            />
          </div>
          <p className="font-secondary paragraph-medium font-medium">
            Join this
            <span className="text-primary-main font-bold">25000+</span> family
            right now!
          </p>
        </div>
      </div>
      <img src={heroImage} alt="hero section image" />
    </div>
  );
});

export default Hero;
