import { createSlice } from '@reduxjs/toolkit';

const toolkitSlice = createSlice({
  name: 'toolkit',
  initialState: {
    channels: [],
    text: '',
    modalText: '',
    messagesWithId: [],
    activeChannel: 'general',
    modalStatus: 'null',
    extra: {},
  },
  reducers: {

    updateText: (state, action) => {
      state.text = action.payload;
    },
    updateModalText(state, action) {
      state.modalText = action.payload;
    },
    updateMessagesWithId(state, action) {
      state.messagesWithId = action.payload;
    },
    updateActiveChannel(state, action) {
      state.activeChannel = action.payload;
    },
    updateChannels(state, action) {
      state.channels = action.payload;
    },
    addNewChannel(state, action) {
      state.channels.push(action.payload);
      console.log(state.channels);
    },
    deleteChannel(state, action) {
      state.channels = state.channels.filter((el) => el.id !== action.payload);
    },
    updateModalStatus(state, action) {
      state.modalStatus = action.payload;
    },
    updateExtra(state, action) {
      state.extra = action.payload;
    },
  },
});

export default toolkitSlice.reducer;
export const {
  updateMessagesWithId,
  updateText,
  updateActiveChannel,
  updateChannels,
  addNewChannel,
  updateModalText,
  deleteChannel,
  updateModalStatus,
  updateExtra,
} = toolkitSlice.actions;
