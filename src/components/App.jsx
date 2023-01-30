import { Component } from 'react';
import Button from './Button/Button';
import MoviesGallery from './MoviesGallery/MoviesGallery';
import Modal from './Modal/Modal';

import fetchMovies from 'services/MoviesAppi';

export class App extends Component {
  state = {
    isMoviesShow: false,
    page: 1,
    movies: [],
    isLoading: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isMoviesShow, page } = this.state;
    if (
      (prevState.isMoviesShow !== isMoviesShow && isMoviesShow) ||
      (prevState.page !== page && isMoviesShow)
    ) {
      this.getMovies();
    }
    if (!isMoviesShow && isMoviesShow !== prevState.isMoviesShow) {
      this.setState({ movies: [], page: 1 });
    }
  }

  showFilmsList = () => {
    this.setState(prevState => ({ isMoviesShow: !prevState.isMoviesShow }));
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      })
      .catch(error => console.error(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = data => {
    this.setState({ currentImage: null });
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { showFilmsList } = this;
    const { isMoviesShow, movies, currentImage } = this.state;
    return (
      <div>
        <Button
          clickHandlrer={showFilmsList}
          text={isMoviesShow ? 'Hide Movies List' : 'Show Movies List'}
        />
        {isMoviesShow && (
          <>
            <MoviesGallery movies={movies} showModal={this.openModal} />
            <Button text="Load more" clickHandlrer={this.loadMore} />
          </>
        )}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
