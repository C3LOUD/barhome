import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';

import tempAvatar from '../../assets/7007892.png';
import { removeComment } from '../../utils/api-list';
import Icon from '../ui/Icon';

const Comment = (props) => {
  const { mutate } = removeComment();
  const queryClient = useQueryClient();

  const date = new Intl.DateTimeFormat(navigator.language, {
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
  }).format(new Date(props.comment.createdAt));

  const removeCommentHandler = () => {
    mutate(
      { post: props.post, comment: props.comment._id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts']);
        },
      }
    );
  };

  const { id } = useSelector((state) => state.admin);

  return (
    <div className="group flex w-full items-start gap-2 px-4">
      <div className="flex items-center gap-1">
        <img
          src={props.comment.user.avatarUrl || tempAvatar}
          alt="commenter avatar"
          className="h-4 w-4 rounded-full"
        />
        <p className="paragraph-xsmall font-secondary font-bold text-black-100">
          {props.comment.user.name}
        </p>
      </div>
      <p className="paragraph-xsmall flex-1 font-secondary text-black-100">
        {props.comment.comment}
      </p>
      {props.comment.user._id === id ? (
        <div className="w-12 cursor-pointer">
          <p className="paragraph-xsmall w-full font-secondary text-gray-400 group-hover:hidden">
            {date}
          </p>
          <div
            className="hidden text-error group-hover:flex"
            onClick={removeCommentHandler}
          >
            <p className="paragraph-xsmall font-secondary text-error">
              delete?
            </p>
            <Icon name="close-sharp" />
          </div>
        </div>
      ) : (
        <p className=" paragraph-xsmall font-secondary text-gray-400">{date}</p>
      )}
    </div>
  );
};

export default Comment;
