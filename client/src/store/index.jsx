import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import recipeSlice from './recipe-slice';

const store = configureStore({
  reducer: {
    recipe: recipeSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
