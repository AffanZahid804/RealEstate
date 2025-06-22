import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as api from '../services/api';

interface FavoritesContextType {
  favoriteIds: Set<string>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = await api.getMe();
        setFavoriteIds(new Set(user.favorites));
      } catch (error) {
        console.error("Failed to fetch user favorites", error);
      }
    };
    fetchFavorites();
  }, []);

  const addFavorite = async (id: string) => {
    await api.addFavorite(id);
    setFavoriteIds(prev => new Set(prev).add(id));
  };

  const removeFavorite = async (id: string) => {
    await api.removeFavorite(id);
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const isFavorite = (id: string) => favoriteIds.has(id);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 