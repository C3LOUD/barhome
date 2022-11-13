import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { adminActions } from '../../store/admin-slice';
import { deletePost } from '../../utils/api-list';
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

  const { mutate, isLoading } = deletePost();
  const dispatch = useDispatch();

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
          dispatch(adminActions.removePost(id));
          navigate('/dashboard/posts');
        },
      }
    );
  };

  if (isLoading)
    return <div className="w-full grid grid-cols-2 gap-6">Loading</div>;

  return (
    <ModalCard>
      <p className="font-primary display-small font-bold text-black-100 pb-6">
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
        <EditPost canvas={tempImageSrc} onEdit={() => setStatus(1)} />
      )}
      <a
        className="transition-all mt-6 bg-error/30 px-4 py-2 rounded text-white-100 cursor-pointer shadow-md hover:bg-error"
        onClick={deleteHandler}
      >
        Delete Post
      </a>
    </ModalCard>
  );
};

export default PostEditor;
