import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";
import { getAssignment, getAssignments } from "../api/assignments";

const { user } = useAuth();

export const useAssignments = (chapterId?: string, date?: Date) => {
    return useQuery({
        queryKey: ["assignments", chapterId, date],
        queryFn: async () => getAssignments(chapterId, date),
        enabled: !!user,
    });
};

export const useAssignment = (assignmentId: string | undefined) => {
    return useQuery({
        queryKey: ["assignment", assignmentId],
        queryFn: async () => getAssignment(assignmentId),
        enabled: !!assignmentId && !!user,
    });
};
