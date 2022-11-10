import { createSlice } from '@reduxjs/toolkit';

const initialUserData = {
  token: '',
  isLoggedIn: false,
  remainingTime: 0,
  name: '',
  avatar: null,
  saved: [],
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
      state.name = '';
      state.avatar = null;
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    },
    setUser(state, action) {
      state.name = action.payload.name;
      state.avatar = action.payload.imgUrl;
      state.saved = action.payload.saved;
    },
    updateSaved(state, action) {
      if (state.saved.some((el) => el === action.payload)) {
        state.saved = state.saved.filter((el) => el !== action.payload);
      } else {
        state.saved = [...state.saved, action.payload];
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
