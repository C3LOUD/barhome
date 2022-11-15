import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import tempAvatar from '../../assets/7007892.jpg';
import { editPost, fetchPost } from '../../utils/api-list';
import Icon from '../ui/Icon';

const CreatePost = (props) => {
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
      image: props.canvas || data.post.imageUrl,
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
    [inputContent]
  );

  useEffect(() => {
    titleRef.current.value = data?.post.title;
    contentRef.current.value = data?.post.content;
    setInputContent(data?.post.content);
  }, [data]);

  if (isLoading)
    return <div className="w-full grid grid-cols-2 gap-6">Loading</div>;

  return (
    <div className="w-full grid grid-cols-2 gap-6">
      <div className="relative">
        <img
          src={props.canvas || data?.post.imageUrl}
          alt="cropped image"
          className="inline-block aspect-square"
        />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2">
          <Icon
            name="camera"
            style="text-5xl text-primary-main bg-white-100/50 px-4 py-4 rounded-full hover:bg-white-100 cursor-pointer"
            onClick={props.onEdit}
          />
        </div>
      </div>
      <div className="flex flex-col max-w-sm mr-6 gap-4">
        <div
          className={`bg-white-400 rounded relative min-h-[20rem] flex flex-col`}
        >
          <div className="flex items-center gap-2 px-4 py-2">
            <img
              src={data?.post.creator.avatarUrl || tempAvatar}
              alt="user avatar"
              className="rounded-full aspect-square w-8 "
            />
            <p className="font-secondary text-black-100 paragraph-small font-semibold">
              {data?.post.creator.name}
            </p>
          </div>
          <textarea
            name="content"
            placeholder="input some text"
            className="flex-1 font-secondary paragraph-small text-black-100 font-bold bg-transparent w-full h-full focus:outline-none resize-none border-t-2 py-2 px-2 placeholder:text-gray-200 inline-block"
            onChange={inputContentHandler}
            ref={contentRef}
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