import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deletePost } from '../../utils/api-list';
import CloseBtn from '../ui/CloseBtn';
import Loading from '../ui/Loading';
import ModalCard from '../ui/ModalCard';
import BtnPost from './BtnPost';
import Dropzone from './Dropzone';
import EditPost from './EditPost';
import ImageCropper from './ImageCropper';

const PostEditor = () => {
  const [status, setStatus] = useState(3);
  const [imageSrc, setImageSrc] = useState(null);
  const [tempImageSrc, setTempImageSrc] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = deletePost();

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

  const deleteHandler = (e) => {
    e.preventDefault();
    mutate(
      { _id: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts']);
          navigate('/dashboard/posts');
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-accent-dark-shade-700/80">
        <Loading />
      </div>
    );

  return (
    <ModalCard>
      <p className="display-small pb-6 font-primary font-bold text-black-100">
        Edit Post
      </p>
      {status !== 1 && imageSrc && (
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
      {status === 3 && (
        <>
          <CloseBtn />
          <EditPost canvas={tempImageSrc} onEdit={() => setStatus(1)} />
          <a
            className="mt-6 cursor-pointer rounded bg-error/30 px-4 py-2 text-white-100 shadow-md transition-all hover:bg-error"
            onClick={deleteHandler}
          >
            Delete Post
          </a>
        </>
      )}
    </ModalCard>
  );
};

export default PostEditor;
