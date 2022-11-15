import React from 'react';

const TestimonialCard = (props) => {
  return (
    <div>
      <img
        src={props.data.imgSrc}
        alt="customer avatar"
        className="rounded-full w-16"
      />
      <p className="text-white-100 font-secondary paragraph-large mb-4 mt-3">
        {props.data.text}
      </p>
      <p className="text-gray-100 font-primary paragraph-large">
        &mdash; {props.data.name}
      </p>
    </div>
  );
};

export default TestimonialCard;
