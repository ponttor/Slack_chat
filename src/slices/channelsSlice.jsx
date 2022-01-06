import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: 'general',
  },
  reducers: {
    updateChannels(state, { payload }) {
      const { channels } = payload;
      state.channels = channels;
    },
    updateChannel(state, { payload }) {
      const { name, channelId } = payload;
      state.channels.map((element) => {
        if (element.id === channelId) {
          return { name, removable: true, id: channelId };
        }
        return element;
      });
    },
    addNewChannel(state, { payload }) {
      const { newChannel } = payload;
      state.channels.push(newChannel);
    },
    deleteChannel(state, { payload }) {
      const { channelId } = payload;
      state.channels = state.channels.filter((element) => element.id !== channelId);
    },
    setActiveChannel(state, { payload }) {
      const { activeChannel } = payload;
      state.activeChannel = activeChannel;
    },
  },
});

export default channelsSlice;
export const {
  updateChannel,
  updateChannels,
  addNewChannel,
  deleteChannel,
  setActiveChannel,
} = channelsSlice.actions;
