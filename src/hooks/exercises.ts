import { useQuery } from "@tanstack/react-query";
import { getAverageScore, getAverageTimeSpent, getExercise, getExercises, getRecentActivity, getScoreDistribution } from "../api/exercises";

/**
 * get the exercise data for a specific exercise by ID
 * @param assignmentId - uuid of the assignment
 * @returns - exercise data Exercise
 */
export const useExercise = (assignmentId?: string) => {
    return useQuery({
        queryKey: ["exercise", assignmentId],
        queryFn: () => getExercise( assignmentId),
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

export const useAverageScore = (userId?: string) => {
    return useQuery({
        queryKey: ["averageScore", userId],
        queryFn: () => getAverageScore(userId),    });
}

export const useAverageTimeSpent = (userId?: string) => {
    return useQuery({
        queryKey: ["averageTimeSpent", userId],
        queryFn: () => getAverageTimeSpent(userId),
    });
}

export const useRecentActivity = (userId?: string) => {
    return useQuery({
        queryKey: ["recentActivity", userId],
        queryFn: () => getRecentActivity(userId),
    });
}

export const useScoreDistribution = (userId?: string) => {
    return useQuery({
        queryKey: ["scoreDistribution", userId],
        queryFn: () => getScoreDistribution(userId),
    });
}