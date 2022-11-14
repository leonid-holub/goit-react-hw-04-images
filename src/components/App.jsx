import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function App() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchSubmit = query => {
    setQ(query);
    setPage(1);
  };

  const handleIncrementPage = e => {
    e.preventDefault();
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      {q && (
        <ImageGallery
          query={q}
          page={page}
          onChangePage={handleIncrementPage}
        />
      )}
    </>
  );
}
