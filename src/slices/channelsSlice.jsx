import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: 'general',
  },
  reducers: {
    updateChannels(state, { payload: channels }) {
      state.channels = channels;
      // state.channels = action.payload.id;
    },
    updateChannel(state, { payload }) {
      const { name, channelId } = payload;
      state.channels.channels.map((element) => {
        if (element.id === channelId) {
          return { name, removable: true, id: channelId };
        }
        return element;
      });
    },
    addNewChannel(state, { payload }) {
      // const { newChannel } = payload;
      state.channels.channels.push(payload);
    },
    // addChannel(state, action) {
    //   const { payload } = action;
    //   state.channels.push(payload);
    // },
    deleteChannel(state, { payload }) {
      const { channelId } = payload;
      console.log(channelId);
      state.channels.channels = state.channels.channels.filter((element) => element.id !== channelId);
    },
    setActiveChannel(state, { payload }) {
      const { activeChannel } = payload;
      console.log(`act: ${activeChannel}`);
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
