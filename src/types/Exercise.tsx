export interface Exercise {
    _id: string;
    userId: string;
    date: Date;
    questions: {
        _id: string;
        userAnswer?: string;
        userCorrect?: boolean;
        timeSpent: number;
    }[];
    topics: string[];
    totalTimeSpent: number;
    totalCorrect: number;
    status: string;
}
