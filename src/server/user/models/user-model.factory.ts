import {IUser} from './i-user';
import {ProfileProviderEnum} from '../../auth/profile-provider.enum';

/**
 *
 *
 * @param profileType {ProfileProviderEnum}
 * @param profileJson {object}
 * @returns {UserModel}
 */
export default function userModelFactory(profileType: ProfileProviderEnum, profileJson: any): Partial<IUser> {
    let userFromProfile: Partial<IUser> = null;

    switch (profileType) {
        case ProfileProviderEnum.Google:
            userFromProfile = {
                avatarUrl: profileJson.photos[0].value || null,
                displayName: profileJson.displayName,
                email: profileJson.emails[0].value,
                profileId: profileJson.id,
                provider: ProfileProviderEnum[ProfileProviderEnum.Google],
            };

            break;
        case ProfileProviderEnum.Github:
            userFromProfile = {
                avatarUrl: profileJson.avatar_urk,
                displayName: profileJson.name,
                email: profileJson.email,
                profileId: profileJson.id,
                provider: ProfileProviderEnum[ProfileProviderEnum.Github],
            };

            break;
        default:
            break;
    }

    return userFromProfile;
}
