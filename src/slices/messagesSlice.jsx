import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },

  reducers: {
    addNewMessage(state, { payload }) {
      const { message } = payload;
      console.log(message);
      state.messages.push(message);
      const token = localStorage.getItem('user');
      console.log(Object.entries(token));
    },
    updateMessages(state, { payload }) {
      const { messages } = payload;
      state.messages = messages;
    },
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
