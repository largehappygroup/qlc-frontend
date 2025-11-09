export interface Exercise {
    uuid?: string;
    assignmentId: string;
    userId: string;
    date: Date;
    studentCode: string;
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

export interface WithSetExercise {
    setExercise?: (exercise: Exercise) => void;
}

export type WithExerciseAndSetExercise = WithExercise & WithSetExercise;

export type ExerciseStatus = "In Progress" | "Complete" | "Not Started";