import { Property, User, PaginatedProperties } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const getProperties = async (filters: { [key: string]: string } = {}): Promise<PaginatedProperties> => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/properties?${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch properties');
    }
    return response.json();
};

export const getPropertyById = async (id: string): Promise<Property> => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch property');
    }
    return response.json();
};

// --- User and Favorites API ---

export const getMe = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/me`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
};

export const getMyFavorites = async (): Promise<Property[]> => {
    const response = await fetch(`${API_BASE_URL}/me/favorites`);
    if (!response.ok) {
        throw new Error('Failed to fetch favorite properties');
    }
    return response.json();
};

export const addFavorite = async (propertyId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/me/favorites/${propertyId}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to add favorite');
    }
    return response.json();
};

export const removeFavorite = async (propertyId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/me/favorites/${propertyId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to remove favorite');
    }
    return response.json();
}; 