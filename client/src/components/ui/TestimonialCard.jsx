import React from 'react';
import PropTypes from 'prop-types';

export default function TestimonialCard({ data }) {
  return (
    <div>
      <img
        src={data.imgSrc}
        alt="customer avatar"
        className="w-16 rounded-full"
      />
      <p className="paragraph-large mb-4 mt-3 font-secondary text-white-100">
        {data.text}
      </p>
      <p className="paragraph-large font-primary text-gray-100">
        {`&mdash; ${data.name}`}
      </p>
    </div>
  );
}

TestimonialCard.propTypes = {
  data: PropTypes.shape({
    imgSrc: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
