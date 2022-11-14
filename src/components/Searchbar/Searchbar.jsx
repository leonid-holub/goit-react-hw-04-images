import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [q, setQ] = useState('');

  const handleInput = e => {
    setQ(e.currentTarget.value.trim().toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (q === '') {
      alert('Please enter something');
      return;
    }
    onSubmit(q);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['button-label']}>
            <FcSearch className={css['button-image']} />
          </span>
        </button>

        <input
          name="query"
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
        />
      </form>
    </header>
  );
}
