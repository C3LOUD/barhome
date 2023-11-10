import React from 'react';
import PropTypes from 'prop-types';

export default function GalleryImage({ imgSrc }) {
  return (
    <div className="overflow-hidden">
      <img
        src={imgSrc}
        alt="gallery"
        className="transition-all hover:scale-110"
      />
    </div>
  );
}

GalleryImage.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};
