import css from './Button.module.css';

export const Button = ({ loadMore, children }) => {
  return (
    <button onClick={loadMore} type="button" className={css.Button}>
      {children}
    </button>
  );
};
