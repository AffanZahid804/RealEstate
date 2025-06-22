import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../../services/api';
import { Property } from '../../types';
import styles from './PropertyDetailsPage.module.css';
import ContactModal from '../../components/ContactModal/ContactModal';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchProperty = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await getPropertyById(id);
                    setProperty(data);
                } catch (err) {
                    setError('Failed to load property details.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProperty();
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!property) return <p>Property not found.</p>;

    const mapPlaceholder = `https://via.placeholder.com/800x400.png?text=Map+of+${encodeURIComponent(property.location)}`;

    return (
        <div className={styles.detailsPage}>
            <div className={styles.titleContainer}>
                <h1>{property.title}</h1>
                <p className={styles.location}>{property.location}</p>
            </div>
            
            <ImageGallery images={property.images} title={property.title} />

            <div className={styles.content}>
                <div className={styles.mainContent}>
                    <h2>Description</h2>
                    <p>{property.description}</p>
                    
                    <h2>Property Details</h2>
                    <ul className={styles.propertyDetailsList}>
                        <li><strong>Price:</strong> ${property.price.toLocaleString()}</li>
                        <li><strong>Type:</strong> {property.type}</li>
                        <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                        <li><strong>Bathrooms:</strong> {property.bathrooms}</li>
                        <li><strong>Area:</strong> {property.area.toLocaleString()} sqft</li>
                    </ul>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.agentInfo}>
                        <h3>Agent Information</h3>
                        <p><strong>Name:</strong> {property.agent.name}</p>
                        <p><strong>Email:</strong> {property.agent.email}</p>
                        <p><strong>Phone:</strong> {property.agent.phone}</p>
                        <button className={styles.contactButton} onClick={() => setIsModalOpen(true)}>
                            Contact Agent
                        </button>
                    </div>
                </aside>
            </div>

            <div className={styles.mapContainer}>
                <h2>Location</h2>
                <img src={mapPlaceholder} alt={`Map of ${property.location}`} className={styles.mapImage} />
            </div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                agentName={property.agent.name}
            />
        </div>
    );
};

export default PropertyDetailsPage; 