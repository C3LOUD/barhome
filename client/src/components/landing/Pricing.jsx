import React from 'react';
import PricingCard from '../ui/PricingCard';

const Pricing = () => {
  const pricingTag = [
    {
      title: 'Starter',
      price: 'Free',
      style: 'bg-accent-dark-main',
      secondaryStyle: 'bg-primary-main',
      btnStyle: 'bg-primary-main hover:bg-primary-tint-200',
    },
    {
      title: 'Annual',
      price: '$10',
      style: 'bg-secondary-main',
      secondaryStyle: 'bg-secondary-main',
      btnStyle: 'bg-secondary-main hover:bg-secondary-tint-200',
      popular: true,
    },
    {
      title: 'Standard',
      price: '$12',
      style: 'bg-accent-dark-main',
      secondaryStyle: 'bg-primary-main',
      btnStyle: 'bg-primary-main hover:bg-primary-tint-200',
    },
  ];

  return (
    <div
      className="mx-auto my-24 max-w-[75rem] px-8 lg:my-16 md:my-12 2xs:px-4"
      id="pricing"
    >
      <p className="text-primary paragraph-large 2xs:paragraph-small mb-6 font-bold text-primary-main md:mb-4">
        Pricing
      </p>
      <p className="display-small mb-24 font-primary font-bold text-black-100 lg:mb-20 2xs:mb-12">
        Start for free. Paid for more feature.
      </p>
      <div className="grid grid-cols-3 items-center px-12 xs:grid-cols-1 xs:justify-items-center xs:gap-4">
        {pricingTag.map((el, i) => (
          <PricingCard pricing={el} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
