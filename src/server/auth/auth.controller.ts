import * as express from 'express';
import * as request from 'request-promise';
import * as Bluebird from 'bluebird';
import {userController} from '../user/user.controller';

export interface IGithubRequestHeader {
    url: string;
    headers: {
        'User-Agent': string;
    };
}

export interface IUserSession {
    username: string;
    email: string;
    token: string;
    provider: string;
    login?: string;
}

const PROVIDER = {
    GITHUB: 'github',
    GOOGLE: 'google',
    TWITTER: 'twitter',
};

function _githubCallbackHandler(req: express.Request, res: express.Response) {
    _githubTokenToProfile(req)
        .then((body: string): void => {
            const response: Partial<IUserSession> = JSON.parse(body);
            const userProfile: IUserSession = {
                username: response.login,
                email: response.email,
                token: req.query.access_token,
                provider: PROVIDER.GITHUB,
            };

            _responseToSession(req, res, userProfile);
            _createOrLoadUserProfile(req, userProfile);

            return res.redirect('/lobby');
        })
        .catch((err: any): void => {
            console.log(err);

            return res.redirect('/login');
        });
}

function _googleCallbackHandler(req: express.Request, res: express.Response): void {
    // FIXME: this is confusing, fix it
    _verifyGoogleToken(req.query)
        .then((): Bluebird<void> => _requestGoogleUserInfo(req.query.access_token)
            .then((response): void => {
                const parsedResponse: Partial<IUserSession> = JSON.parse(response);
                const userProfile: IUserSession = {
                    username: parsedResponse.email,
                    email: parsedResponse.email,
                    token: req.query.access_token,
                    provider: PROVIDER.GOOGLE,
                };

                _responseToSession(req, res, userProfile);
                _createOrLoadUserProfile(req, userProfile);

                return res.redirect('/lobby');
            })
            .catch((error: any): void => { throw error; }),
        )
        .catch((err: any): void => {
            console.log(err);

            return res.redirect('/login');
         });
}

/**
 *
 * {
 *     "access_token": string,
 *     "raw": {
 *         "access_token": string,
 *         "scope": sting,
 *         "token_type": string
 *     }
 * }
 */
function _githubTokenToProfile(req: express.Request): request.RequestPromise {
    const options: IGithubRequestHeader = {
        url: `https://api.github.com/user?access_token=${req.query.access_token}`,
        headers: {
            'User-Agent': 'chess23',
        },
    };

    return request(options);
}

/**
 * {
 *     "access_token": string,
 *     "raw": {
 *         "access_token": string
 *         "expires_in": string
 *         "id_token": string
 *         "token_type": string
 *         "scope": string
 *     }
 * }
 */
function _verifyGoogleToken(oauthSuccessResponse: any): request.RequestPromise {
    return request(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${oauthSuccessResponse.raw.id_token}`);
}

function _requestGoogleUserInfo(accessToken: any): request.RequestPromise {
    return request(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`);
}

function _responseToSession(req: express.Request, res: express.Response, userProfile: IUserSession): void {
    req.session.username = userProfile.username;
    req.session.email = userProfile.email;
    req.session.token = userProfile.token;
    req.session.provider = userProfile.provider;
}

function _createOrLoadUserProfile(req: express.Request, userProfile: IUserSession): void {
    userController.createOrLoadUserProfile(req);
}

function _login(req: express.Request, res: express.Response): void {
    res.render('login', {
        title: 'login',
    });
}

function _logout(req: express.Request, res: express.Response): void {
    req.session.destroy((err: any): void => { throw err; });

    res.redirect('/login');
}

export const authController = {
    login: _login,
    logout: _logout,
    onAuthSuccessGithub: _githubCallbackHandler,
    onAuthSuccessGoogle: _googleCallbackHandler,
};
