import * as Passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth20';
import * as GithubStrategy from 'passport-github';

export function passportConfigurator(passport: Passport.PassportStatic): void {
    const googleStrategyConfig: any = {
        clientID: process.env.GOOGLE_OAUTH_KEY,
        clientSecret: process.env.GOOGLE_OAUTH_SECRET,
        callbackURL: '/auth/google/callback',
    };
    const githubStrategyConfig: any = {
        clientID: process.env.GITHUB_OAUTH_KEY,
        clientSecret: process.env.GITHUB_OAUTH_SECRET,
        callbackURL: '/auth/github/callback',
      };

    passport.serializeUser((user: any, next: (err: any, id?: {}) => void): void => {
        next(null, user);
    });

    passport.deserializeUser((user: any, next: (err: any, id?: {}) => void): void => {
        next(null, user);
    });

    passport.use(new GoogleStrategy(
        googleStrategyConfig,
        (token: string, refreshToken: string, profile: any, next: any): void => {
            return next(null, {
                profile,
                token,
            });
        }),
    );

    passport.use(new GithubStrategy.Strategy(
        githubStrategyConfig,
        (token: string, refreshToken: string, profile: any, next: any): void => {
            return next(null, {
                profile,
                token,
            });
      }),
    );
}
