import React from 'react';
import styles from './ContactPage.module.css';

const ContactPage: React.FC = () => {
    return (
        <div className={styles.contactPage}>
            <div className={styles.content}>
                <h1>Contact Us</h1>
                <p>
                    For any inquiries, please feel free to reach out to us. We are here to help you with all your real estate needs.
                </p>
                <div className={styles.contactInfo}>
                    <p><strong>Address:</strong> 123 Luxury Lane, Metropolis, 10101</p>
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                    <p><strong>Email:</strong> contact@prestigeproperties.com</p>
                </div>
                <p>
                    If you wish to contact an agent about a specific property, please navigate to the property's page and use the "Contact Agent" button.
                </p>
            </div>
        </div>
    );
};

export default ContactPage; 