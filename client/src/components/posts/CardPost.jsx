import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import tempAvatar from '../../assets/7007892.jpg';
import { adminActions } from '../../store/admin-slice';
import { addComment, likedPost } from '../../utils/api-list';
import Icon from '../ui/Icon';
import Comment from './Comment';

const CardPost = (props) => {
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
  } = props.posts;

  const { mutate: likedPostMutate } = likedPost();
  const { mutate: addCommentMutate, isLoading: addCommentIsLoading } =
    addComment();

  const { liked, posts: myposts } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const date = new Intl.DateTimeFormat(navigator.language).format(
    new Date(createdAt)
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
      }
    );
  };

  useEffect(() => {
    setCheckLiked(liked.some((el) => el.toString() === _id.toString()));
  }, [liked]);

  return (
    <div className="w-[28.5rem] bg-white-100 rounded overflow-hidden shrink-0">
      <div className="flex px-4 pt-4 justify-between">
        <div className="flex h-full items-center gap-2">
          <img
            src={creator.avatarUrl || tempAvatar}
            alt="creator avatar"
            className="h-6 rounded-full inline-block"
          />
          <p className="font-secondary paragraph-small font-semibold text-black-100">
            {creator.name}
          </p>
        </div>
        {myposts.some((post) => post === _id) && (
          <Link
            className="flex text-primary-main items-center"
            to={`/dashboard/posts/${_id}?mode=post`}
          >
            <Icon name="pencil-sharp" />
            <p className="font-secondary paragraph-small font-semibold">Edit</p>
          </Link>
        )}
      </div>
      <div className="px-4 py-2 flex flex-col justify-between min-h-[8rem]">
        <div>
          {content.split(/\n/g).map((content, i) => (
            <p
              key={i}
              className="font-secondary paragraph-medium text-black-100 font-medium"
            >
              {content}
            </p>
          ))}
        </div>
        <p className="self-end font-secondary paragraph-xsmall text-gray-400">
          {date}
        </p>
      </div>
      <div className="flex justify-between px-4 pb-2 text-primary-main">
        <Link
          className="font-primary heading-h6 font-bold"
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
      <img src={imageUrl} alt={title + ' image'} />
      {comments && (
        <div className="py-2">
          {comments
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((comment) => (
              <Comment comment={comment} key={comment._id} post={_id} />
            ))}
        </div>
      )}
      <div
        className={`flex justify-between px-4 py-4 gap-4 bg-white-400 ${
          addCommentIsLoading ? 'bg-gray-300' : 'bg-white-400'
        }`}
      >
        <input
          className="bg-transparent focus:outline-none font-secondary font-semibold text-black-100 placeholder:text-gray-300 flex-1"
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
};

export default CardPost;
