import * as express from 'express';

// middleware to check for logged-in users
export function hasAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (!req.session.id || !req.session.token) {
        return res.redirect('/login');
    }

    next();
}
