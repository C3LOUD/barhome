import Dropzone from './Dropzone';
import React, { useState } from 'react';

import ModalCard from '../ui/ModalCard';
import ImageCropper from './ImageCropper';

const NewPost = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const getImageHandler = (src) => {
    setImageSrc(src);
  };

  return (
    <ModalCard>
      <p className="font-primary display-small font-bold text-black-100 pb-6">
        Add New Post
      </p>
      {imageSrc ? (
        <ImageCropper src={imageSrc} />
      ) : (
        <Dropzone onSrc={getImageHandler} />
      )}
    </ModalCard>
  );
};

export default NewPost;
