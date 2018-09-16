import * as Passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth20';
import * as GithubStrategy from 'passport-github';
import userModelFactory from '../user/models/user-model.factory';
import {ProfileProviderEnum} from './profile-provider.enum';
import {IUser} from '../user/models/i-user';
import {UserModel} from '../user/models/user.model';

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
    const googleAuthStrategy: GoogleStrategy.Strategy = new GoogleStrategy(
        googleStrategyConfig,
        (token: string, refreshToken: string, profile: any, next: any): void => {
            const userFromProfile: Partial<IUser> = userModelFactory(ProfileProviderEnum.Google, profile);

            UserModel.findOne({ email: userFromProfile.email })
                .then((user: IUser): void => {
                    if (user) {
                        return next(null, {
                            profile: user,
                            token,
                        });
                    }

                    UserModel.create(userFromProfile)
                        .then((createdUser: IUser): Promise<void> => {
                            return next(null, {
                                profile: createdUser,
                                token,
                            });
                        })
                        .catch((error: any): void => {
                            throw error;
                        });
                })
                .catch((error: any): void => {
                    throw error;
                });
        },
    );
    const githubAAuthStrategy = new GithubStrategy.Strategy(
        githubStrategyConfig,
        (token: string, refreshToken: string, profile: any, next: any): void => {
            return next(null, {
                profile,
                token,
            });
        },
    );

    passport.serializeUser((user: any, next: (err: any, id?: {}) => void): void => {
        next(null, user);
    });

    passport.deserializeUser((user: any, next: (err: any, id?: {}) => void): void => {
        next(null, user);
    });


    passport.use(googleAuthStrategy);
    passport.use(githubAAuthStrategy);
}
