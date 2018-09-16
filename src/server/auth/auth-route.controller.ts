import * as express from 'express';
import * as passport from 'passport';
import {RoutePathEnum} from '../config/route-path.enum';

const router: express.Router = express.Router();

function _onCallbackHandler(req: express.Request, res: express.Response): void {
    req.session.token = req.user.token;
    req.session.playerId = req.user.profile.playerId;

    res.redirect('/lobby');
}

router.get(RoutePathEnum.Login, (req: express.Request, res: express.Response): void => {
    res.render('login', {
        title: 'login',
    });
});

router.get(RoutePathEnum.Logout, (req: express.Request, res: express.Response): void => {
    req.session.destroy((err: any): void => { throw err; });

    res.redirect('/login');
});

router.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ],
}));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), _onCallbackHandler);
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), _onCallbackHandler);

export const AuthRouteController = router;
