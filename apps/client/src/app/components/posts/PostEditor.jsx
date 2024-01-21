import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDeletePost } from '../../utils/api-list';
import CloseBtn from '../ui/CloseBtn';
import Loading from '../ui/Loading';
import ModalCard from '../ui/ModalCard';
import BtnPost from './BtnPost';
import Dropzone from './Dropzone';
import EditPost from './EditPost';
import ImageCropper from './ImageCropper';

export default function PostEditor() {
  const [status, setStatus] = useState(3);
  const [imageSrc, setImageSrc] = useState(null);
  const [tempImageSrc, setTempImageSrc] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeletePost();

  const canvasHandler = (canvas) => {
    setTempImageSrc(canvas);
  };

  const getImageHandler = (src) => {
    setImageSrc(src);
  };

  const changeStatus = (s) => {
    setStatus(s);
  };

  const backHandler = () => {
    setStatus((p) => p - 1);
  };

  const forwardHandler = () => {
    setStatus((p) => p + 1);
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
      },
    );
  };

  if (isLoading) {
    return (
      <div className="bg-accent-dark-shade-700/80 absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <ModalCard>
      <p className="display-small font-primary text-black-100 pb-6 font-bold">
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
          <button
            className="bg-error/30 text-white-100 hover:bg-error mt-6 cursor-pointer rounded px-4 py-2 shadow-md transition-all"
            onClick={deleteHandler}
          >
            Delete Post
          </button>
        </>
      )}
    </ModalCard>
  );
}
