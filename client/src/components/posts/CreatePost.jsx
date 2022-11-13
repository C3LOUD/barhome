import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import tempAvatar from '../../assets/7007892.jpg';
import { adminActions } from '../../store/admin-slice';
import { createPost } from '../../utils/api-list';

const CreatePost = (props) => {
  const { id } = useParams();
  const { name, avatar } = useSelector((state) => state.admin);
  const [inputContent, setInputContent] = useState(null);

  const navigate = useNavigate();

  const { mutate, isLoading } = createPost();
  const dispatch = useDispatch();

  const titleRef = useRef();

  const inputContentHandler = (e) => {
    setInputContent(e.target.value);
  };

  const submitHandler = (e) => {
    if (contentLength > 280) return;
    const formData = {
      title: titleRef.current.value,
      image: props.canvas,
      content: inputContent,
      cocktail: id,
    };
    mutate(formData, {
      onSuccess: (data) => {
        dispatch(adminActions.updatePost(data.post));
        navigate('/dashboard/posts');
      },
    });
  };

  const contentLength = useMemo(
    () => inputContent?.trim().split(' ').join('').length,
    [inputContent]
  );

  useEffect(() => {
    titleRef.current.value = id;
  }, []);

  if (isLoading)
    return <div className="w-full grid grid-cols-2 gap-6">Loading</div>;

  return (
    <div className="w-full grid grid-cols-2 gap-6">
      <img
        src={props.canvas}
        alt="cropped image"
        className="inline-block aspect-square"
      />
      <div className="flex flex-col max-w-sm mr-6 gap-4">
        <div
          className={`bg-white-400 rounded relative min-h-[20rem] flex flex-col`}
        >
          <div className="flex items-center gap-2 px-4 py-2">
            <img
              src={avatar || tempAvatar}
              alt="user avatar"
              className="rounded-full aspect-square w-8 "
            />
            <p className="font-secondary text-black-100 paragraph-small font-semibold">
              {name}
            </p>
          </div>
          <textarea
            name="content"
            placeholder="input some text"
            className="flex-1 font-secondary paragraph-small text-black-100 font-bold bg-transparent w-full h-full focus:outline-none resize-none border-t-2 py-2 px-2 placeholder:text-gray-200 inline-block"
            onChange={inputContentHandler}
          />
          <span
            className={`font-secondary font-normal ${
              contentLength > 280 ? 'text-error' : 'text-gray-200'
            } z-20 absolute bottom-2 right-2`}
          >{`${contentLength || 0}/280`}</span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="paragraph-xsmall font-secondary font-bold text-accent-dark-main"
          >
            Cocktail Name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Name Your Masterpiece"
            ref={titleRef}
            maxLength="72"
            className="bg-white-400 rounded focus:outline-none px-4 py-2 font-primary font-bold heading-h6 text-black-100 placeholder:text-gray-200"
          />
        </div>
        <a
          className={`px-4 py-2 rounded paragraph-xsmall font-bold text-white-100 w-fit ${
            contentLength > 280
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer bg-primary-main hover:bg-primary-tint-200'
          }`}
          onClick={submitHandler}
        >
          SUBMIT
        </a>
      </div>
    </div>
  );
};

export default CreatePost;
