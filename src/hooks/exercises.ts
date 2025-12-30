import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../api/exercises";

export const useExercises = (assignmentId: string | undefined) => {
    return useQuery({
        queryKey: ["exercises", assignmentId],
        queryFn: () => getExercises(assignmentId),
    });
};
