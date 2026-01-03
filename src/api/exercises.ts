import axios from "axios";
import { Exercise, RecentActivity } from "../types/Exercise";

/**
 * Calls API to get exercise data by ID
 * @param exerciseId - uuid of the exercise
 * @returns - exercise data Exercise
 */
export const getExercise = async (exerciseId: string | undefined) => {
    try {
        const response = await axios.get<Exercise>(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/${exerciseId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching exercise:", error);
        throw error;
    }
};

/**
 * Gets the exercises for a specific assignment
 * @param assignmentId - uuid of the assignment (optional)
 * @returns - exercises data Exercise[]
 */
export const getExercises = async (assignmentId: string | undefined) => {
    try {
        let response;
        if (assignmentId) {
            response = await axios.get<Exercise[]>(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/exercises?assignmentId=${assignmentId}`
            );
        } else {
            response = await axios.get<Exercise[]>(
                `${import.meta.env.VITE_BACKEND_URL}/exercises`
            );
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching exercises:", error);
        throw error;
    }
};

export const getAverageScore = async (userId?: string) => {
    try {
        const response = await axios.get<number>(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/average${
                userId ? "?userId=" + userId : ""
            }`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching average score:", error);
        throw error;
    }
};

export const getAverageTimeSpent = async (userId?: string) => {
    try {
        const response = await axios.get<string>(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/time-spent${
                userId ? "?userId=" + userId : ""
            }`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching average time spent:", error);
        throw error;
    }
};

export const getRecentActivity = async (userId?: string) => {
    try {
        const response = await axios.get<RecentActivity[]>(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/recent-activity${
                userId ? "?userId=" + userId : ""
            }`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching recent activity:", error);
        throw error;
    }
};

export const getScoreDistribution = async (userId?: string) => {
    try {
        const response = await axios.get<{ percentage: number; count: number }[]>(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/distribution${
                userId ? "?userId=" + userId : ""
            }`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching score distribution:", error);
        throw error;
    }
};

export const handleDownload = async (fields: string) => {
    try {
        const response = await axios.get(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/exercises/download?fields=${fields}`,
            {
                responseType: "blob",
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "exercises.csv"); // Set filename
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Download error:", error);
    }
};

export const regenerateExercise = async (
    userId?: string,
    assignmentId?: string) => {
    try {
        const response = await axios.post<Exercise>(
            `${
                import.meta.env.VITE_BACKEND_URL}/exercises/regenerate?userId=${userId}&assignmentId=${assignmentId}`);
        return response.data;
    } catch (error) {
        console.error("Error regenerating exercise:", error);
        throw error;
    }
};