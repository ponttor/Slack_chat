import React from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import Login from "./Login.jsx";
import Page404 from "./NotFoundPage.jsx";
import Chat from "./Chat.jsx";
import Nav from "./Nav.jsx";
import Signup from "./Signup.jsx";
import {
  addNewChannel,
  deleteChannel,
  updateChannel,
} from "../slices/channelsSlice.jsx";
import { updateMessages } from "../slices/messagesSlice.jsx";

const App = ({ socket }) => {
  const dispatch = useDispatch();
  const history = createBrowserHistory();

  window.socket = socket;
  socket.on("newMessage", (message) => {
    dispatch(updateMessages(message));
  });
  socket.on("newChannel", (data) => {
    dispatch(addNewChannel(data));
  });
  socket.on("removeChannel", (data) => {
    dispatch(deleteChannel(data.id));
  });
  socket.on("renameChannel", ({ id, name }) => {
    dispatch(updateChannel({ id, name }));
  });

  // const notify = () => toast('Wow so easy!');
  const sendMessage = ({ message, channel }) => {
    // notify();
    if (socket.connected) {
      socket.emit("newMessage", { message, channel });
    } else {
      console.log("no connection");
    }
  };

  const addChannel = (data) => {
    if (socket.connected) {
      socket.volatile.emit("newChannel", { name: data });
    } else {
      console.log("no connection");
    }
  };

  function removeChannel({ id }) {
    socket.emit("removeChannel", { id });
  }

  function renameChannel({ id, name }) {
    socket.emit("renameChannel", { id, name });
  }

  return (
    <>
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
    </>
  );
};

export default App;
