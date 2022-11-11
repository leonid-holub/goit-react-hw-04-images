import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleToggleModal = e => {
    if (e.currentTarget === e.target) {
      this.toggleModal();
    }
  };

  render() {
    const { galleryImg, imgAlt, modalImg } = this.props;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css['ImageGalleryItem-image']}
          src={galleryImg}
          alt={imgAlt}
          onClick={this.handleToggleModal}
        />
        {this.state.showModal && (
          <Modal onClick={this.handleToggleModal} onPressBtn={this.toggleModal}>
            <img src={modalImg} alt={imgAlt}></img>
          </Modal>
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  galleryImg: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
};
