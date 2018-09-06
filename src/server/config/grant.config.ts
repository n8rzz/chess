import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const grantConfig: any = {
    development: {
        server: {
            protocol: 'http',
            host: 'dummy.com:8876',
        },
        github: {
            key: process.env.GITHUB_OAUTH_KEY,
            secret: process.env.GITHUB_OAUTH_SECRET,
            callback: '/handle_github_callback',
            scope: [
                'read:user',
            ],
        },
        google: {
            key: process.env.GOOGLE_OAUTH_KEY,
            secret: process.env.GOOGLE_OAUTH_SECRET,
            callback: '/handle_google_callback',
            scope: [
                'email',
                'profile',
            ],
        },
    },
    staging: {},
    production: {
        server: {
            protocol: 'http',
            host: 'dummy.com:8876',
        },
        github: {
            key: process.env.GITHUB_OAUTH_KEY,
            secret: process.env.GITHUB_OAUTH_SECRET,
            callback: '/handle_github_callback',
            scope: [
                'user',
            ],
        },
        google: {
            key: process.env.GOOGLE_OAUTH_KEY,
            secret: process.env.GOOGLE_OAUTH_SECRET,
            callback: '/handle_google_callback',
            scope: [
                'email',
                'profile',
            ],
        },
    },
};
