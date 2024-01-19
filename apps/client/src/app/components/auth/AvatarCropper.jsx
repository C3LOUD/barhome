import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../ui/Icon';
import Dropzone from '../posts/Dropzone';
import ImageCropper from '../posts/ImageCropper';

export default function AvatarCropper({ onCanvas, onEdit }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState(1);
  const [croppedImg, setCroppedImg] = useState(null);

  const getImageHandler = (src) => {
    setImageSrc(src);
  };

  const changeStatus = (stat) => {
    setStatus(stat);
  };

  const tempCropHandler = (canvas) => {
    setCroppedImg(canvas);
  };

  const cropHandler = () => {
    onCanvas(croppedImg);
    onEdit();
  };

  return (
    <div
      className="relative flex h-[47rem] w-[60rem] cursor-default flex-col items-center rounded bg-white-100 px-6 py-6"
      onClick={(e) => e.stopPropagation()}
    >
      <Icon
        name="close"
        className="absolute top-2 right-2 text-4xl text-black-100 transition-all hover:scale-110"
        onClick={onEdit}
      />
      {status === 1 && (
        <Dropzone onSrc={getImageHandler} onStatus={changeStatus} />
      )}
      {status === 2 && (
        <>
          <Icon
            name="arrow-back"
            className="absolute top-2 left-2 text-4xl text-black-100 transition-all hover:scale-110"
            onClick={() => setStatus(1)}
          />
          <ImageCropper src={imageSrc} onCanvas={tempCropHandler} />
          <a
            onClick={cropHandler}
            className="mt-4 cursor-pointer rounded bg-primary-main px-4 py-2 text-white-100 hover:bg-primary-tint-200"
          >
            Crop
          </a>
        </>
      )}
    </div>
  );
}

AvatarCropper.propTypes = {
  onCanvas: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
