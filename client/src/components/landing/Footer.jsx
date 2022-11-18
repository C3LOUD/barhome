import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <div className="mx-auto grid max-w-[75rem] grid-cols-9 gap-6 px-8 py-16 lg:py-12 2xs:grid-cols-2 2xs:px-4">
      <div className="paragraph-xsmall col-span-2 text-accent-dark-tint-300 2xs:col-span-1">
        <Logo />
        <p className="mt-8">Copyright © 2022</p>
        <p>Designed By Chen Yu</p>
        <p>All right reserved</p>
      </div>
      <div className="col-span-3 2xs:col-span-1">
        <p className="heading-h6 mb-4 font-secondary text-white-100/50">
          Contact us
        </p>
        <address>
          <p className="paragraph-small mb-2 text-accent-dark-tint-700">
            27420 Laurence Park, Crystelberg, US 47023
          </p>
          <p
            href="tel:465-998-5899"
            className="paragraph-small mb-2 cursor-pointer text-accent-dark-tint-700 transition-all hover:text-white-400"
          >
            465-998-5899
          </p>
          <p
            href="mailto:support@barhome.com"
            className="paragraph-small cursor-pointer text-accent-dark-tint-700 transition-all hover:text-white-400"
          >
            support@barhome.com
          </p>
        </address>
      </div>
      <div className="col-span-2 2xs:col-span-1">
        <p className="heading-h6 mb-4 font-secondary text-white-100/50">
          Account
        </p>
        <Link
          className="paragraph-small block pb-2 text-accent-dark-tint-700 transition-all hover:text-white-400"
          to="/signup"
        >
          Sign up
        </Link>
        <Link
          className="paragraph-small block text-accent-dark-tint-700 transition-all hover:text-white-400"
          to="/login"
        >
          Login
        </Link>
      </div>
      <div className="col-span-2 2xs:col-span-1">
        <p className="heading-h6 mb-4 font-secondary text-white-100/50">
          Company
        </p>
        <p className="paragraph-small cursor-pointer pb-2 text-accent-dark-tint-700 transition-all hover:text-white-400">
          About Barhome
        </p>
        <p className="paragraph-small cursor-pointer pb-2 text-accent-dark-tint-700 transition-all hover:text-white-400">
          For Business
        </p>
        <p className="paragraph-small cursor-pointer pb-2 text-accent-dark-tint-700 transition-all hover:text-white-400">
          Partners
        </p>
        <p className="paragraph-small cursor-pointer text-accent-dark-tint-700 transition-all hover:text-white-400">
          Careers
        </p>
      </div>
    </div>
  );
};

export default Footer;
