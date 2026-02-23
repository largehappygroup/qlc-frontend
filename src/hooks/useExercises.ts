import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    checkAnswer,
    editExerciseById,
    getAverageScore,
    getAverageTimeSpent,
    getExercise,
    getExercises,
    getRecentActivity,
    getScoreDistribution,
    regenerateExercise,
    submitRatings,
} from "../api/exercises";
import { Exercise } from "../types/Exercise";

/**
 * get the exercise data for a specific exercise by ID
 * @param assignmentId - uuid of the assignment
 * @returns - exercise data Exercise
 */
export const useExercise = (userId?: string, assignmentId?: string) => {
    return useQuery({
        queryKey: ["exercise", userId, assignmentId],
        queryFn: () => getExercise(userId, assignmentId),
    });
};

/**
 * gets the exercises for a specific assignment
 * @param assignmentId - uuid of the assignment (optional)
 * @returns - exercises data Exercise[]
 */
export const useExercises = (assignmentId?: string) => {
    return useQuery({
        queryKey: ["exercises", assignmentId],
        queryFn: () => getExercises(assignmentId),
    });
};

/**
 * gets the average score for a user across all exercises
 * @param userId - uuid of the user (optional)
 * @returns - average score number
 */
export const useAverageScore = (userId?: string) => {
    return useQuery({
        queryKey: ["averageScore", userId],
        queryFn: () => getAverageScore(userId),
    });
};

/**
 * get the average time spent for a user across all exercises
 * @param userId - uuid of the user (optional)
 * @returns - average time spent string
 */
export const useAverageTimeSpent = (userId?: string) => {
    return useQuery({
        queryKey: ["averageTimeSpent", userId],
        queryFn: () => getAverageTimeSpent(userId),
    });
};

/**
 * gets the recent activity for a user across all exercises
 * @param userId - uuid of the user (optional)
 * @returns - recent activity data RecentActivity[]
 */
export const useRecentActivity = (userId?: string) => {
    return useQuery({
        queryKey: ["recentActivity", userId],
        queryFn: () => getRecentActivity(userId),
    });
};

/**
 * gets the score distribution for a user across all exercises
 * @param userId - uuid of the user (optional)
 * @returns - score distribution data ScoreDistribution[]
 */
export const useScoreDistribution = (userId?: string) => {
    return useQuery({
        queryKey: ["scoreDistribution", userId],
        queryFn: () => getScoreDistribution(userId),
    });
};

/**
 * regenerates an exercise for a user and assignment
 * @param userId - uuid of the user (optional)
 * @param assignmentId - uuid of the assignment (optional)
 * @returns - the regenerated Exercise object
 */
export const useRegenerateExercise = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            userId,
            assignmentId,
        }: {
            userId?: string;
            assignmentId?: string;
        }) => regenerateExercise(userId, assignmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exercise"] });
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
            queryClient.invalidateQueries({ queryKey: ["averageScore"] });
            queryClient.invalidateQueries({ queryKey: ["averageTimeSpent"] });
            queryClient.invalidateQueries({ queryKey: ["recentActivity"] });
            queryClient.invalidateQueries({ queryKey: ["scoreDistribution"] });
        },
        onError: (error) => {
            console.error("Error regenerating exercise:", error);
        },
    });
};

export const useSubmitRatings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            exercise,
            ratings,
            questionIndex,
        }: {
            exercise: Exercise;
            ratings?: { [key: string]: number };
            questionIndex: number;
        }) => submitRatings(exercise, ratings, questionIndex),
        onSuccess: () => {
            // Invalidate all exercise-related queries so fresh data is fetched.
            queryClient.invalidateQueries({ queryKey: ["exercise"] });
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
            queryClient.invalidateQueries({ queryKey: ["averageScore"] });
            queryClient.invalidateQueries({ queryKey: ["averageTimeSpent"] });
            queryClient.invalidateQueries({ queryKey: ["recentActivity"] });
            queryClient.invalidateQueries({ queryKey: ["scoreDistribution"] });
        },
        onError: (error) => {
            console.error("Error submitting ratings:", error);
        },
    });
};

export const useCheckAnswer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            exercise,
            selectedAnswer,
            questionIndex,
            timeSpent,
        }: {
            exercise: Exercise;
            selectedAnswer?: string;
            questionIndex: number;
            timeSpent?: number;
        }) => checkAnswer(selectedAnswer, exercise, questionIndex, timeSpent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exercise"] });
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
            queryClient.invalidateQueries({ queryKey: ["averageScore"] });
            queryClient.invalidateQueries({ queryKey: ["averageTimeSpent"] });
            queryClient.invalidateQueries({ queryKey: ["recentActivity"] });
            queryClient.invalidateQueries({ queryKey: ["scoreDistribution"] });
        },
        onError: (error) => {
            console.error("Error checking answer:", error);
        },
    });
};

export const useEditExerciseById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            exerciseId,
            updatedExercise,
        }: {
            exerciseId?: string;
            updatedExercise: Partial<Exercise>;
        }) => editExerciseById(exerciseId, updatedExercise),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["exercise"] });
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
            queryClient.invalidateQueries({ queryKey: ["averageScore"] });
            queryClient.invalidateQueries({ queryKey: ["averageTimeSpent"] });
            queryClient.invalidateQueries({ queryKey: ["recentActivity"] });
            queryClient.invalidateQueries({ queryKey: ["scoreDistribution"] });
        },
    });
};
