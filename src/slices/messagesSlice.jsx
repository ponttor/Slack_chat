import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },

  reducers: {
    addNewMessage(state, action) {
      state.messages.push(action.payload.message);
    },
    updateMessages(state, action) {
      state.messages = action.payload.messages;
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
