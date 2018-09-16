export interface IUser {
    /**
     *
     */
    profileId: string;

    /**
     *
     */
    email: string;

    /**
     * generated on first save of a record
     */
    playerId: string;

    /**
     *
     */
    provider: string;

    /**
     *
     */
    rating: number;

    /**
     *
     */
    displayName?: string;

    /**
     *
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
