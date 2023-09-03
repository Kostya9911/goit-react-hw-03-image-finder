import css from './Modal.module.css';

export const Modal = ({ largeImageURL }) => {
  console.log(largeImageURL);
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL.largeImageURL} alt="" />
      </div>
    </div>
  );
};
