/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  isPending: true,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
    setIsPending: (state, { payload }) => {
      state.isPending = payload;
    },
  },
});

export const { reducer: favoritesReducer } = favoritesSlice;
