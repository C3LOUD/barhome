import React from 'react';

export default function TestimonialCard(props) {
  return (
    <div>
      <img
        src={props.data.imgSrc}
        alt="customer avatar"
        className="w-16 rounded-full"
      />
      <p className="paragraph-large mb-4 mt-3 font-secondary text-white-100">
        {props.data.text}
      </p>
      <p className="paragraph-large font-primary text-gray-100">
        &mdash; {props.data.name}
      </p>
    </div>
  );
}
