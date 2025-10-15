/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { EModalStates } from './modal-states.enum';

const initialState: {
  modalState: EModalStates;
  modalData: any;
} = {
  modalState: EModalStates.NULL,
  modalData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState: (state, { payload }) => {
      state.modalState = payload;
    },
    setModalData: (state, { payload }) => {
      state.modalData = payload;
    },
  },
});

export const { reducer: modalReducer } = modalSlice;
