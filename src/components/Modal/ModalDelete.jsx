import React, { useState } from 'react';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalStatus, updateExtra } from '../../slices/modalSlice.jsx';

export default function ModalDelete() {
  const dispatch = useDispatch();
  const extra = useSelector((state) => state.rootReducer.modal.extra);

  function handleRemove(e) {
    e.preventDefault();
    extra.removeChannel({ id: extra.id });
    dispatch(updateExtra({ type: 'null' }));
  }
  return (
    <>
      <div className="modal show fade d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{i18next.t('modalDeleteTitle')}</h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleRemove}>
                <div className="form-group">
                  <label>{i18next.t('modalDeleteQuestion')}</label>
                  <div className="invalid feedback" />
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => dispatch(updateModalStatus('null'))}
                      type="button"
                      className="btn btn-secondary mr-2"
                      data-bs-dismiss="modal"
                    >
                      {i18next.t('modalCancel')}
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {i18next.t('modalDelete')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
