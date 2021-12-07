import React from 'react';
import i18next from 'i18next';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateText } from '../toolkitRedux/toolkitSlice.js';

export default function Messages({
  messagesWithId,
  activeChannel,
  text,
  sendMessage,
}) {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.rootReducer.toolkit.channels);

  const displayMessages = () => {
    if (messagesWithId.length === 0) {
      console.log('no messages');
      return null;
    }
    return (
      <div>
        {messagesWithId
          .filter((el) => el.channel === activeChannel)
          .map((el) => <div key={el.id}>{el.message}</div>)}
      </div>
    );
  };

  const handleChange = (e) => {
    dispatch(updateText(e.target.value));
  };

  function handleSubmit(e) {
    e.preventDefault();
    toast('Wow so easy!');
    console.log('console');
    if (text === '') {
      console.log('nothing to send');
      return;
    }
    sendMessage({ text, channel: activeChannel });
    dispatch(updateText(''));
  }

  return (
    <div>
      <div className="bg-white d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3">
          <p className="m-0"><b>{activeChannel}</b></p>
          <span className="text-muted">количество сообщений</span>
        </div>
        <div className="bg-white chat-messages overflow-auto px-5">
          {displayMessages()}
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleSubmit} noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input value={text} onChange={handleChange} className="border-0 p-0 ps-2 form-control" placeholder={i18next.t('input')} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
