import React from 'react';

import Icon from '../ui/Icon';

const PricingCard = (props) => {
  return (
    <div
      className={`relative h-fit overflow-hidden rounded-2xl bg-white-100 shadow-2xl transition-all hover:-translate-y-1 xs:max-w-[25rem] 2xs:max-w-full ${
        props.pricing.popular && 'h-[110%] xs:-order-1 xs:h-full'
      }`}
    >
      {props.pricing.popular && (
        <p className="paragraph-small absolute top-8 -right-12 z-10 rotate-45 bg-error px-12 py-1 text-white-100">
          Most Popular
        </p>
      )}
      <div
        className={`relative flex h-24 items-center justify-center pt-12 pb-20 sm:px-4 ${props.pricing.style}`}
      >
        <p className="heading-h2 text-white inline-block font-bold text-white-100">
          {props.pricing.title}
        </p>
        <p
          className={`heading-h6 absolute -bottom-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent-dark-tint-800 font-bold text-white-100 ${props.pricing.secondaryStyle}`}
        >
          {props.pricing.price}
          <span className="paragraph-xsmall">
            {props.pricing.price !== 'Free' && '/mo'}
          </span>
        </p>
      </div>
      <ul className="paragraph-medium flex flex-col gap-3 px-16 py-16 text-black-100 md:px-8 xs:px-6">
        <li className="flex gap-2">
          <Icon name="checkmark-sharp" style="text-2xl" /> 1000+ Pro Recipes
        </li>
        <li className="flex gap-2">
          <Icon name="checkmark-sharp" style="text-2xl" /> Ingredients
          Caculation
        </li>
        <li className="flex gap-2">
          <Icon name="checkmark-sharp" style="text-2xl" /> Detail Instruction
        </li>
        <li className="flex gap-2">
          <Icon name="checkmark-sharp" style="text-2xl" /> Social Post
        </li>
        <li className="flex gap-2">
          <Icon name="checkmark-sharp" style="text-2xl" /> Personal Recipe
          management
        </li>
        <li
          className={`flex gap-2 ${
            props.pricing.popular ? 'text-black-100' : 'text-gray-200'
          }`}
        >
          <Icon
            name={props.pricing.popular ? 'checkmark-sharp' : 'close-sharp'}
            style="text-2xl"
          />{' '}
          Support for 1 Year
        </li>
        <li
          className={`flex gap-2 ${
            props.pricing.popular ? 'text-black-100' : 'text-gray-200'
          }`}
        >
          <Icon
            name={props.pricing.popular ? 'checkmark-sharp' : 'close-sharp'}
            style="text-2xl"
          />{' '}
          Updates for 1 Year
        </li>
      </ul>
      <a
        className={`mx-auto mb-8 block w-fit cursor-pointer rounded px-4  py-2 text-center text-white-100  ${props.pricing.btnStyle}`}
      >
        Order Now
      </a>
    </div>
  );
};

export default PricingCard;
