import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel } from './channelsSlice.jsx';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },

  reducers: {
    addNewMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
    updateMessages(state, { payload }) {
      const { messages } = payload;
      state.messages = messages;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteChannel, (state, { payload }) => {
      const { channelId } = payload;
      const filteredMessages = state.messages
        .filter((item) => Number(item.channelId) !== channelId);
      state.messages = filteredMessages;
    });
  },
});

export default messagesSlice;
const { addNewMessage, updateMessages } = messagesSlice.actions;

export { addNewMessage, updateMessages };
