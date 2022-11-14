import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClick, children, onPressBtn }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onPressBtn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPressBtn]);

  return createPortal(
    <div className={css.Modal__backdrop} onClick={onClick}>
      <div className={css.Modal__content}>{children}</div>
    </div>,
    modalRoot
  );
}
