export interface Exercise {
    uuid: string;
    assignmentId: string;
    userId: string;
    date: Date;
    completedQuestions: number;
    completedTimestamp?: Date;
    questions: {
        uuid: string;
        query: string;
        ratings: { [key: string]: number };
        type: string;
        hints?: string[];
        difficulty: string;
        availableAnswers: string[];
        explanation: string;
        userAnswers?: {
            timeStamp: Date;
            selectedAnswer: string;
        }[];
        correct?: boolean;
        timeSpent: number;
    }[];
    totalTimeSpent: number;
    totalCorrect: number;
    status: string;
}
