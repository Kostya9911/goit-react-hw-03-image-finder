import PropTypes from 'prop-types';

import css from './Modal.module.css';

export const Modal = ({ largeImageURL, closeModal }) => {
  return (
    <div onClick={closeModal} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL.largeImageURL} className={css.img} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  largeImageURL: PropTypes.object,
};
