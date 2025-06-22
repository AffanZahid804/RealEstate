import { IncomingMessage, ServerResponse } from 'http';

const sendJSON = (res: ServerResponse, statusCode: number, data: any) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

const getRequestBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
};

export const contactAgent = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getRequestBody(req);
        console.log('Contact Agent Form Submission:', body);
        sendJSON(res, 200, { message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error parsing request body:', error);
        sendJSON(res, 400, { message: 'Invalid JSON in request body' });
    }
}; 