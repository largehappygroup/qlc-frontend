export interface Exercise {
    userId: string;
    date: Date;
    questions: {
        questionId: string;
        userAnswer?: string;
        userCorrect?: boolean;
        timeSpent: number;
    }[];
    totalTimeSpent: number;
    totalCorrect: number;
    status: string;
}
