import { Component } from 'react';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import MoviesGallery from './MoviesGallery/MoviesGallery';
// import Modal from './Modal/Modal';

import fetchImg from 'services/ImgAppi';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    modalImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.getImg();
    }
  }

  searchImg = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  getImg = () => {
    this.setState({ isLoading: true });
    fetchImg(this.state.search, this.state.page)
      .then(({ hits }) => {
        this.setState(prevState => ({ items: [...prevState.items, ...hits] }));
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
    const { searchImg } = this;
    const { items, isImgShow, movies, currentImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={searchImg} />
        <ImageGallery items={items} />
        {/* <Button
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
        )} */}
      </div>
    );
  }
}
