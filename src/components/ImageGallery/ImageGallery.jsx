import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          openModal={openModal}
          key={image.id}
          id={image.id}
          imageUrl={image.webformatURL}
        />
      ))}
    </ul>
  );
};
