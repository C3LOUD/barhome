import { useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import tempAvatar from '../../../assets/7007892.png';
import { useRemoveComment } from '../../utils/api-list';

export default function Comment({ comment, post }) {
  const { mutate } = useRemoveComment();
  const queryClient = useQueryClient();

  const date = new Intl.DateTimeFormat(navigator.language, {
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
  }).format(new Date(comment.createdAt));

  const removeCommentHandler = () => {
    mutate(
      { post, comment: comment._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts']);
        },
      },
    );
  };

  const { id } = useSelector((state) => state.admin);

  return (
    <div className="group flex w-full items-start gap-2 px-4">
      <div className="flex items-center gap-1">
        <img
          src={comment.user.avatarUrl || tempAvatar}
          alt="commenter avatar"
          className="h-4 w-4 rounded-full"
        />
        <p className="paragraph-xsmall font-secondary text-black-100 font-bold">
          {comment.user.name}
        </p>
      </div>
      <p className="paragraph-xsmall font-secondary text-black-100 flex-1">
        {comment.comment}
      </p>
      {comment.user._id === id ? (
        <div className="w-12 cursor-pointer">
          <p className="paragraph-xsmall font-secondary w-full text-gray-400 group-hover:hidden">
            {date}
          </p>
          <div
            className="text-error hidden group-hover:flex"
            onClick={removeCommentHandler}
          >
            <p className="paragraph-xsmall font-secondary text-error flex">
              delete?
            </p>
            <ion-icon name="close-sharp" />
          </div>
        </div>
      ) : (
        <p className=" paragraph-xsmall font-secondary text-gray-400">{date}</p>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    comment: PropTypes.string,
    user: PropTypes.shape({
      _id: PropTypes.string,
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  post: PropTypes.string.isRequired,
};
