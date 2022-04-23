import {useEffect} from 'react';
import PropTypes from 'prop-types'
import styles from './Modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {createPortal} from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';


const Modal = props => {
  const modalRoot = document.getElementById("react-modals");

  const {onClose, title} = props

  useEffect(() => {
    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose()
      }
    };

    document.addEventListener('keyup', handleEscapeClose);
    return () => {
      document.removeEventListener('keyup', handleEscapeClose);
    };
  }, [onClose])

  return createPortal(
    <>
      <div className={`${styles.container} pt-15 pr-10 pl-10 pb-15`}>
        <div className={styles.modal_header}>
          {title &&
          <h2 className={`${styles.title} text text_type_main-large ml-10`}>
            {title}
          </h2>}
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon type="primary"/>
          </button>
        </div>
        {props.children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </>
    , modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;