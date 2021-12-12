import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessages } from '../toolkitRedux/messagesSlice.jsx';
import { updateChannels } from '../toolkitRedux/channelsSlice.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import 'bootstrap';

const Chat = ({
  sendMessage,
  removeChannel,
  renameChannel,
  addChannel,
}) => {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.rootReducer.messages.text);
  const activeChannel = useSelector((state) => state.rootReducer.channels.activeChannel);

  const apiUrl = '/api/v1/data';

  const renderInitialData = async () => {
    const token = localStorage.getItem('token');
    const authAxios = axios.create({
      baseUrl: apiUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const response = await authAxios.get(apiUrl);
      dispatch(updateChannels(response.data.channels));
      dispatch(updateMessages(response.data.messages));
    } catch (err) {
      console.log(err.response.statusText);
    }
  };

  useEffect(() => {
    renderInitialData();
  }, []);

  return (
    <>
      <div className="container bg-light mt-4">
        <div className="row">
          <div className="col-md-2">
            <Channels
              activeChannel={activeChannel}
              removeChannel={removeChannel}
              renameChannel={renameChannel}
              addChannel={addChannel}
            />
          </div>
          <div className="col-md-10">
            <Messages
              activeChannel={activeChannel}
              text={text}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
