import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import { Overlay, Modal } from './ModalWindow.styled';

const modalRoot = document.querySelector('#modal-root');

export default function ModalWindow({ toggleModal, children }) {
  const handelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('click');
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  return createPortal(
    <Overlay onClick={handelBackdropClick}>
      <Modal>{children}</Modal>
    </Overlay>,
    modalRoot
  );
}

ModalWindow.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
