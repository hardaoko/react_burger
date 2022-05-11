import { useCallback, useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useDispatch } from "react-redux";
import { MODAL_CLOSE } from "../../services/actions";

const Modal = (props) => {
  const modalRoot = document.getElementById("react-modals");

  const { title, onClose } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscapeClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keyup", handleEscapeClose);
    return () => {
      document.removeEventListener("keyup", handleEscapeClose);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className={`${styles.container} pt-15 pr-10 pl-10 pb-15`}>
        <div className={styles.modal_header}>
          {title && (
            <h2 className={`${styles.title} text text_type_main-large ml-10`}>
              {title}
            </h2>
          )}
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props.children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
