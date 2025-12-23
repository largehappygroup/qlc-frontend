
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    vuNetId: string;
    role: string;
    termSeason?: string;
    termYear?: number;
    studyParticipation?: boolean;
    studyGroup?: string;
}

export interface WithUser {
    user?: User | null;
}

export interface WithUserId {
    userId?: string;
}