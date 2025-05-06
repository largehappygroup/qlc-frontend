export interface Exercise {
    _id: string;
    userId: string;
    date: Date;
    questions: {
        _id: string;
        query: string;
        type: string;
        hints?: string[];
        difficulty: string;
        availableAnswers: string[];
        explanation: string;
        userAnswers?: {
            timeStamp: Date;
            selectedAnswer: string;
        }[];
        timeSpent: number;
    }[];
    totalTimeSpent: number;
    totalCorrect: number;
    status: string;
}
