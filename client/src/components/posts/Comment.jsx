import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';

import tempAvatar from '../../assets/7007892.jpg';
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
    <div className="flex px-4 gap-2 items-start w-full group">
      <div className="flex gap-1 items-center">
        <img
          src={props.comment.user.avatarUrl || tempAvatar}
          alt="commenter avatar"
          className="rounded-full h-4 w-4"
        />
        <p className="font-secondary paragraph-xsmall font-bold text-black-100">
          {props.comment.user.name}
        </p>
      </div>
      <p className="font-secondary paragraph-xsmall text-black-100 flex-1">
        {props.comment.comment}
      </p>
      {props.comment.user._id === id ? (
        <div className="cursor-pointer w-12">
          <p className="group-hover:hidden font-secondary paragraph-xsmall text-gray-400 w-full">
            {date}
          </p>
          <div
            className="hidden group-hover:flex text-error"
            onClick={removeCommentHandler}
          >
            <p className="font-secondary paragraph-xsmall text-error">
              delete?
            </p>
            <Icon name="close-sharp" />
          </div>
        </div>
      ) : (
        <p className=" font-secondary paragraph-xsmall text-gray-400">{date}</p>
      )}
    </div>
  );
};

export default Comment;
