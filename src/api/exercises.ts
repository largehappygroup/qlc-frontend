import axios from "axios";
import { Exercise } from "../types/Exercise";

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
