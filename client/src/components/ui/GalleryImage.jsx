import React from 'react';

const GalleryImage = (props) => {
  return (
    <div className="overflow-hidden">
      <img
        src={props.imgSrc}
        alt="gallery image"
        className="hover:scale-110 transition-all"
      />
    </div>
  );
};

export default GalleryImage;
