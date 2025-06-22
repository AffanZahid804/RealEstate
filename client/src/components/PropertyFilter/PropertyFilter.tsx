import React, { useState } from 'react';
import styles from './PropertyFilter.module.css';

interface FilterProps {
  onFilterChange: (filters: { [key: string]: string }) => void;
  initialFilters: { [key: string]: string };
}

const PropertyFilter: React.FC<FilterProps> = ({ onFilterChange, initialFilters }) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
  const [location, setLocation] = useState(initialFilters.location || '');
  const [type, setType] = useState(initialFilters.type || '');
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || '');
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'date');
  const [order, setOrder] = useState(initialFilters.order || 'desc');

  const handleFilter = () => {
    const filters: { [key: string]: string } = {
        ...initialFilters,
        search: searchTerm,
        location,
        type,
        minPrice,
        maxPrice,
        sortBy,
        order,
        page: '1', // Reset to first page on new filter
    };
    // Remove empty filters
    Object.keys(filters).forEach(key => {
        if (!filters[key]) {
            delete filters[key];
        }
    });
    onFilterChange(filters);
  };

  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={styles.input}
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className={styles.select}>
        <option value="">All Types</option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className={styles.input}
      />
      <select value={`${sortBy}-${order}`} onChange={(e) => {
          const [sort, ord] = e.target.value.split('-');
          setSortBy(sort);
          setOrder(ord);
        }} className={styles.select}>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
      <button onClick={handleFilter} className={styles.button}>Apply Filters</button>
    </div>
  );
};

export default PropertyFilter; 