import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: 'general',
  },
  reducers: {
    updateActiveChannel(state, action) {
      state.activeChannel = action.payload;
    },
    updateChannels(state, action) {
      state.channels = action.payload;
    },
    updateChannel(state, action) {
      state.channels.map((el) => {
        if (el.id === action.payload.id) {
          return action.payload;
        }
        return el;
      });
    },
    addNewChannel(state, action) {
      state.channels.push(action.payload);
    },
    deleteChannel(state, action) {
      state.channels = state.channels.filter((el) => el.id !== action.payload);
    },
  },
});

export default channelsSlice;
export const {
  updateActiveChannel,
  updateChannel,
  updateChannels,
  addNewChannel,
  deleteChannel,
} = channelsSlice.actions;
