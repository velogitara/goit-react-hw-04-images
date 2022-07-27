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
};

// export default class ModalWindow extends Component {
//   static propTypes = {
//     toggleModal: PropTypes.func.isRequired,
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       console.log('click');
//       this.props.toggleModal();
//     }
//   };
//   handelBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.toggleModal();
//     }
//   };
//   render() {
//     return createPortal(
//       <Overlay onClick={this.handelBackdropClick}>
//         <Modal>{this.props.children}</Modal>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
