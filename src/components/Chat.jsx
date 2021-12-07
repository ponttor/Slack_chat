import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessagesWithId, updateChannels } from '../toolkitRedux/toolkitSlice.js';
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
  const text = useSelector((state) => state.rootReducer.toolkit.text);
  const channels = useSelector((state) => state.rootReducer.toolkit.channels);
  const messagesWithId = useSelector((state) => state.rootReducer.toolkit.messagesWithId);
  const activeChannel = useSelector((state) => state.rootReducer.toolkit.activeChannel);

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
      console.log(response.data);
      dispatch(updateMessagesWithId(response.data.messages));
      dispatch(updateChannels(response.data.channels));
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
              channels={channels}
              removeChannel={removeChannel}
              renameChannel={renameChannel}
              addChannel={addChannel}
            />
          </div>
          <div className="col-md-10">
            <Messages
              messagesWithId={messagesWithId}
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
