/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '@albomoni/entities/user/model/user.type';

type Session = {
  user: UserType | null;
  isTokenValid: boolean;
  isPending: boolean;
};

const initialState: Session = {
  user: null,
  isTokenValid: false,
  isPending: true,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setIsTokenValid: (state, { payload }) => {
      state.isTokenValid = payload;
    },
    setIsPending: (state, { payload }) => {
      state.isPending = payload;
    },
  },
});

export const { reducer: sessionReducer } = sessionSlice;
