import { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';
import { properties } from '../data';
import { Property } from '../types';

const sendJSON = (res: ServerResponse, statusCode: number, data: any) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

export const getProperties = (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = url.parse(req.url || '', true);
    const { query } = parsedUrl;

    let results: Property[] = [...properties];
    const { type, location, minPrice, maxPrice, search, sortBy, order = 'asc', page = '1', limit = '6' } = query;

    // Filtering
    if (type) {
        results = results.filter(p => p.type.toLowerCase() === (type as string).toLowerCase());
    }
    if (location) {
        results = results.filter(p => p.location.toLowerCase().includes((location as string).toLowerCase()));
    }
    if (minPrice) {
        results = results.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
        results = results.filter(p => p.price <= Number(maxPrice));
    }
    if (search) {
        results = results.filter(p => p.title.toLowerCase().includes((search as string).toLowerCase()));
    }

    // Sorting
    if (sortBy === 'price') {
        results.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (sortBy === 'date') {
        results.sort((a, b) => {
            const dateA = new Date(a.datePosted).getTime();
            const dateB = new Date(b.datePosted).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedResults = results.slice(startIndex, endIndex);

    const response = {
        total: results.length,
        page: pageNum,
        limit: limitNum,
        data: paginatedResults,
    };

    sendJSON(res, 200, response);
};

export const getPropertyById = (req: IncomingMessage, res: ServerResponse, id: string) => {
    const property = properties.find(p => p.id === id);
    if (property) {
        sendJSON(res, 200, property);
    } else {
        sendJSON(res, 404, { message: 'Property not found' });
    }
}; 