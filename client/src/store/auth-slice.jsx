import { createSlice } from '@reduxjs/toolkit';

const initialUserData = {
  token: '',
  isLoggedIn: false,
  remainingTime: 0,
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const remainingDuration = expirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 300000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

let logoutTimer;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserData,
  reducers: {
    loginFn(state, action) {
      const data = retrieveStoredToken();
      if (!data && !action.payload) return;
      state.token = data ? data.token : action.payload.token;
      !data && localStorage.setItem('token', action.payload.token);
      !data &&
        localStorage.setItem('expirationTime', action.payload.expirationTime);

      state.isLoggedIn = true;
      state.remainingTime = data
        ? data.duration
        : calculateRemainingTime(action.payload.expirationTime);
    },
    logoutFn(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    },
  },
});

export const login = (user) => {
  return async (dispatch, getState) => {
    await dispatch(authActions.loginFn(user));
    const state = getState();
    if (!state.auth.token) return;
    logoutTimer = setTimeout(() => {
      dispatch(authActions.logoutFn());
    }, state.auth.remainingTime);
  };
};

export const authActions = authSlice.actions;

export default authSlice;
