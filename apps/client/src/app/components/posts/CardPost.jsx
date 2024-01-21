import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import tempAvatar from '../../../assets/7007892.png';
import { adminActions } from '../../store/admin-slice';
import { useAddComment, useLikedPost } from '../../utils/api-list';
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

  const { mutate: likedPostMutate } = useLikedPost();
  const { mutate: addCommentMutate, isLoading: addCommentIsLoading } =
    useAddComment();

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
    <div className="bg-white-100 2xs:w-full w-[28.5rem] shrink-0 overflow-hidden rounded dark:shadow-md">
      <div className="flex justify-between px-4 pt-4">
        <div className="flex h-full items-center gap-2">
          <img
            src={creator.avatarUrl || tempAvatar}
            alt="creator avatar"
            className="inline-block h-6 rounded-full"
          />
          <p className="paragraph-small font-secondary text-black-100 font-semibold">
            {creator.name}
          </p>
        </div>
        {myPosts.some((post) => post === _id) && (
          <Link
            className="text-primary-main flex items-center"
            to={`/dashboard/posts/${_id}?mode=post`}
          >
            <ion-icon name="pencil-sharp" />
            <p className="paragraph-small font-secondary font-semibold">Edit</p>
          </Link>
        )}
      </div>
      <div className="2xs:min-h-[6rem] flex min-h-[8rem] flex-col justify-between px-4 py-2">
        <div>
          {content.split(/\n/g).map((contentEl, i) => (
            <p
              key={i}
              className="paragraph-medium font-secondary text-black-100 font-medium"
            >
              {contentEl}
            </p>
          ))}
        </div>
        <p className="paragraph-xsmall font-secondary self-end text-gray-400">
          {date}
        </p>
      </div>
      <div className="text-primary-main flex justify-between px-4 pb-2">
        <Link
          className="heading-h6 font-primary font-bold"
          to={`/dashboard/posts/${cocktail.title}?isEditing=false`}
        >
          {title}
        </Link>
        <button
          type="button"
          className="flex cursor-pointer text-2xl"
          onClick={likedHandler}
        >
          <ion-icon name={checkLiked ? 'heart' : 'heart-outline'} />
        </button>
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
          'bg-white-400 flex justify-between gap-4 px-4 py-4',
          addCommentIsLoading ? 'bg-gray-300' : 'bg-white-400',
        )}
      >
        <input
          className="font-secondary text-black-100 flex-1 bg-transparent font-semibold placeholder:text-gray-300 focus:outline-none"
          placeholder="Leave a comment"
          maxLength="72"
          ref={commentRef}
          onKeyDown={addCommentHandler}
        />
        <button
          type="button"
          onClick={addCommentHandler}
          className="text-black-100 flex cursor-pointer text-2xl transition-all active:scale-90"
        >
          <ion-icon name="send-sharp" />
        </button>
      </div>
    </div>
  );
}

CardPost.propTypes = {
  posts: PropTypes.shape({
    creator: PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }),
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    cocktail: PropTypes.shape({
      title: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.arrayOf({
      _id: PropTypes.string,
    }),
    comments: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
