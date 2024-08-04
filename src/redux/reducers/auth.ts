import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  notificationData: any;
}

const initialState: AuthState = {
  notificationData: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNotificationData: (state, data: PayloadAction<Object>) => {
      state.notificationData = data?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setNotificationData} = authSlice.actions;

export default authSlice.reducer;
