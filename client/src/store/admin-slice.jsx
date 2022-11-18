import { createSlice } from '@reduxjs/toolkit';

const initialAdminData = {
  name: '',
  id: '',
  avatar: null,
  saved: [],
  liked: [],
  posts: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialAdminData,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.avatar = action.payload.imgUrl;
      state.saved = action.payload.saved;
      state.liked = action.payload.liked;
      state.posts = action.payload.posts;
    },
    updateLiked(state, action) {
      if (state.liked.some((el) => el === action.payload)) {
        state.liked = state.liked.filter((el) => el !== action.payload);
      } else {
        state.liked = [...state.liked, action.payload];
      }
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice;
