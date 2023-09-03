import { Component } from 'react';

import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { fetchImages } from 'api';

import css from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: false,
    loadMore: false,
    openModal: false,
    largeImageURL: '',
  };

  handleOpenModal = id => {
    this.setState({ openModal: true });
    this.setState({
      largeImageURL: this.state.images.filter(image => image.id === id)[0],
    });
  };
  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (evt.target.elements.query.value.length === 0) {
      return;
    }
    this.setState({
      query: `${Date.now()}/${evt.target.elements.query.value.trim()}`,
      images: [],
      page: 1,
    });
    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      try {
        this.setState({ loading: true, error: false });

        if (this.state.query.length === 0) {
          return;
        }

        const { hits, totalHits } = await fetchImages(
          this.state.query.split('/')[1],
          this.state.page
        );

        this.setState(prev => ({
          images: [...prev.images, ...hits],
          loadMore: this.state.page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { images, loading, error, loadMore, openModal, largeImageURL } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {loading && <Loader />}
        {error && !loading && <div>!!!ERROR!!!</div>}

        {images.length > 0 && (
          <ImageGallery
            openModal={this.handleOpenModal}
            images={images}
          ></ImageGallery>
        )}
        {openModal && (
          <Modal
            largeImageURL={{ ...largeImageURL }}
            closeModal={this.handleCloseModal}
          ></Modal>
        )}
        {loadMore && <Button loadMore={this.handleLoadMore}>Load more</Button>}
      </div>
    );
  }
}
