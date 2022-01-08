import React from 'react';
import cn from 'classnames';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateExtra, openModal } from '../slices/modalSlice.jsx';
import { setActiveChannel } from '../slices/channelsSlice.jsx';
import Modal from './Modal/Modal.jsx';

export default function Channels({ removeChannel, renameChannel, addChannel }) {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.rootReducer.channels.channels);
  const activeChannel = useSelector((state) => state.rootReducer.channels.activeChannel);

  function handleClick() {
    dispatch(openModal({ modalType: 'add' }));
    dispatch(updateExtra({ addChannel }));
  }

  function handleRemoveClick(e) {
    dispatch(openModal({ modalType: 'delete' }));
    dispatch(updateExtra({ id: e.target.dataset.id, removeChannel }));
  }

  function handleRenameClick(e) {
    dispatch(openModal({ modalType: 'rename' }));
    dispatch(updateExtra({ id: e.target.dataset.id, renameChannel }));
  }
  const renderChannels = () => {
    if (!channels) {
      console.log('no channels');
      return null;
    }
    if (channels.length === 0) {
      console.log('no channels found');
      return null;
    }

    return channels.map((el) => {
      const classNames = cn('btn', {
        'btn-primary': activeChannel.activeChannelName === el.name,
        'btn-light': activeChannel.activeChannelName !== el.name,
      });
      const classNamesDropDown = cn('btn btn-light dropdown-toggle', {
        'btn-primary': activeChannel.activeChannelName === el.name,
      });
      const handleClickChannel = (e) => {
        dispatch(setActiveChannel({
          activeChannelId: e.target.dataset.id,
          activeChannelName: e.target.dataset.name,
        }));
      };
      return (
        <div key={el.id}>
          {!el.removable ? (
            <button
              type="button"
              onClick={handleClickChannel}
              className={classNames}
              data-id={el.id}
              data-name={el.name}
            >
              {`${el.name}`}
            </button>
          ) : (
            <div
              className="btn-group"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <button
                type="button"
                onClick={handleClickChannel}
                className={classNames}
                data-id={el.id}
                data-name={el.name}
              >
                {`# ${el.name}`}
              </button>
              <div className="dropdown">
                <button
                  id="dropdownMenuButton1"
                  type="button"
                  className={classNamesDropDown}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      data-id={el.id}
                      data-name={el.name}
                      onClick={handleRemoveClick}
                      type="button"
                      className="dropdown-item"
                    >
                      Удалить
                    </button>
                  </li>
                  <li>
                    <button
                      data-id={el.id}
                      data-name={el.name}
                      onClick={handleRenameClick}
                      type="button"
                      className="dropdown-item"
                    >
                      Переименовать
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <div className="pt-5 d-flex justify-content-between mb-2">
          <div className="align-self-center">{i18next.t('channels')}</div>
          <button
            onClick={handleClick}
            type="button"
            className="btn m-3 h-25 text-primary border border-primary h-20 align-self-center"
          >
            +
          </button>
        </div>
        <div className="btn-group-vertical" role="group">
          {renderChannels()}
        </div>
      </div>
      <Modal />
    </div>
  );
}
