import React, { useState } from 'react';
import CloseBtn from '../ui/CloseBtn';

import ModalCard from '../ui/ModalCard';
import BtnPost from './BtnPost';
import CreatePost from './CreatePost';
import Dropzone from './Dropzone';
import ImageCropper from './ImageCropper';

export default function NewPost() {
  const [status, setStatus] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [tempImageSrc, setTempImageSrc] = useState(null);

  const canvasHandler = (canvas) => {
    setTempImageSrc(canvas);
  };

  const getImageHandler = (src) => {
    setImageSrc(src);
  };

  const changeStatus = (status) => {
    setStatus(status);
  };

  const backHandler = () => {
    setStatus((prev) => --prev);
  };

  const forwardHandler = () => {
    setStatus((prev) => ++prev);
  };

  return (
    <ModalCard>
      <p className="display-small pb-6 font-primary font-bold text-black-100">
        Add New Post
      </p>
      {status === 1 && !imageSrc && <CloseBtn />}
      {status !== 1 && (
        <BtnPost
          onClick={backHandler}
          absPosition="left-5 top-5"
          text="Previous"
          type="arrow-back-sharp"
        />
      )}
      {status !== 3 && imageSrc && (
        <BtnPost
          onClick={forwardHandler}
          absPosition="right-5 top-5"
          text="Next"
          type="arrow-forward-sharp"
        />
      )}
      {status === 1 && (
        <Dropzone onSrc={getImageHandler} onStatus={changeStatus} />
      )}
      {status === 2 && <ImageCropper src={imageSrc} onCanvas={canvasHandler} />}
      {status === 3 && <CreatePost canvas={tempImageSrc} />}
    </ModalCard>
  );
}
