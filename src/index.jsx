import React from 'react';
import 'core-js/stable/index.js';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime.js';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import '../assets/application.scss';
import store from './toolkitRedux/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
  document.getElementById('chat'),
);
