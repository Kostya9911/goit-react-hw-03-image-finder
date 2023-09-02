import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageUrl }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={imageUrl} alt="" className={css.ImageGalleryItem_image} />
    </li>
  );
};
