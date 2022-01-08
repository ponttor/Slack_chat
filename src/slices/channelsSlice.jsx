import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: { activeChannelName: 'general', activeChannelId: '1' },
  },
  reducers: {
    updateChannels(state, { payload }) {
      const { channels } = payload;
      state.channels = channels;
    },
    updateChannel(state, { payload }) {
      const { name, channelId } = payload;
      const channel = state.channels.find((c) => c.id === channelId);
      channel.name = name;
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
      const { activeChannelName, activeChannelId } = payload;
      state.activeChannel = {
        activeChannelName, activeChannelId,
      };
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
