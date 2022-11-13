import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import adminSlice from './admin-slice';

const store = configureStore({
  reducer: {
    admin: adminSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
