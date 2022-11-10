import Dropzone from './Dropzone';
import React, { useState } from 'react';

import ModalCard from '../ui/ModalCard';
import ImageCropper from './ImageCropper';
import BtnPost from './BtnPost';
import EditPost from './EditPost';

const NewPost = () => {
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
      <p className="font-primary display-small font-bold text-black-100 pb-6">
        Add New Post
      </p>
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
      {status === 3 && <EditPost canvas={tempImageSrc} />}
    </ModalCard>
  );
};

export default NewPost;
