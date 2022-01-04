import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    updateChannels(state, action) {
      state.channels = action.payload.channels;
      // state.channels = action.payload.id;
    },
    updateChannel(state, action) {
      state.channels.map((element) => {
        if (element.id === action.payload.channelId) {
          return { name: action.payload.name, removable: true, id: action.payload.channelId };
        }
        return element;
      });
    },
    addNewChannel(state, { payload: channel }) {
      console.log(`channel: ${channel}`);
      state.channels.push(channel);
    },
    deleteChannel(state, action) {
      state.channels = state.channels.filter((element) => element.id !== action.payload.channelId);
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
