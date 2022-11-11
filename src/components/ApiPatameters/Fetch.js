import { searchParams } from './Parameters';

const URL = 'https://pixabay.com/api/?';

export const onSearch = (query, page) => {
  return fetch(`${URL}q=${query}&page=${page}&${searchParams}`);
};
