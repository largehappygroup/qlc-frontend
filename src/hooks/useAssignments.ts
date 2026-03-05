import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getAssignmentById,
    getAllAssignments,
    createAssignment,
    editAssignmentById,
    deleteAssignmentById,
} from "../api/assignments";
import { Assignment } from "../types/Assignment";

/**
 * Retrieves all assignments, optionally filtered by chapterId and/or date
 * @param chapterId - uuid of chapter
 * @param date - date object of assignment
 * @returns - assignments array
 */
export const useAllAssignments = (chapterId?: string, dueDate?: Date) => {
    return useQuery({
        queryKey: ["assignments", chapterId, dueDate],
        queryFn: async () => getAllAssignments(chapterId, dueDate),
    });
};

/**
 * Retrieves a single assignment by its uuid
 * @param assignmentId - uuid of assignment
 * @returns - Assignment object
 */
export const useAssignmentById = (assignmentId?: string) => {
    return useQuery({
        queryKey: ["assignment", assignmentId],
        queryFn: async () => getAssignmentById(assignmentId),
        enabled: !!assignmentId,
    });
};

/**
 * Creates a new assignment
 * @param newAssignment - Partial<Assignment> object containing the details of the new assignment
 * @returns - the created Assignment object
 */
export const useCreateAssignment = (newAssignment: Partial<Assignment>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => createAssignment(newAssignment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
        },
        onError: (error) => {
            console.error("Error creating assignment:", error);
        },
    });
};

/**
 * Updates an existing assignment by its uuid
 * @param assignmentId - uuid of the assignment to update
 * @param updatedAssignment - Partial<Assignment> object containing the updated details of the assignment
 * @returns - the updated Assignment object
 */
export const useEditAssignmentById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            assignmentId,
            updatedAssignment,
        }: {
            assignmentId: string;
            updatedAssignment: Partial<Assignment>;
        }) => editAssignmentById(assignmentId, updatedAssignment),
        onSuccess: (assignmentId) => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
            queryClient.invalidateQueries({
                queryKey: ["assignment", assignmentId],
            });
        },
        onError: (error) => {
            console.error("Error editing assignment:", error);
        },
    });
};

/**
 * Deletes an assignment by its uuid
 * @param assignmentId - uuid of the assignment to delete
 * @returns - nothing
 */
export const useDeleteAssignmentById = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ assignmentId }: { assignmentId: string }) =>
            deleteAssignmentById(assignmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
        },
        onError: (error) => {
            console.error("Error deleting assignment:", error);
        },
    });
};
