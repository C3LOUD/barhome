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
    updateSaved(state, action) {
      if (state.saved.some((el) => el === action.payload)) {
        state.saved = state.saved.filter((el) => el !== action.payload);
      } else {
        state.saved = [...state.saved, action.payload];
      }
    },
    updateLiked(state, action) {
      if (state.liked.some((el) => el === action.payload)) {
        state.liked = state.liked.filter((el) => el !== action.payload);
      } else {
        state.liked = [...state.liked, action.payload];
      }
    },
    updatePost(state, action) {
      state.posts = state.posts.push(action.payload);
    },
    removePost(state, action) {
      state.posts = state.posts.filter((post) => post !== action.payload);
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice;
