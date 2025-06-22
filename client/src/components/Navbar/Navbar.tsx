import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Prestige Properties
      </NavLink>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({isActive}) => isActive ? styles.active : styles.navLink}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={({isActive}) => isActive ? styles.active : styles.navLink}>My Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({isActive}) => isActive ? styles.active : styles.navLink}>Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({isActive}) => isActive ? styles.active : styles.navLink}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 