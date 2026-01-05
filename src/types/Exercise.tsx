export interface Exercise {
    uuid?: string;
    assignmentId: string;
    userId: string;
    date: Date;
    submission: string;
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
    status: ExerciseStatus;
}

export interface WithExercise {
    exercise?: Exercise;
}


export type ExerciseStatus = "In Progress" | "Complete" | "Not Started";

export interface RecentActivity {
    userName: string;
    assignment: {
        identifier: string;
        title: string;
    };
    completedTimestamp: string;
    score: string;
}