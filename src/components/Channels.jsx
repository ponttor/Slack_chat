import React, { useState } from "react";
import cn from 'classnames';
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateExtra } from "../slices/modalSlice.jsx";
import Modal from "./Modal/Modal.jsx";

export default function Channels({ removeChannel, renameChannel, addChannel }) {
  const [activeChannel, setActiveChannel] = useState("general");
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.rootReducer.channels.channels);
  // const extra = useSelector((state) => state.rootReducer.modal.extra);

  function handleClick(e) {
    e.preventDefault();
    setIsOpen(true);
    dispatch(updateExtra({ addChannel }));
    setModalType('add');
  }

  function handleRemoveClick(e) {
    e.preventDefault();
    setIsOpen(true);
    dispatch(updateExtra({ id: e.target.dataset.id, removeChannel }));
    setModalType('remove');
  }

  function handleRenameClick(e) {
    e.preventDefault();
    setIsOpen(true);
    dispatch(updateExtra({ id: e.target.dataset.id, renameChannel }));
    setModalType('rename');
  }

  const renderChannels = () => {
    if (channels.length === 0) {
      console.log('no channels found');
      return null;
    }
    console.log(channels)
    return channels.map((el) => {
      const classNames = cn('btn btn-light', {
        active: activeChannel === el.name,
      });
      const classNamesDropDown = cn('btn btn-light dropdown-toggle', {
        active: activeChannel === el.name,
      });
      const handleClickChannel = (e) => {
        setActiveChannel(e.target.value);
      };
      return (
        <div key={el.id}>
          {!el.removable ? (
            <button
              type="button"
              onClick={handleClickChannel}
              className={classNames}
              data-id={el.id}
            >
              {`# ${el.name}`}
            </button>
          ) : (
            <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
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
      <Modal
        type={modalType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        renderChannels={renderChannels}
      />
    </div>
  );
}
