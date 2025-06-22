import React, { useEffect, useState, useCallback } from 'react';
import { getProperties } from '../../services/api';
import { Property } from '../../types';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyFilter from '../../components/PropertyFilter/PropertyFilter';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState<{ [key: string]: string }>({
        page: '1',
        limit: '6',
        sortBy: 'date',
        order: 'desc'
    });

    const fetchProperties = useCallback(async (currentFilters: { [key: string]: string }) => {
        setLoading(true);
        setError(null);
        try {
            const { data, total: totalItems } = await getProperties(currentFilters);
            setProperties(data);
            setTotal(totalItems);
        } catch (err) {
            setError('Failed to load properties. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProperties(filters);
    }, [fetchProperties, filters]);

    const handleFilterChange = (newFilters: { [key: string]: string }) => {
        setFilters(newFilters);
    };
    
    const handlePageChange = (newPage: number) => {
        setFilters(prev => ({ ...prev, page: newPage.toString() }));
    };
    
    const totalPages = Math.ceil(total / parseInt(filters.limit || '6'));

    return (
        <div className={styles.homePage}>
            <header className={styles.header}>
                <h1>Find Your Dream Home</h1>
                <p>Search through the most luxurious properties in the market.</p>
            </header>
            
            <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} />

            {error && <p className={styles.error}>{error}</p>}
            
            <div className={styles.propertyGrid}>
                {loading 
                    ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                    : properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                      ))
                }
            </div>
            
            {!loading && !error && properties.length === 0 && (
                <p className={styles.noResults}>No properties found matching your criteria.</p>
            )}

            {!loading && totalPages > 1 && (
                <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={parseInt(filters.page || '1') === page ? styles.activePage : ''}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage; 