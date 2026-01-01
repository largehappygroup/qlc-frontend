import axios from "axios";
import { Assignment } from "../types/Assignment";

/**
 * retrieves a single assignment by its uuid
 * @param assignmentId - uuid of assignment
 * @returns - Assignment object
 */
export const getAssignment = async (assignmentId: string | undefined) => {
    try {
        const response = await axios.get<Assignment>(
            `${import.meta.env.VITE_BACKEND_URL}/assignments/${assignmentId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching assignment:", error);
        throw error;
    }
};

/**
 * retrieves assignments, optionally filtered by chapterId and/or date
 * @param chapterId - uuid of chapter
 * @param date - date object of assignment
 * @returns - assignments array
 */
export const getAssignments = async (chapterId?: string, date?: Date) => {
    try {
        let query = "";
        if (chapterId && date) {
            query += `?chapterId=${chapterId}&date=${date}`;
        } else if (chapterId) {
            query += `?chapterId=${chapterId}`;
        } else if (date) {
            query += `?date=${date}`;
        }
        const response = await axios.get<Assignment[]>(
            `${import.meta.env.VITE_BACKEND_URL}/assignments${query}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching assignments:", error);
        throw error;
    }
};
