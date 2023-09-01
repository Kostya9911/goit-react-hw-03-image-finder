import React, { Component } from 'react';
// import {Modal} from './Modal/Modal';
// import { Searchbar } from './Searchbar/Searchbar';
// import {Loader} from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

// import css from '';

export default class App extends Component {
  render() {
    return (
      <div>
        <ImageGallery></ImageGallery>
        <Button>Load more</Button>
      </div>
    );
  }
}
