import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ galleryImg, imgAlt, modalImg }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggleModal = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css['ImageGalleryItem-image']}
        src={galleryImg}
        alt={imgAlt}
        onClick={handleToggleModal}
      />
      {showModal && (
        <Modal onClick={handleToggleModal} onPressBtn={toggleModal}>
          <img src={modalImg} alt={imgAlt}></img>
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  galleryImg: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
};
