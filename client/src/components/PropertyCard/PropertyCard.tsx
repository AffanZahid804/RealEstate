import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../types';
import styles from './PropertyCard.module.css';
import { useFavorites } from '../../contexts/FavoritesContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(property.id)) {
      removeFavorite(property.id);
    } else {
      addFavorite(property.id);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/properties/${property.id}`}>
        <div className={styles.imageContainer}>
            <img src={property.images[0]} alt={property.title} className={styles.image} />
            <button onClick={handleFavoriteClick} className={`${styles.favoriteButton} ${isFavorite(property.id) ? styles.favorited : ''}`}>
                ♥
            </button>
        </div>
      </Link>
      <div className={styles.content}>
        <h3 className={styles.title}>
            <Link to={`/properties/${property.id}`} className={styles.titleLink}>
                {property.title}
            </Link>
        </h3>
        <p className={styles.location}>{property.location}</p>
        <div className={styles.badge} data-status={property.status.replace(' ', '-').toLowerCase()}>{property.status}</div>
        <p className={styles.price}>${property.price.toLocaleString()}</p>
        <div className={styles.details}>
          <span>{property.bedrooms} Beds</span>
          <span>&middot;</span>
          <span>{property.bathrooms} Baths</span>
          <span>&middot;</span>
          <span>{property.area.toLocaleString()} sqft</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 