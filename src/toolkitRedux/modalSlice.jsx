import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalText: '',
    modalStatus: 'null',
    extra: {},
  },
  reducers: {
    updateModalStatus(state, action) {
      state.modalStatus = action.payload;
    },
    updateModalText(state, action) {
      state.modalText = action.payload;
    },
    updateExtra(state, action) {
      state.extra = action.payload;
    },
  },
});

export default modalSlice;
export const {
  updateModalText,
  updateModalStatus,
  updateExtra,
} = modalSlice.actions;
