import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types'

const ModalOverlay = props =>
  <div onClick={props.onClose} className={styles.overlay}></div>;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay