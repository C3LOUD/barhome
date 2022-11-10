import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login, authActions } from '../store/auth-slice';
import { getUser } from '../utils/api-list';

const ProtectedRoute = (props) => {
  const [initialize, setInitialize] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data } = getUser();

  useEffect(() => {
    data &&
      dispatch(
        authActions.setUser({
          name: data.name,
          imgUrl: data.imgUrl,
          saved: data.saved,
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
