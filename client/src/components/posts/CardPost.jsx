import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import tempAvatar from '../../assets/7007892.png';
import { adminActions } from '../../store/admin-slice';
import { addComment, likedPost } from '../../utils/api-list';
import Icon from '../ui/Icon';
import Comment from './Comment';

export default function CardPost({ posts }) {
  const [checkLiked, setCheckLiked] = useState(false);

  const commentRef = useRef();

  const {
    creator,
    imageUrl,
    title,
    cocktail,
    content,
    createdAt,
    comments,
    _id,
  } = posts;

  const { mutate: likedPostMutate } = likedPost();
  const { mutate: addCommentMutate, isLoading: addCommentIsLoading } =
    addComment();

  const { liked, posts: myPosts } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const date = new Intl.DateTimeFormat(navigator.language).format(
    new Date(createdAt),
  );

  const queryClient = useQueryClient();

  const addCommentHandler = (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    if (!commentRef.current.value) return;
    const commentData = {
      _id,
      comment: commentRef.current.value,
    };
    addCommentMutate(commentData, {
      onSuccess: () => {
        commentRef.current.value = '';
        queryClient.invalidateQueries(['posts']);
      },
    });
  };

  const likedHandler = () => {
    likedPostMutate(
      { id: _id },
      {
        onSuccess: () => {
          dispatch(adminActions.updateLiked(_id.toString()));
        },
      },
    );
  };

  useEffect(() => {
    setCheckLiked(liked.some((el) => el.toString() === _id.toString()));
  }, [liked]);

  return (
    <div className="w-[28.5rem] shrink-0 overflow-hidden rounded bg-white-100 dark:shadow-md 2xs:w-full">
      <div className="flex justify-between px-4 pt-4">
        <div className="flex h-full items-center gap-2">
          <img
            src={creator.avatarUrl || tempAvatar}
            alt="creator avatar"
            className="inline-block h-6 rounded-full"
          />
          <p className="paragraph-small font-secondary font-semibold text-black-100">
            {creator.name}
          </p>
        </div>
        {myPosts.some((post) => post === _id) && (
          <Link
            className="flex items-center text-primary-main"
            to={`/dashboard/posts/${_id}?mode=post`}
          >
            <Icon name="pencil-sharp" />
            <p className="paragraph-small font-secondary font-semibold">Edit</p>
          </Link>
        )}
      </div>
      <div className="flex min-h-[8rem] flex-col justify-between px-4 py-2 2xs:min-h-[6rem]">
        <div>
          {content.split(/\n/g).map((contentEl, i) => (
            <p
              key={i}
              className="paragraph-medium font-secondary font-medium text-black-100"
            >
              {contentEl}
            </p>
          ))}
        </div>
        <p className="paragraph-xsmall self-end font-secondary text-gray-400">
          {date}
        </p>
      </div>
      <div className="flex justify-between px-4 pb-2 text-primary-main">
        <Link
          className="heading-h6 font-primary font-bold"
          to={`/dashboard/posts/${cocktail.title}?isEditing=false`}
        >
          {title}
        </Link>
        <Icon
          name={checkLiked ? 'heart' : 'heart-outline'}
          style="text-2xl cursor-pointer"
          onClick={likedHandler}
        />
      </div>
      <img
        className="transition-all active:scale-[101%]"
        src={imageUrl}
        alt={title}
        onClick={(e) => {
          if (e.detail !== 2) return;
          likedHandler();
        }}
      />
      {comments.length !== 0 && (
        <div className="py-2">
          {comments
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((comment) => (
              <Comment comment={comment} key={comment._id} post={_id} />
            ))}
        </div>
      )}
      <div
        className={twMerge(
          'flex justify-between gap-4 bg-white-400 px-4 py-4',
          addCommentIsLoading ? 'bg-gray-300' : 'bg-white-400',
        )}
      >
        <input
          className="flex-1 bg-transparent font-secondary font-semibold text-black-100 placeholder:text-gray-300 focus:outline-none"
          placeholder="Leave a comment"
          maxLength="72"
          ref={commentRef}
          onKeyDown={addCommentHandler}
        />
        <Icon
          name="send-sharp"
          style="text-2xl text-black-100 cursor-pointer active:scale-90 transition-all"
          onClick={addCommentHandler}
        />
      </div>
    </div>
  );
}
