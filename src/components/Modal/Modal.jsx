import React from 'react';

import Add from './ModalAdd.jsx';
import Delete from './ModalDelete.jsx';
import Rename from './ModalRename.jsx';

export default function Modal({
  type,
  isOpen,
  setIsOpen,
  renderChannels,
}) {
  if (!isOpen) {
    return null;
  }
  console.log(type);
  switch (type) {
    case 'add':
      return <Add setIsOpen={setIsOpen} />;
    case 'rename':
      return <Rename renderChannels={renderChannels} setIsOpen={setIsOpen} />;
    case 'delete':
      return <Delete setIsOpen={setIsOpen} />;
    case 'null':
      return null;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
