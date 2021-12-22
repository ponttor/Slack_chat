import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalStatus: 'null',
    extra: {},
  },
  reducers: {
    updateModalStatus(state, action) {
      state.modalStatus = action.payload;
    },
    updateExtra(state, action) {
      state.extra = action.payload;
    },
  },
});

export default modalSlice;
export const {
  updateModalStatus,
  updateExtra,
} = modalSlice.actions;
