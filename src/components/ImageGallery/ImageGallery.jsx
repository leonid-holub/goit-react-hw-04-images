import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { onSearch } from 'components/ApiPatameters/Fetch';
import Loader from 'components/Loader/Loader';
import { smoothScroll } from 'components/SmoothScroll/SmoothScroll';
import css from './ImageGallery.module.css';

export default function ImageGallery({ query, page, onChangePage }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(null);
  const [showLoadBtn, setShowLoadBtn] = useState(true);

  useEffect(() => {
    if (page !== 1) {
      setShowLoadBtn(false);
      const asyncOnSearch = async () => {
        onSearch(query, page)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(new Error(`Nothing about ${query}`));
          })
          .then(array => {
            setImages(prevState => [...prevState, ...array.hits]);
            setShowLoadBtn(true);
          })
          .catch(error => {
            setError(error);
            setStatus('rejected');
          })
          .finally(() => {
            setTimeout(() => {
              smoothScroll();
            }, 100);
          });
      };
      asyncOnSearch();
      return;
    } else {
      setStatus('pending');
      onSearch(query, page)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error(`Nothing about ${query}`));
        })
        .then(array => {
          setImages(array.hits);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [page, query]);

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
        {showLoadBtn ? (
          <button
            id="load-more-btn"
            className={css['ImageGallery__button']}
            type="button"
            onClick={onChangePage}
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

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
