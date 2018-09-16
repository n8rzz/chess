import * as u4 from 'uuid';
import { Document, Schema, Model, model} from 'mongoose';
import { IUser } from './i-user';

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
    avatarUrl: String,
    displayName: String,
    email: String,
    joinDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    playerId: String,
    profileId: String,
    provider: String,
    rating: { type: Number, default: 1200 },
});

UserSchema.pre('save', function(this: any, next: () => void) {
    if (!this.playerId) {
        this.playerId = u4();
    }

    this.lastLogin = new Date();

    next();
});

export const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);
