import * as express from 'express';
import * as util from 'util';
import {UserModel} from './models/user.model';
import {IUser} from './models/i-user';

function getProfileList(req: express.Request, res: express.Response): void {
    console.log('+++ getProfileList');
}

function getProfile(req: express.Request, res: express.Response): void {
    UserModel.findOne({ email: req.session.email }, (error: any, userModel: IUser): void => {
        if (error) {
            throw error;
        }

        res.render('profile', {
            title: 'Profile',
            username: req.session.username,
            provider: req.session.provider,
            token: req.session.token,
            rating: userModel.rating,
            joinDate: userModel.joinDate,
        });
    });
}

function createProfile(req: express.Request): void {
    UserModel.create({
        username: req.session.username,
        email: req.session.email,
    }, (error: any, document: IUser): void => {
        if (error) {
            console.error(`Error: something went wrong attempting to create a profile. ${util.inspect(error)}`);
        }
    });
}

function updateProfile(req: express.Request, res: express.Response): void {
    console.log('+++ updateProfile');
}

function destroyProfile(req: express.Request, res: express.Response): void {
    UserModel.findOneAndRemove({ email: req.session.email }, (error: any, userModel: IUser): void => {
        if (error) {
            throw error;
        }
    });
}

function createOrLoadUserProfile(req: express.Request): void {
    UserModel.findOne({ email: req.session.email }, (error: any, user): void => {
        if (error) {
            throw error;
        }

        if (!user) {
            createProfile(req);

            return;
        }
    });
}

export const userController = {
    getProfileList,
    getProfile,
    createProfile,
    updateProfile,
    destroyProfile,
    createOrLoadUserProfile,
};
