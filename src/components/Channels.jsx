import React from 'react';
import cn from 'classnames';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveChannel } from '../toolkitRedux/channelsSlice.jsx';
import { updateExtra } from '../toolkitRedux/modalSlice.jsx';
import Modal from './Modal.jsx';

export default function Channels({
  activeChannel,
  removeChannel,
  renameChannel,
  addChannel,
}) {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.rootReducer.channels.channels);

  function handleClick(e) {
    e.preventDefault();
    dispatch(updateExtra({ addChannel, type: 'add' }));
  }

  function handleRemoveClick(e) {
    e.preventDefault();
    dispatch(updateExtra({ id: e.target.dataset.id, removeChannel, type: 'delete' }));
  }

  function handleRenameClick(e) {
    e.preventDefault();
    dispatch(updateExtra({ id: e.target.dataset.id, renameChannel, type: 'rename' }));
  }

  const renderChannels = () => {
    if (channels.length === 0) {
      console.log('no channels found');
      return null;
    }
    return channels.map((el) => {
      const classNames = cn('btn btn-light text-left',
        { active: activeChannel === el.name });
      const classNamesDropDown = cn('btn btn-light dropdown-toggle',
        { active: activeChannel === el.name });
      const handleClickChannel = (e) => {
        dispatch(updateActiveChannel(e.target.innerText));
      };
      return (
        <div key={el.id}>
          {!el.removable
            ? <button
              type="button"
              onClick={handleClickChannel}
              className={classNames}
              data-id={el.id}
            >
              {`# ${el.name}`}
            </button>
            : <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
              <button
                type="button"
                onClick={handleClickChannel}
                className={classNames}
                data-id={el.id}
              >
                {`# ${el.name}`}
              </button>
              <div className="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" className={classNamesDropDown} data-bs-toggle="dropdown" aria-expanded="false" />
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li><button data-id={el.id} onClick={handleRemoveClick} type="button" className="dropdown-item">Удалить</button></li>
                  <li><button data-id={el.id} onClick={handleRenameClick} type="button" className="dropdown-item">Переименовать</button></li>
                </ul>
              </div>
            </div>}
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <div className="pt-5 d-flex justify-content-between mb-2">
          <div className="align-self-center">{i18next.t('channels')}</div>
          <button onClick={handleClick} type="button" className="btn m-3 h-25 text-primary border border-primary h-20 align-self-center">+</button>
        </div>
        <div className="btn-group-vertical" role="group">
          {renderChannels()}
        </div>
      </div>
      <Modal renderChannels={renderChannels} />
    </div>
  );
}
