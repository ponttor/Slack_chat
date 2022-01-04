import React, { useState } from "react";
import cn from "classnames";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateExtra } from "../slices/modalSlice.jsx";
import Modal from "./Modal/Modal.jsx";

export default function Channels({ removeChannel, renameChannel, addChannel }) {
  const [activeChannel, setActiveChannel] = useState("general");
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.rootReducer.channels.channels);
  // const channels = useSelector((state) => console.log(state.rootReducer.channels.channels));
  // console.log(`channels: ${channels.length}`);
  // const extra = useSelector((state) => state.rootReducer.modal.extra);

  function handleClick(e) {
    e.preventDefault();
    setIsOpen(true);
    dispatch(updateExtra({ addChannel }));
    setModalType("add");
  }

  function handleRemoveClick(e) {
    e.preventDefault();
    setIsOpen(true);
    dispatch(updateExtra({ id: e.target.dataset.id, removeChannel }));
    setModalType("remove");
  }

  function handleRenameClick(e) {
    e.preventDefault();
    setIsOpen(true);
    dispatch(updateExtra({ id: e.target.dataset.id, renameChannel }));
    setModalType("rename");
  }

  const renderChannels = () => {
    console.log('nothingsts');
    console.log(channels);
    // console.log(`channels: ${useSelector((state) => console.log(state.rootReducer.channels.channels))}`);
    if (!channels) {
      console.log("no channels");
      return null;
    }
    if (channels.length === 0) {
      console.log("no channels found");
      return null;
    }
    return channels.map((el) => {
      console.log(el.name);
      const classNames = cn("btn btn-light", {
        active: activeChannel === el.name,
      });
      const classNamesDropDown = cn("btn btn-light dropdown-toggle", {
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
          <div className="align-self-center">{i18next.t("channels")}</div>
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
