import styles from './imageGallery.module.scss';

const ImageGallery = ({ items }) => {
  const elements = items.map(({ id, webformatURL, tags, largeImageURL }) => {
    console.log(items);
    return (
      <li key={id} className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    );
  });
  return <ul className={styles.ImageGallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};
