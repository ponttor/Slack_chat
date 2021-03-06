import React from 'react';
import {
  Switch, Route, BrowserRouter,
} from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Login from './Login.jsx';
import Page404 from './NotFoundPage.jsx';
import Chat from './Chat.jsx';
import Nav from './Nav.jsx';
import Signup from './Signup.jsx';
import AuthProvider from './AuthProvider.jsx';
import {
  addNewChannel,
  deleteChannel,
  updateChannel,
} from '../slices/channelsSlice.jsx';
import { addNewMessage } from '../slices/messagesSlice.jsx';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  window.socket = socket;
  socket.on('newMessage', (message) => {
    dispatch(addNewMessage({ message }));
  });
  socket.on('newChannel', (data) => {
    dispatch(addNewChannel({ newChannel: data }));
  });
  socket.on('removeChannel', (data) => {
    dispatch(deleteChannel({ channelId: data.id }));
  });
  socket.on('renameChannel', ({ name, id }) => {
    dispatch(updateChannel({ channelId: id, name }));
  });

  // const notify = () => toast('Wow so easy!');
  const sendMessage = ({ message, channel, channelId }) => {
    // notify();
    if (socket.connected) {
      socket.emit('newMessage', { message, channel, channelId });
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

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <Router history={history}> */}
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
          {/* </Router> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
