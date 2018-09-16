import {IUser} from './i-user';
import {ProfileProviderEnum} from '../../auth/profile-provider.enum';

/**
 *
 *
 * @param profileType {ProfileProviderEnum}
 * @param profileJson {object}  normalized provider data from passport
 * @returns {UserModel}         used elsewhere to find or create an `UserModel` instance
 */
export default function userModelFactory(profileType: ProfileProviderEnum, profileJson: any): Partial<IUser> {
    const userFromProfile: Partial<IUser> = {
        avatarUrl: profileJson.photos[0].value || null,
        displayName: profileJson.displayName,
        email: profileJson.emails[0].value,
        profileId: profileJson.id,
    };

    switch (profileType) {
        case ProfileProviderEnum.Google:
            userFromProfile.provider = ProfileProviderEnum[ProfileProviderEnum.Google];

            break;
        case ProfileProviderEnum.Github:
            userFromProfile.provider = ProfileProviderEnum[ProfileProviderEnum.Github];

            break;
        default:
            break;
    }

    return userFromProfile;
}
