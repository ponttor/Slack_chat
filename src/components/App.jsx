import '@popperjs/core';
import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import Login from './Login.jsx';
import Page404 from '../pages/Page404.jsx';
import Chat from './Chat.jsx';
import Nav from './Nav.jsx';
import Signup from './Signup.jsx';
import {
  addNewChannel,
  deleteChannel,
  updateChannel,
} from '../toolkitRedux/channelsSlice.jsx';
import {
  updateMessages,
} from '../toolkitRedux/messagesSlice.jsx';
import AuthContext from '../AuthContext.js';
import resources from '../locales/index.js';

const App = ({ socket }) => {
  i18next.init({
    lng: 'en',
    debug: true,
    resources,
  });

  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

  window.socket = socket;
  socket.on('newMessage', (data) => {
    console.log(data);
    dispatch(updateMessages(data));
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
    dispatch(updateChannel({ id, name }));
  });

  // const notify = () => toast('Wow so easy!');
  const sendMessage = (data) => {
    // notify();
    if (socket.connected) {
      socket.emit('newMessage', data);
    } else {
      console.log('no connection');
    }
  };

  const addChannel = (data) => {
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
    socket.emit('renameChannel', { id, name });
  }

  console.log(isAuth);
  return (
    <Router history={history}>
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
      }}>
        {/* {isAuth
          ? history.replace({ pathname: '/' })
          : history.replace({ pathname: '/login' })} */}
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
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
