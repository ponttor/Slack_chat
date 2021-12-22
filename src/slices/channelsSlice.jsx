import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    updateChannels(state, action) {
      state.channels = action.payload;
    },
    updateChannel(state, action) {
      state.channels.map((element) => {
        if (element.id === action.payload.id) {
          return action.payload;
        }
        return element;
      });
    },
    addNewChannel(state, action) {
      state.channels.push(action.payload);
    },
    deleteChannel(state, action) {
      state.channels = state.channels.filter((element) => element.id !== action.payload);
    },
  },
});

export default channelsSlice;
export const {
  updateChannel,
  updateChannels,
  addNewChannel,
  deleteChannel,
} = channelsSlice.actions;
