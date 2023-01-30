import { Component } from 'react';
import styles from './modal.module.scss';

class Modal extends Component {
  render() {
    const {
      currentImage: { alt, src },
      closeModal,
    } = this.props;

    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <button
            type="button"
            className={styles.btnClose}
            onClick={closeModal}
          >
            Close
          </button>
          <img src={'https://image.tmdb.org/t/p/w500/' + src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
