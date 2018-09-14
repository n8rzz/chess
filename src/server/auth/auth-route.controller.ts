import * as express from 'express';
import * as passport from 'passport';

const router: express.Router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ],
}));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req: express.Request, res: express.Response): void => {
        req.session.token = req.user.token;

        res.redirect('/lobby');
    });

router.get('/auth/github', passport.authenticate('github'));

router.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req: express.Request, res: express.Response): void => {
        req.session.token = req.user.token;

        res.redirect('/lobby');
    });

export const AuthRouteController = router;
