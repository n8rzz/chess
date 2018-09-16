import * as express from 'express';
import * as util from 'util';
import * as u4 from 'uuid';
import {UserModel} from '../user/models/user.model';
import {IUser} from '../user/models/i-user';
import PlayerController from '../player/player.controller';

function getProfileList(req: express.Request, res: express.Response): void {
    console.log('+++ getProfileList');
}

function getProfile(req: express.Request, res: express.Response): void {
    UserModel.findOne({ playerId: req.session.playerId })
        .then((userModel: IUser): void => {
            res.render('profile', {
                title: 'Profile',
                avatarUrl: userModel.avatarUrl,
                email: userModel.email,
                provider: userModel.provider,
                token: req.session.token,
                rating: userModel.rating,
                joinDate: userModel.joinDate,
            });
        })
        .catch((error: any): void => {
            throw error;
        });
}

function createProfile(req: express.Request): void {
    UserModel.create({ email: req.session.email, playerId: u4() })
        .then((userModel: IUser): void => {
            PlayerController.createPlayerWithId(userModel.playerId);
        })
        .catch((error: any): void => {
            console.error(`Error: something went wrong attempting to create a profile. ${util.inspect(error)}`);

            throw error;
        });
}

function updateProfile(req: express.Request, res: express.Response): void {
    console.log('+++ updateProfile');
}

function destroyProfile(req: express.Request, res: express.Response): void {
    UserModel.findOneAndRemove({ email: req.session.email })
        .then((userModel: IUser): void => { })
        .catch((error: any): void => {
            throw error;
        });
}

function createOrLoadUserProfile(req: express.Request): void {
    UserModel.findOne({ email: req.session.email })
        .then((user): void => {
            if (!user) {
                createProfile(req);

                return;
            }
        })
        .catch((error: any): void => {
            throw error;
        });
}

export const ProfileController = {
    getProfileList,
    getProfile,
    createProfile,
    updateProfile,
    destroyProfile,
    createOrLoadUserProfile,
};
