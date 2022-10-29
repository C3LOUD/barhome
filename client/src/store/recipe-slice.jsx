import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {},
  reducers: {},
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice;
