import React, { useState } from 'react';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, agentName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd call the API here:
    // await fetch('/api/contact-agent', { method: 'POST', body: JSON.stringify({ name, email, message, agentName }) });
    console.log({ name, email, message, agentName });
    setSubmitted(true);
  };

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        {submitted ? (
          <div className={styles.thankYouMessage}>
            <h3>Thank You!</h3>
            <p>Your message has been sent to {agentName}. They will contact you shortly.</p>
          </div>
        ) : (
          <>
            <h2>Contact {agentName}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <button type="submit" className={styles.submitButton}>Send Message</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal; 