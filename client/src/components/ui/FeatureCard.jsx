import React from 'react';

const FeatureCard = (props) => {
  return (
    <div>
      <p className="display-large 2xs:display-small mb-3 font-secondary font-bold text-accent-dark-shade-200/50 2xs:mb-2">
        {props.text.num}
      </p>
      <p className="heading-h4 2xs:heading-h5 mb-8 text-black-100 2xs:mb-4">
        {props.text.heading}
      </p>
      <p className="paragraph-large 2xs:paragraph-medium text-black-100">
        {props.text.description}
      </p>
    </div>
  );
};

export default FeatureCard;
