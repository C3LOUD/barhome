import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <div className="max-w-[75rem] px-8 mx-auto py-16 grid grid-cols-9 gap-6">
      <div className="paragraph-xsmall text-accent-dark-tint-300 col-span-2">
        <Logo />
        <p className="mt-8">Copyright © 2022</p>
        <p>Designed By Chen Yu</p>
        <p>All right reserved</p>
      </div>
      <div className="col-span-3">
        <p className="font-secondary heading-h6 text-white-100/50 mb-4">
          Contact us
        </p>
        <address>
          <p className="mb-2 text-accent-dark-tint-700 paragraph-small">
            27420 Laurence Park, Crystelberg, US 47023
          </p>
          <p
            href="tel:465-998-5899"
            className="text-accent-dark-tint-700 mb-2 paragraph-small hover:text-white-400 transition-all cursor-pointer"
          >
            465-998-5899
          </p>
          <p
            href="mailto:support@barhome.com"
            className="text-accent-dark-tint-700 paragraph-small hover:text-white-400 transition-all cursor-pointer"
          >
            support@barhome.com
          </p>
        </address>
      </div>
      <div className="col-span-2">
        <p className="font-secondary heading-h6 text-white-100/50 mb-4">
          Account
        </p>
        <Link
          className="block text-accent-dark-tint-700 paragraph-small pb-2 hover:text-white-400 transition-all"
          to="/signup"
        >
          Sign up
        </Link>
        <Link
          className="block text-accent-dark-tint-700 paragraph-small hover:text-white-400 transition-all"
          to="/login"
        >
          Login
        </Link>
      </div>
      <div className="col-span-2">
        <p className="font-secondary heading-h6 text-white-100/50 mb-4">
          Company
        </p>
        <p className="text-accent-dark-tint-700 paragraph-small pb-2 cursor-pointer hover:text-white-400 transition-all">
          About Barhome
        </p>
        <p className="text-accent-dark-tint-700 paragraph-small pb-2 cursor-pointer hover:text-white-400 transition-all">
          For Business
        </p>
        <p className="text-accent-dark-tint-700 paragraph-small pb-2 cursor-pointer hover:text-white-400 transition-all">
          Partners
        </p>
        <p className="text-accent-dark-tint-700 paragraph-small cursor-pointer hover:text-white-400 transition-all">
          Careers
        </p>
      </div>
    </div>
  );
};

export default Footer;
