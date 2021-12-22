import React, { useState } from 'react';
import i18next from 'i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Messages({
  activeChannel,
  sendMessage,
}) {
  const [text, setText] = useState('');
  const messages = useSelector((state) => state.rootReducer.messages.messages);
  const renderMessages = () => {
    if (messages.length === 0) {
      return null;
    }
    return (
      <div>
        {messages
          .filter((el) => el.channel === activeChannel)
          .map((el) => <div key={el.id}>{el.message}</div>)}
      </div>
    );
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    toast('Wow so easy!');
    if (text === '') {
      console.log('nothing to send');
      return;
    }
    sendMessage({ message: text, channel: activeChannel });
    setText('');
  }

  return (
    <div>
      <div className="bg-white d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3">
          <p className="m-0"><b>{activeChannel}</b></p>
          <span className="text-muted">количество сообщений</span>
        </div>
        <div className="bg-white chat-messages overflow-auto px-5">
          {renderMessages()}
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
