export interface Exercise {
    userId: string;
    date: Date;
    questions: {
        _id: string;
        userAnswer?: string;
        userCorrect?: boolean;
        timeSpent: number;
    }[];
    totalTimeSpent: number;
    totalCorrect: number;
    status: string;
}
