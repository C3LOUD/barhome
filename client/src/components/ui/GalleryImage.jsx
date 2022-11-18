import React from 'react';

const GalleryImage = (props) => {
  return (
    <div className="overflow-hidden">
      <img
        src={props.imgSrc}
        alt="gallery image"
        className="transition-all hover:scale-110"
      />
    </div>
  );
};

export default GalleryImage;
