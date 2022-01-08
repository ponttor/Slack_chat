import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: 'none',
    extra: {},
  },
  reducers: {
    openModal(state, { payload }) {
      const { modalType } = payload;
      state.type = modalType;
      state.isOpened = true;
    },
    closeModal(state) {
      state.type = 'none';
      state.isOpened = false;
    },
    updateExtra(state, { payload }) {
      const {
        addChannel, removeChannel, renameChannel, id,
      } = payload;
      state.extra.addChannel = addChannel;
      state.extra.removeChannel = removeChannel;
      state.extra.renameChannel = renameChannel;
      state.extra.id = id;
    },
  },
});

export default modalSlice;
export const { openModal, closeModal, updateExtra } = modalSlice.actions;
