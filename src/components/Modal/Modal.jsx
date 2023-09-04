import { Component } from 'react';

import PropTypes from 'prop-types';

import css from './Modal.module.css';

export class Modal extends Component {
  // { largeImageURL, closeModal }

  pressKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.pressKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.pressKeyDown);
  }

  render() {
    const { largeImageURL, closeModal } = this.props;
    return (
      <div onClick={closeModal} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={largeImageURL.largeImageURL} className={css.img} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  largeImageURL: PropTypes.object,
};
