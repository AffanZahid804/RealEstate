import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>
    </div>
  );
};

export default SkeletonCard; 