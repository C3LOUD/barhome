import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/auth-slice';

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logoutFn());
    navigate('/');
  };

  return (
    <button
      type="button"
      className="heading-h6 xl:paragraph-large bg-secondary-main text-white-100 hover:bg-secondary-tint-100 w-fit cursor-pointer rounded px-4 py-2 font-bold shadow-md"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
