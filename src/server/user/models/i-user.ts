export interface IUser {
    /**
     * Sent back from OAuth provider, local only to that provider
     * we store this value only as a reference
     */
    profileId: string;

    /**
     * users email address
     */
    email: string;

    /**
     * generated on first save of a record
     */
    playerId: string;

    /**
     * @type {ProfileProvider}
     */
    provider: string;

    /**
     * users current rating
     *
     * @default 1200
     */
    rating: number;

    /**
     * display name sent back from provider
     */
    displayName?: string;

    /**
     * url to a users profile image
     */
    avatarUrl?: string;

    /**
     * generated via pre-save hook on initial creation
     */
    joinDate: Date;

    /**
     * automatically updated via pre-save hook
     */
    lastLogin: Date;
}
