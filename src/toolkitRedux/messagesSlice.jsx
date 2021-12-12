import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    text: '',
    messages: [],
  },

  reducers: {
    updateText: (state, action) => {
      state.text = action.payload;
    },
    updateMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export default messagesSlice;
const {
  updateMessages,
  updateText,
} = messagesSlice.actions;

export {
  updateText,
  updateMessages,
};
