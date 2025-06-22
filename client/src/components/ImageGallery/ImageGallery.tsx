import React, { useState } from 'react';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return <div className={styles.noImage}>No Image Available</div>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img src={mainImage} alt={`${title} - main view`} className={styles.mainImage} />
      </div>
      <div className={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - view ${index + 1}`}
            className={`${styles.thumbnail} ${mainImage === image ? styles.activeThumbnail : ''}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery; 