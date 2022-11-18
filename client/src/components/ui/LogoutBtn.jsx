import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/auth-slice';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logoutFn());
    navigate('/');
  };

  return (
    <a
      className="heading-h6 xl:paragraph-large w-fit cursor-pointer rounded bg-secondary-main py-2 px-4 font-bold text-white-100 shadow-md hover:bg-secondary-tint-100"
      onClick={logoutHandler}
    >
      Logout
    </a>
  );
};

export default LogoutBtn;
