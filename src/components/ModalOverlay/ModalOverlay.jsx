import styles from './ModalOverlay.module.css';

const ModalOverlay = (props) =>
  <div onClick={props.onClose} className={styles.overlay}></div>;

export default ModalOverlay