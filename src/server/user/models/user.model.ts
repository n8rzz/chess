import { Document, Schema, Model, model} from 'mongoose';
import { IUser } from './i-user';

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema = new Schema({
    username: String,
    email: String,
    rating: { type: Number, default: 1200 },
    joinDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
});

export const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);
