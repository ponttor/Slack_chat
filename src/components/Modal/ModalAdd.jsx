import React, { useState } from 'react';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateExtra } from '../../slices/modalSlice.jsx';
import { addNewChannel } from '../../slices/channelsSlice.jsx';


export default function ModalAdd({ setIsOpen }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const channels = useSelector((state) => state.rootReducer.channels.channels);
  // console.log(`ch: ${channels}`);
  // console.log(Object.keys(channels));
  const { addChannel } = useSelector((state) => state.rootReducer.modal.extra);

  function handleSubmit(e) {
    e.preventDefault();
    if (text === '') {
      console.log('nothing to send');
      return;
    }
    if (!channels) {
      console.log('no channels');
      return;
    }
    if (channels.filter((el) => el.name === text).length !== 0) {
      console.log('the channel already exists');
      return;
    }
    const lastId = channels.length - 1;
    const nextId = Number(channels[lastId]).id + 1;
    addNewChannel({ channel: { name: text, removable: true, id: nextId }});
    console.log(`text: ${text}`);
    addChannel(text);
    setText('');
    dispatch(updateExtra({}));
    setIsOpen(false);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{i18next.t('modalAddTitle')}</h5>
            <button
              type="button"
              className="btn btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  autoFocus
                  onChange={handleChange}
                  value={text}
                  name="name"
                  aria-label="Имя канала"
                  className="mb-2 form-control"
                />
                <div className="invalid feedback" />
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="btn btn-secondary mr-2"
                    data-bs-dismiss="modal"
                  >
                    {i18next.t('modalCancel')}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {i18next.t('modalSubmit')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
