import React from 'react';
import { useSelector } from 'react-redux';
import Add from './ModalAdd.jsx';
import Delete from './ModalDelete.jsx';
import Rename from './ModalRename.jsx';

export default function Modal() {
  const modal = useSelector((state) => state.rootReducer.modal);

  if (!modal.isOpened) {
    return null;
  }
  switch (modal.type) {
    case 'add':
      return <Add />;
    case 'rename':
      return <Rename />;
    case 'delete':
      return <Delete />;
    case 'none':
      return null;
    default:
      throw new Error(`Unknown type: ${modal.type}`);
  }
}
