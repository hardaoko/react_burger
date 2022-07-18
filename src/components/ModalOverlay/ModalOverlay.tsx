import styles from './ModalOverlay.module.css';
import { FC } from 'react';
import { IModalOverlayProps } from '../../utils/types';

const ModalOverlay:FC<IModalOverlayProps> = ({onClose}) =>
  <div data-at="modal-overlay" onClick={onClose} className={styles.overlay}></div>;


export default ModalOverlay