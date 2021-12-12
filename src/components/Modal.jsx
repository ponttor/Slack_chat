import React from 'react';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalText, updateModalStatus, updateExtra } from '../toolkitRedux/modalSlice.jsx';
import 'bootstrap';

export default function Modal({ renderChannels }) {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.rootReducer.channels.channels);
  const modalText = useSelector((state) => state.rootReducer.modal.modalText);
  const extra = useSelector((state) => state.rootReducer.modal.extra);

  function handleSubmit(e) {
    e.preventDefault();
    if (modalText === '') {
      console.log('nothing to send');
      return;
    }
    if (channels.filter((el) => el.name === modalText).length !== 0) {
      console.log('the channel already exists');
      return;
    }
    extra.addChannel(modalText);
    dispatch(updateModalText(''));
    dispatch(updateExtra({}));
  }

  function handleChange(e) {
    dispatch(updateModalText(e.target.value));
  }
  function handleRename(e) {
    e.preventDefault();
    if (modalText === '') {
      return;
    }
    if (channels.filter((el) => el.name === modalText).length !== 0) {
      return;
    }
    extra.renameChannel({ id: extra.id, name: modalText });
    dispatch(updateModalText(''));
    dispatch(updateExtra({ type: 'null' }));
    setTimeout(renderChannels(), 2000);
  }

  function handleRemove(e) {
    e.preventDefault();
    extra.removeChannel({ id: extra.id });
    dispatch(updateExtra({ type: 'null' }));
  }
  return (
    <>
      {extra.type === 'null' && null}

      {extra.type === 'add'
        && <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{i18next.t('modalAddTitle')}</h5>
                <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input autoFocus onChange={handleChange} value={modalText} name="name" aria-label="Имя канала" className="mb-2 form-control" />
                    <div className="invalid feedback" />
                    <div className="d-flex justify-content-end">
                      <button onClick={() => dispatch(updateExtra({}))} type="button" className="btn btn-secondary mr-2" data-bs-dismiss="modal">{i18next.t('modalCancel')}</button>
                      <button type="submit" className="btn btn-primary">{i18next.t('modalSubmit')}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}

      {extra.type === 'rename'
        && <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{i18next.t('modalRenameTitle')}</h5>
                <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form onSubmit={handleRename}>
                  <div className="form-group">
                    <input autoFocus onChange={handleChange} value={modalText} name="name" aria-label="Имя канала" className="mb-2 form-control" />
                    <div className="invalid feedback" />
                    <div className="d-flex justify-content-end">
                      <button onClick={() => dispatch(updateModalStatus('null'))} type="button" className="btn btn-secondary mr-2" data-bs-dismiss="modal">{i18next.t('modalCancel')}</button>
                      <button type="submit" className="btn btn-primary">{i18next.t('modalSubmit')}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}

      {extra.type === 'delete'
        && <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{i18next.t('modalDeleteTitle')}</h5>
                <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form onSubmit={handleRemove}>
                  <div className="form-group">
                    <label>{i18next.t('modalDeleteQuestion')}</label>
                    <div className="invalid feedback" />
                    <div className="d-flex justify-content-end">
                      <button onClick={() => dispatch(updateModalStatus('null'))} type="button" className="btn btn-secondary mr-2" data-bs-dismiss="modal">{i18next.t('modalCancel')}</button>
                      <button type="submit" className="btn btn-primary">{i18next.t('modalDelete')}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}
