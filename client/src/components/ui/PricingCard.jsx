import React from 'react';

import Icon from '../ui/Icon';

const PricingCard = (props) => {
  return (
    <div
      className={`transition-all bg-white-100 rounded-2xl shadow-2xl h-fit overflow-hidden hover:-translate-y-1 relative ${
        props.pricing.popular && 'h-[110%]'
      }`}
    >
      {props.pricing.popular && (
        <p className="absolute bg-error z-10 top-8 -right-12 px-12 py-1 rotate-45 paragraph-small text-white-100">
          Most Popular
        </p>
      )}
      <div
        className={`h-24 px-8 pt-12 pb-20 flex justify-center items-center relative ${props.pricing.style}`}
      >
        <p className="heading-h2 text-white inline-block text-white-100 font-bold">
          {props.pricing.title}
        </p>
        <p
          className={`absolute rounded-full w-20 h-20 -bottom-10 left-1/2 -translate-x-1/2 text-white-100 flex justify-center items-center border-2 border-accent-dark-tint-800 heading-h6 font-bold ${props.pricing.secondaryStyle}`}
        >
          {props.pricing.price}
          <span className="paragraph-xsmall">
            {props.pricing.price !== 'Free' && '/mo'}
          </span>
        </p>
      </div>
      <ul className="px-16 py-16 text-black-100 paragraph-medium flex flex-col gap-3">
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
        className={`mb-8 w-fit mx-auto block text-center px-4 py-2  text-white-100 rounded cursor-pointer  ${props.pricing.btnStyle}`}
      >
        Order Now
      </a>
    </div>
  );
};

export default PricingCard;
