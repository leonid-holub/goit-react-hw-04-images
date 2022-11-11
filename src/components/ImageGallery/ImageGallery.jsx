import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { onSearch } from 'components/ApiPatameters/Fetch';
import Loader from 'components/Loader/Loader';
import { smoothScroll } from 'components/SmoothScroll/SmoothScroll';
import css from './ImageGallery.module.css';

class ImageGallery extends React.Component {
  state = {
    images: [],
    error: '',
    status: null,
    showModal: false,
    showLoadBtn: true,
  };

  renderImages = () => {
    const { query, page } = this.props;
    this.setState({
      status: 'pending',
    });
    onSearch(query, page)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Nothing about ${query}`));
      })
      .then(images =>
        this.setState({ images: images.hits, status: 'resolved' })
      )
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });
  };

  addNextRenderImages = () => {
    const { query, page } = this.props;
    this.setState({
      showLoadBtn: false,
    });
    const asyncOnSearch = async () => {
      onSearch(query, page)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`Nothing about ${query}`));
        })
        .then(images => {
          this.setState({
            images: [...this.state.images, ...images.hits],
            showLoadBtn: true,
          });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        })
        .finally(() => {
          setTimeout(() => {
            smoothScroll();
          }, 100);
        });
    };
    asyncOnSearch();
  };

  componentDidMount() {
    this.renderImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    if (prevQuery !== nextQuery) {
      this.renderImages();
      return;
    } else if (prevPage !== nextPage && nextPage !== 1) {
      this.addNextRenderImages();
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {images.map(hit => (
              <ImageGalleryItem
                key={hit.id}
                galleryImg={hit.webformatURL}
                imgAlt={hit.tags}
                modalImg={hit.largeImageURL}
              />
            ))}
          </ul>
          {this.state.showLoadBtn ? (
            <button
              id="load-more-btn"
              className={css['ImageGallery__button']}
              type="button"
              onClick={this.props.onChangePage}
            >
              Load more
            </button>
          ) : (
            <Loader />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.messgae}</h1>;
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
