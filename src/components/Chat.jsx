import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInitialMessages } from "../slices/messagesSlice.jsx";
import { setInitialChannels } from "../slices/channelsSlice.jsx";
import Channels from "./Channels.jsx";
import Messages from "./Messages.jsx";
import AuthContext from "../AuthContext";
import "bootstrap";

const Chat = ({ sendMessage, removeChannel, renameChannel, addChannel }) => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const apiUrl = "/api/v1/data";

  const renderInitialData = async () => {
    const token = localStorage.getItem("token");
    const authAxios = axios.create({
      baseUrl: apiUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const response = await authAxios.get(apiUrl);
      dispatch(setInitialChannels({ channels: response.data.channels }));
      dispatch(setInitialMessages({ messages: response.data.messages }));
    } catch (err) {
      // console.log(err.response.statusText);
    }
  };

  useEffect(() => {
    renderInitialData();
  }, []);
  return (
    <>
      {!isAuthenticated && history.push("/login")}
      <div className="container bg-light mt-4">
        <div className="row">
          <div className="col-md-2">
            <Channels
              removeChannel={removeChannel}
              renameChannel={renameChannel}
              addChannel={addChannel}
            />
          </div>
          <div className="col-md-10">
            <Messages sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
