import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },

  reducers: {
    updateMessages(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export default messagesSlice;
const {
  updateMessages,
} = messagesSlice.actions;

export {
  updateMessages,
};
