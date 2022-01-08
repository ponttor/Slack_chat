import React from 'react';
import i18next from 'i18next';
import 'popper.js';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/index.js';
import resources from './locales/index.js';
import App from './components/App.jsx';

export default async () => {
  // if (process.env.NODE_ENV !== 'production') {
  //   localStorage.debug = 'chat:*';
  // }

  const socket = io();
  const store = configureStore({
    reducer: { rootReducer },
  });

  await i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  ReactDOM.render(
    <Provider store={store}>
      <App socket={socket} />
    </Provider>,
    document.getElementById('chat'),
  );
};
