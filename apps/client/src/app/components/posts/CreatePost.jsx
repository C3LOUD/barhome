import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

import tempAvatar from '../../../assets/7007892.png';
import { useCreatePost } from '../../utils/api-list';
import Loading from '../ui/Loading';

export default function CreatePost({ canvas }) {
  const { id } = useParams();
  const { name, avatar } = useSelector((state) => state.admin);
  const [inputContent, setInputContent] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCreatePost();

  const titleRef = useRef();

  const inputContentHandler = (e) => {
    setInputContent(e.target.value);
  };

  const contentLength = useMemo(
    () => inputContent?.trim().split(' ').join('').length,
    [inputContent],
  );

  const submitHandler = () => {
    if (contentLength > 280) return;
    const formData = {
      title: titleRef.current.value,
      image: canvas,
      content: inputContent,
      cocktail: id,
    };
    mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        navigate('/dashboard/posts');
      },
    });
  };

  useEffect(() => {
    titleRef.current.value = id;
  }, []);

  if (isLoading) {
    return (
      <div className="bg-accent-dark-shade-700/80 absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="2xs:grid-cols-1 2xs:gap-4 2xs:px-4 grid w-full grid-cols-2 gap-6">
      <img src={canvas} alt="cropped" className="inline-block aspect-square" />
      <div className="2xs:mr-0 2xs:max-w-full mr-6 flex max-w-sm flex-col gap-4">
        <div className="bg-white-400 2xs:rounded-t-none relative flex min-h-[20rem] flex-col rounded">
          <div className="flex items-center gap-2 px-4 py-2">
            <img
              src={avatar || tempAvatar}
              alt="user avatar"
              className="aspect-square w-8 rounded-full "
            />
            <p className="paragraph-small font-secondary text-black-100 font-semibold">
              {name}
            </p>
          </div>
          <textarea
            name="content"
            placeholder="input some text"
            className="paragraph-small font-secondary text-black-100 inline-block h-full w-full flex-1 resize-none border-t-2 bg-transparent px-2 py-2 font-bold placeholder:text-gray-200 focus:outline-none"
            onChange={inputContentHandler}
          />
          <span
            className={twMerge(
              'font-secondary absolute bottom-2 right-2 z-20 font-normal',
              contentLength > 280 ? 'text-error' : 'text-gray-200',
            )}
          >
            {`${contentLength || 0}/280`}
          </span>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="paragraph-xsmall font-secondary text-accent-dark-main font-bold"
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
            className="heading-h6 bg-white-400 font-primary text-black-100 rounded px-4 py-2 font-bold placeholder:text-gray-200 focus:outline-none"
          />
        </div>
        <button
          className={twMerge(
            'paragraph-xsmall text-white-100 w-fit rounded px-4 py-2 font-bold',
            contentLength > 280
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-primary-main hover:bg-primary-tint-200 cursor-pointer',
          )}
          onClick={submitHandler}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

CreatePost.propTypes = {
  canvas: PropTypes.string.isRequired,
};
