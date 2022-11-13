import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { adminActions } from '../store/admin-slice';
import { login } from '../store/auth-slice';
import { getUser } from '../utils/api-list';

const ProtectedRoute = (props) => {
  const [initialize, setInitialize] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data } = getUser();

  useEffect(() => {
    data &&
      dispatch(
        adminActions.setUser({
          id: data.id,
          name: data.name,
          imgUrl: data.imgUrl,
          saved: data.saved,
          liked: data.liked,
          posts: data.posts,
        })
      );
  }, [data]);

  useEffect(() => {
    dispatch(login());
    setInitialize(true);
  }, []);

  if (!initialize) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{props.children ? props.children : <Outlet />}</>;
};

export default ProtectedRoute;
