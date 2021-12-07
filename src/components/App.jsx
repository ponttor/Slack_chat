import '@popperjs/core';
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Login from '../pages/Login.jsx';
import Page404 from '../pages/Page404.jsx';
import Chat from './Chat.jsx';
import Nav from './Nav.jsx';
import Signup from './Signup.jsx';
import {
  updateMessagesWithId,
  addNewChannel,
  deleteChannel,
} from '../toolkitRedux/toolkitSlice.js';
import resources from '../locales/index.js';

const App = ({ socket }) => {
  i18next.init({
    lng: 'en',
    debug: true,
    resources,
  });

  const history = createBrowserHistory();
  const dispatch = useDispatch();

  window.socket = socket;
  socket.on('newMessage', (data) => {
    dispatch(updateMessagesWithId(data));
  });
  socket.on('newChannel', (data) => {
    console.log(data);
    dispatch(addNewChannel(data));
  });
  socket.on('removeChannel', (data) => {
    console.log(data.id);
    dispatch(deleteChannel(data.id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    console.log(id);
    console.log(name);
  });

  const notify = () => toast('Wow so easy!');
  const sendMessage = (data) => {
    notify();
    if (socket.connected) {
      socket.emit('newMessage', data);
    } else {
      console.log('no connection');
    }
  };

  const addChannel = (data) => {
    console.log(data);
    if (socket.connected) {
      socket.volatile.emit('newChannel', { name: data });
    } else {
      console.log('no connection');
    }
  };

  function removeChannel({ id }) {
    socket.emit('removeChannel', { id });
  }

  function renameChannel({ id, name }) {
    console.log('rename');
    console.log(id);
    console.log(name);
    socket.emit('renameChannel', { id, name });
  }
  return (
    <Router history={history}>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Chat
            sendMessage={sendMessage}
            addChannel={addChannel}
            removeChannel={removeChannel}
            renameChannel={renameChannel}
          />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="*" component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
