import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import customer1 from '../../assets/customers/customer-1.jpg';
import customer2 from '../../assets/customers/customer-2.jpg';
import customer3 from '../../assets/customers/customer-3.jpg';
import customer4 from '../../assets/customers/customer-4.jpg';
import customer5 from '../../assets/customers/customer-5.jpg';
import customer6 from '../../assets/customers/customer-6.jpg';
import heroImage from '../../assets/hero.png';

const Hero = React.forwardRef((_, ref) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const smoothScrollHandler = (e) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="mx-auto grid max-w-[80rem] grid-cols-2 items-center gap-24 px-8 pt-12 pb-24 lg:pb-16 xs:grid-cols-1 xs:gap-16"
      ref={ref}
    >
      <div className="text-white-100">
        <p className="display-large md:display-small sm:heading-h1 mb-8 font-primary font-bold">
          Build a Bar at Home, Master Skills of Mixology
        </p>
        <p className="heading-h6 sm:paragraph-large mb-16 font-primary font-bold">
          Start a professional bar yourself, no need to go out, just stay at
          home and chill with friends. Make your friends impress of your
          bartending skill.
        </p>
        <Link
          className="md:paragraph-medium heading-h6 mr-6 inline-block w-fit rounded bg-primary-main px-8 py-4 font-secondary font-bold transition-all hover:bg-primary-tint-200 md:mr-4 md:px-6 md:py-3 sm:px-4"
          to="/signup"
        >
          Start for FREE
        </Link>
        <Link
          to="/dashboard"
          onClick={isLoggedIn || smoothScrollHandler}
          className={twMerge(
            'md:paragraph-medium heading-h6 mr-6 inline-block w-fit cursor-pointer rounded px-8 py-4 font-secondary font-bold transition-all md:px-6 md:py-3 sm:px-4',
            isLoggedIn
              ? 'bg-secondary-main hover:bg-secondary-tint-200'
              : 'bg-primary-tint-800 text-primary-main hover:bg-white-300',
          )}
        >
          {isLoggedIn ? 'Dashboard' : 'Learn More'}
        </Link>
        <div className="flex items-center gap-4 pt-20 md:gap-8 sm:gap-16 xs:gap-4 xs:pt-8 2xs:flex-col">
          <div className="flex">
            <img
              src={customer1}
              alt="Customer 1"
              className="-mr-4 h-10 w-10 rounded-full border-2 border-white-100"
            />
            <img
              src={customer2}
              alt="Customer 2"
              className="-mr-4 h-10 w-10 rounded-full border-2 border-white-100"
            />
            <img
              src={customer3}
              alt="Customer 3"
              className="-mr-4 h-10 w-10 rounded-full border-2 border-white-100"
            />
            <img
              src={customer4}
              alt="Customer 4"
              className="-mr-4 h-10 w-10 rounded-full border-2 border-white-100"
            />
            <img
              src={customer5}
              alt="Customer 5"
              className="-mr-4 h-10 w-10 rounded-full border-2 border-white-100"
            />
            <img
              src={customer6}
              alt="Customer 6"
              className="-mr-4 h-10 w-10 rounded-full border-2 border-white-100 last:m-0"
            />
          </div>
          <p className="paragraph-medium font-secondary font-medium">
            {`Join this
            ${(
              <span className="font-bold text-primary-main">25000+</span>
            )} family right now!`}
          </p>
        </div>
      </div>
      <img
        src={heroImage}
        alt="hero section"
        className="xs:mx-auto xs:w-2/3 2xs:w-full"
      />
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
