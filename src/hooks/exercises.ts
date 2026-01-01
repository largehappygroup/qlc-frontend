import { useQuery } from "@tanstack/react-query";
import { getExercise, getExercises } from "../api/exercises";
import { useAuth } from "./AuthContext";

const { user } = useAuth();

/**
 * get the exercise data for a specific exercise by ID
 * @param exerciseId - uuid of the exercise
 * @returns - exercise data Exercise
 */
export const useExercise = (exerciseId: string | undefined) => {
    return useQuery({
        queryKey: ["exercise", exerciseId],
        queryFn: () => getExercise(exerciseId),
        enabled: !!exerciseId && !!user,
    });
};

/**
 * gets the exercises for a specific assignment
 * @param assignmentId - uuid of the assignment (optional)
 * @returns - exercises data Exercise[]
 */
export const useExercises = (assignmentId: string | undefined) => {
    return useQuery({
        queryKey: ["exercises", assignmentId],
        queryFn: () => getExercises(assignmentId),
        enabled: !!user,
    });
};
