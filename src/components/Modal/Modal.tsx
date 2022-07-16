import { FC, useEffect } from "react";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { IModalProps } from "../../utils/types";

const Modal:FC<IModalProps> = ({ title, onClose, children }) => {
  const modalRoot: HTMLElement = document.getElementById("react-modals") as HTMLElement;

  useEffect(() => {
    const handleEscapeClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
          <button onClick={onClose} className={styles.closeButton} data-at="close-button">
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
