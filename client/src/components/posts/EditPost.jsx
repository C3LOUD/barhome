import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import tempAvatar from '../../assets/7007892.png';
import { editPost, fetchPost } from '../../utils/api-list';
import Icon from '../ui/Icon';
import Loading from '../ui/Loading';

export default function CreatePost({ canvas, onEdit }) {
  const { id } = useParams();
  const [inputContent, setInputContent] = useState(null);

  const { data } = fetchPost(id);

  const navigate = useNavigate();

  const { mutate, isLoading } = editPost();

  const titleRef = useRef();
  const contentRef = useRef();

  const inputContentHandler = (e) => {
    setInputContent(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (contentLength > 280) return;
    const formData = {
      _id: id,
      title: titleRef.current.value || data.post.cocktail.title,
      image: canvas || data.post.imageUrl,
      content: inputContent,
    };
    mutate(formData, {
      onSuccess: () => {
        navigate('/dashboard/posts');
      },
    });
  };

  const contentLength = useMemo(
    () => inputContent?.trim().split(' ').join('').length,
    [inputContent],
  );

  useEffect(() => {
    titleRef.current.value = data?.post.title;
    contentRef.current.value = data?.post.content;
    setInputContent(data?.post.content);
  }, [data]);

  if (isLoading)
    return (
      <div className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-accent-dark-shade-700/80">
        <Loading />
      </div>
    );

  return (
    <div className="grid w-full grid-cols-2 gap-6 2xs:grid-cols-1 2xs:gap-4 2xs:px-4">
      <div className="relative aspect-square">
        <img
          src={canvas || data?.post.imageUrl}
          alt="cropped"
          className="h-full w-full"
        />
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2">
          <Icon
            name="camera"
            style="text-5xl text-primary-main bg-white-100/50 px-4 py-4 rounded-full hover:bg-white-100 cursor-pointer"
            onClick={onEdit}
          />
        </div>
      </div>
      <div className="mr-6 flex max-w-sm flex-col gap-4 2xs:mr-0 2xs:max-w-full">
        <div className="relative flex min-h-[20rem] flex-col rounded bg-white-400">
          <div className="flex items-center gap-2 px-4 py-2">
            <img
              src={data?.post.creator.avatarUrl || tempAvatar}
              alt="user avatar"
              className="aspect-square w-8 rounded-full "
            />
            <p className="paragraph-small font-secondary font-semibold text-black-100">
              {data?.post.creator.name}
            </p>
          </div>
          <textarea
            name="content"
            placeholder="input some text"
            className="paragraph-small inline-block h-full w-full flex-1 resize-none border-t-2 bg-transparent py-2 px-2 font-secondary font-bold text-black-100 placeholder:text-gray-200 focus:outline-none"
            onChange={inputContentHandler}
            ref={contentRef}
          />
          <span
            className={twMerge(
              'absolute bottom-2 right-2 z-20 font-secondary font-normal',
              contentLength > 280 ? 'text-error' : 'text-gray-200',
            )}
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
            className="heading-h6 rounded bg-white-400 px-4 py-2 font-primary font-bold text-black-100 placeholder:text-gray-200 focus:outline-none"
          />
        </div>
        <a
          className={twMerge(
            'paragraph-xsmall w-fit rounded px-4 py-2 font-bold text-white-100 2xs:w-full 2xs:text-center',
            contentLength > 280
              ? 'cursor-not-allowed bg-gray-400'
              : 'cursor-pointer bg-primary-main hover:bg-primary-tint-200',
          )}
          onClick={submitHandler}
        >
          SUBMIT
        </a>
      </div>
    </div>
  );
}
