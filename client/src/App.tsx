import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage/PropertyDetailsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactPage from './pages/ContactPage/ContactPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </Router>
    </FavoritesProvider>
  );
}

export default App; 