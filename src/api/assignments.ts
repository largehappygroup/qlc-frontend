import axios from "axios";
import { Assignment } from "../types/Assignment";

/**
 * retrieves a single assignment by its uuid
 * @param assignmentId - uuid of assignment
 * @returns - Assignment object
 */
export const getAssignmentById = async (assignmentId: string | undefined) => {
    try {
        const response = await axios.get<Assignment>(
            `${import.meta.env.VITE_BACKEND_URL}/assignments/${assignmentId}`,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching assignment:", error);
        throw new Error("Error fetching assignment: " + error);
    }
};

/**
 * retrieves assignments, optionally filtered by chapterId and/or date
 * @param chapterId - uuid of chapter
 * @param date - date object of assignment
 * @returns - assignments array
 */
export const getAllAssignments = async (chapterId?: string) => {
    try {
        const response = await axios.get<Assignment[]>(
            `${import.meta.env.VITE_BACKEND_URL}/assignments`,
            {
                params: {
                    chapterId,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching assignments: " + error);
    }
};

/**
 * Creates a new assignment
 * @param newAssignment - Partial<Assignment> object containing the details of the new assignment
 * @returns - the created Assignment object
 */
export const createAssignment = async (newAssignment: Partial<Assignment>) => {
    try {
        const response = await axios.post<Assignment>(
            `${import.meta.env.VITE_BACKEND_URL}/assignments`,
            newAssignment,
        );
        return response.data;
    } catch (error) {
        throw new Error("Error creating assignment: " + error);
    }
};

/**
 * Updates an existing assignment by its uuid
 * @param assignmentId - uuid of the assignment to update
 * @param updatedAssignment - Partial<Assignment> object containing the updated details of the assignment
 * @returns
 */
export const editAssignmentById = async (
    assignmentId: string,
    updatedAssignment: Partial<Assignment>,
) => {
    try {
        const response = await axios.put<Assignment>(
            `${import.meta.env.VITE_BACKEND_URL}/assignments/${assignmentId}`,
            updatedAssignment,
        );
        return response.data;
    } catch (error) {
        throw new Error("Error editing assignment: " + error);
    }
};

/**
 * Deletes an assignment by its uuid
 * @param assignmentId - uuid of the assignment to delete
 * @returns - nothing
 */
export const deleteAssignmentById = async (assignmentId: string) => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/assignments/${assignmentId}`,
        );
    } catch (error) {
        throw new Error("Error deleting assignment: " + error);
    }
};
