import { IncomingMessage, ServerResponse } from 'http';
import { mockUser } from '../data';
import { properties } from '../data';

const sendJSON = (res: ServerResponse, statusCode: number, data: any) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

export const loginUser = (req: IncomingMessage, res: ServerResponse) => {
    // Mock login - in a real app, you'd validate credentials from the request body
    sendJSON(res, 200, { token: 'mock-jwt-token', message: 'Login successful' });
};

export const getMe = (req: IncomingMessage, res: ServerResponse) => {
    // In a real app, you'd get the user from a session or token
    sendJSON(res, 200, mockUser);
};

export const getMyFavorites = (req: IncomingMessage, res: ServerResponse) => {
    const favoriteProperties = properties.filter(p => mockUser.favorites.includes(p.id));
    sendJSON(res, 200, favoriteProperties);
};

export const addFavorite = (req: IncomingMessage, res: ServerResponse, propertyId: string) => {
    if (!mockUser.favorites.includes(propertyId)) {
        mockUser.favorites.push(propertyId);
    }
    sendJSON(res, 200, { message: 'Property added to favorites', favorites: mockUser.favorites });
};

export const removeFavorite = (req: IncomingMessage, res: ServerResponse, propertyId: string) => {
    const index = mockUser.favorites.indexOf(propertyId);
    if (index > -1) {
        mockUser.favorites.splice(index, 1);
    }
    sendJSON(res, 200, { message: 'Property removed from favorites', favorites: mockUser.favorites });
}; 