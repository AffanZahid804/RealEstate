import { IncomingMessage, ServerResponse } from 'http';
import { getProperties, getPropertyById } from './controllers/propertyController';
import { loginUser, getMe, getMyFavorites, addFavorite, removeFavorite } from './controllers/userController';
import { contactAgent } from './controllers/contactController';

type RouteHandler = (req: IncomingMessage, res: ServerResponse, params?: any) => void;

interface Route {
    method: string;
    path: RegExp;
    handler: RouteHandler;
}

const routes: Route[] = [
    { method: 'GET', path: /^\/api\/properties$/, handler: getProperties },
    { method: 'GET', path: /^\/api\/properties\/(\w+)$/, handler: (req, res, params) => getPropertyById(req, res, params[0]) },
    { method: 'POST', path: /^\/api\/login$/, handler: loginUser },
    { method: 'GET', path: /^\/api\/me$/, handler: getMe },
    { method: 'GET', path: /^\/api\/me\/favorites$/, handler: getMyFavorites },
    { method: 'POST', path: /^\/api\/me\/favorites\/(\w+)$/, handler: (req, res, params) => addFavorite(req, res, params[0]) },
    { method: 'DELETE', path: /^\/api\/me\/favorites\/(\w+)$/, handler: (req, res, params) => removeFavorite(req, res, params[0]) },
    { method: 'POST', path: /^\/api\/contact-agent$/, handler: contactAgent },
];

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    
    for (const route of routes) {
        const match = route.path.exec(url || '');
        if (method === route.method && match) {
            const params = match.slice(1);
            route.handler(req, res, params);
            return;
        }
    }

    // Handle 404 Not Found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Route ${method} ${url} not found` }));
}; 