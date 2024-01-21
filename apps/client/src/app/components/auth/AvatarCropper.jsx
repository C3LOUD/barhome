import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
      className="bg-white-100 relative flex h-[47rem] w-[60rem] cursor-default flex-col items-center rounded px-6 py-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onEdit}
        className="text-black-100 absolute right-2 top-2 flex text-4xl transition-all hover:scale-110"
      >
        <ion-icon name="close" />
      </button>
      {status === 1 && (
        <Dropzone onSrc={getImageHandler} onStatus={changeStatus} />
      )}
      {status === 2 && (
        <>
          <button
            type="button"
            onClick={() => setStatus(1)}
            className="text-black-100 absolute left-2 top-2 flex text-4xl transition-all hover:scale-110"
          >
            <ion-icon name="arrow-back" />
          </button>
          <ImageCropper src={imageSrc} onCanvas={tempCropHandler} />
          <a
            onClick={cropHandler}
            className="bg-primary-main text-white-100 hover:bg-primary-tint-200 mt-4 cursor-pointer rounded px-4 py-2"
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
