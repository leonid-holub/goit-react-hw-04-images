import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends React.Component {
  state = {
    q: '',
    page: 1,
  };

  handleSearchSubmit = query => {
    this.setState({
      q: query,
      page: 1,
    });
  };

  handleIncrementPage = e => {
    e.preventDefault();
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { q, page } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {q && (
          <ImageGallery
            query={q}
            page={page}
            onChangePage={this.handleIncrementPage}
          />
        )}
      </>
    );
  }
}

export default App;
