import * as express from 'express';
import {UserModel} from '../user/models/user.model';
import {IUser} from '../user/models/i-user';
// import PlayerController from '../player/player.controller';

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

export const ProfileController = {
    getProfile,
    updateProfile,
    destroyProfile,
};
