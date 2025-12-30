import { useQuery } from "@tanstack/react-query";
import { getExercise, getExercises } from "../api/exercises";

export const useExercise = (exerciseId: string | undefined) => {
    return useQuery({
        queryKey: ["exercise", exerciseId],
        queryFn: () => getExercise(exerciseId),
    });
}

export const useExercises = (assignmentId: string | undefined) => {
    return useQuery({
        queryKey: ["exercises", assignmentId],
        queryFn: () => getExercises(assignmentId),
    });
};

