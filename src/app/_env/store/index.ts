import { favoritesReducer } from '@albomoni/features/add-to-favorites/model/favorites-store';
import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from '@albomoni/shared/lib/providers/modal/model/modal.slice';
import { sessionReducer } from './session-store';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    favorites: favoritesReducer,
    modal: modalReducer,
  },
});
