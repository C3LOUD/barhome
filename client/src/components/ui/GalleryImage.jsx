import React from 'react';

export default function GalleryImage(props) {
  return (
    <div className="overflow-hidden">
      <img
        src={props.imgSrc}
        alt="gallery"
        className="transition-all hover:scale-110"
      />
    </div>
  );
}
