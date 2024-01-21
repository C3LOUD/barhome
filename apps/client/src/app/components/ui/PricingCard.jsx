import PropTypes from 'prop-types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function PricingCard({ pricing }) {
  return (
    <div
      className={twMerge(
        'bg-white-100 xs:max-w-[25rem] 2xs:max-w-full relative h-fit overflow-hidden rounded-2xl shadow-2xl transition-all hover:-translate-y-1',
        pricing.popular && 'xs:-order-1 xs:h-full h-[110%]',
      )}
    >
      {pricing.popular && (
        <p className="paragraph-small bg-error text-white-100 absolute -right-12 top-8 z-10 rotate-45 px-12 py-1">
          Most Popular
        </p>
      )}
      <div
        className={twMerge(
          'relative flex h-24 items-center justify-center pb-20 pt-12 sm:px-4',
          pricing.style,
        )}
      >
        <p className="heading-h2 text-white-100 inline-block font-bold text-white">
          {pricing.title}
        </p>
        <p
          className={twMerge(
            'heading-h6 border-accent-dark-tint-800 text-white-100 absolute -bottom-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-2 font-bold',
            pricing.secondaryStyle,
          )}
        >
          {pricing.price}
          <span className="paragraph-xsmall">
            {pricing.price !== 'Free' && '/mo'}
          </span>
        </p>
      </div>
      <ul className="paragraph-medium text-black-100 xs:px-6 flex flex-col gap-3 px-16 py-16 md:px-8">
        <li className="flex gap-2 text-2xl">
          <ion-icon name="checkmark-sharp" /> 1000+ Pro Recipes
        </li>
        <li className="flex gap-2 text-2xl">
          <ion-icon name="checkmark-sharp" /> Ingredients Caculation
        </li>
        <li className="flex gap-2 text-2xl">
          <ion-icon name="checkmark-sharp" /> Detail Instruction
        </li>
        <li className="flex gap-2 text-2xl">
          <ion-icon name="checkmark-sharp" /> Social Post
        </li>
        <li className="flex gap-2 text-2xl">
          <ion-icon name="checkmark-sharp" /> Personal Recipe management
        </li>
        <li
          className={twMerge(
            'flex gap-2 text-2xl',
            pricing.popular ? 'text-black-100' : 'text-gray-200',
          )}
        >
          <ion-icon
            name={pricing.popular ? 'checkmark-sharp' : 'close-sharp'}
          />
          {' Support for 1 Year'}
        </li>
        <li
          className={twMerge(
            'flex gap-2 text-2xl',
            pricing.popular ? 'text-black-100' : 'text-gray-200',
          )}
        >
          <ion-icon
            name={pricing.popular ? 'checkmark-sharp' : 'close-sharp'}
          />
          {' Updates for 1 Year'}
        </li>
      </ul>
      <span
        className={twMerge(
          'text-white-100 mx-auto mb-8 block w-fit cursor-pointer rounded  px-4 py-2 text-center',
          pricing.btnStyle,
        )}
      >
        Order Now
      </span>
    </div>
  );
}

PricingCard.propTypes = {
  pricing: PropTypes.shape({
    btnStyle: PropTypes.string,
    popular: PropTypes.bool,
    style: PropTypes.string,
    secondaryStyle: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};
