import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import { adminActions } from '../store/admin-slice';
import { login } from '../store/auth-slice';
import { getUser } from '../utils/api-list';

export default function ProtectedRoute({ children }) {
  const [initialize, setInitialize] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data } = getUser();

  useEffect(() => {
    if (!data) return;
    dispatch(
      adminActions.setUser({
        id: data.id,
        name: data.name,
        imgUrl: data.imgUrl,
        saved: data.saved,
        liked: data.liked,
        posts: data.posts,
      }),
    );
  }, [data]);

  useEffect(() => {
    dispatch(login());
    setInitialize(true);
  }, []);

  if (!initialize) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children || <Outlet />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
