import React from 'react';

const FeatureCard = (props) => {
  return (
    <div>
      <p className="display-large text-accent-dark-shade-200/50 font-secondary font-bold mb-3">
        {props.text.num}
      </p>
      <p className="heading-h4 text-black-100 mb-8">{props.text.heading}</p>
      <p className="text-black-100 paragraph-large">{props.text.description}</p>
    </div>
  );
};

export default FeatureCard;
