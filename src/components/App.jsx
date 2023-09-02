import React, { Component } from 'react';
// import {Modal} from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
// import {Loader} from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { fetchImages } from 'api';

import { Audio } from 'react-loader-spinner';

import css from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: false,
    loadMore: false,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: evt.target.elements.query.value,
      images: [],
      page: 1,
    });
    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // async componentDidMount() {
  //   try {
  //     this.setState({ loading: true, error: false });
  //     console.log(this.state.query);
  //     const arrayImages = await fetchImages(this.state.query);
  //     this.setState({ images: arrayImages.hits });
  //     // console.log(arrayImages);
  //   } catch (error) {
  //     this.setState({ error: true });
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      try {
        this.setState({ loading: true, error: false });

        const { hits, totalHits } = await fetchImages(
          this.state.query,
          this.state.page
        );
        // const { hits, totalHits } = arrayImages;

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
    // console.log(this.state);
    const { images, loading, error, loadMore } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>
        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        )}
        {error && !loading && <div>!!!ERROR!!!</div>}

        {images.length > 0 && <ImageGallery images={images}></ImageGallery>}

        {loadMore && <Button loadMore={this.handleLoadMore}>Load more</Button>}
      </div>
    );
  }
}
