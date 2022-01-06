import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },

  reducers: {
    addNewMessage(state, { payload: message }) {
      state.messages.push(message);
    },
    updateMessages(state, { payload: messages }) {
      state.messages = messages;
    }
  },
});

export default messagesSlice;
const {
  addNewMessage,
  updateMessages,
} = messagesSlice.actions;

export {
  addNewMessage,
  updateMessages,
};
