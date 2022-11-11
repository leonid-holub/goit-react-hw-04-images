import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onPressBtn();
    }
  };

  render() {
    return createPortal(
      <div className={css.Modal__backdrop} onClick={this.props.onClick}>
        <div className={css.Modal__content}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
