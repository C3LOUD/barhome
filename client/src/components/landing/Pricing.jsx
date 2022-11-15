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
    <div className="max-w-[75rem] px-8 mx-auto my-24" id="pricing">
      <p className="text-primary text-primary-main paragraph-large font-bold mb-6">
        Pricing
      </p>
      <p className="display-small font-primary font-bold text-black-100 mb-24">
        Start for free. Paid for more feature.
      </p>
      <div className="grid grid-cols-3 px-12 items-center">
        {pricingTag.map((el, i) => (
          <PricingCard pricing={el} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
