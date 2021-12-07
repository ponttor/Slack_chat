import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toolkitSlice from './toolkitSlice.js';

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

const store = configureStore({
  reducer: { rootReducer },
});

export default store;
