import { combineReducers } from '@reduxjs/toolkit';
import modalSlice from './modalSlice.jsx';
import channelsSlice from './channelsSlice.jsx';
import messagesSlice from './messagesSlice.jsx';

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
});

export default rootReducer;
