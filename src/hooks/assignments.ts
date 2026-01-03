import { useQuery } from "@tanstack/react-query";
import { getAssignment, getAssignments } from "../api/assignments";


export const useAssignments = (chapterId?: string, date?: Date) => {
    return useQuery({
        queryKey: ["assignments", chapterId, date],
        queryFn: async () => getAssignments(chapterId, date),
    });
};

export const useAssignment = (assignmentId?: string) => {
    return useQuery({
        queryKey: ["assignment", assignmentId],
        queryFn: async () => getAssignment(assignmentId),
        enabled: !!assignmentId,
    });
};
