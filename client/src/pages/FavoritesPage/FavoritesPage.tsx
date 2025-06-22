import React, { useEffect, useState } from 'react';
import { getMyFavorites } from '../../services/api';
import { Property } from '../../types';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import styles from './FavoritesPage.module.css';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMyFavorites();
                setFavorites(data);
            } catch (err) {
                setError('Failed to load your favorite properties.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    return (
        <div className={styles.favoritesPage}>
            <h1>My Favorite Properties</h1>
            {loading && <p>Loading your favorites...</p>}
            {error && <p className={styles.error}>{error}</p>}
            
            {!loading && !error && (
                favorites.length > 0 ? (
                    <div className={styles.propertyGrid}>
                        {favorites.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noFavorites}>
                        <p>You haven't saved any properties yet.</p>
                        <Link to="/" className={styles.browseButton}>Browse Properties</Link>
                    </div>
                )
            )}
        </div>
    );
};

export default FavoritesPage; 