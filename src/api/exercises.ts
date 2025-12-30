import axios from "axios";
import { Exercise } from "../types/Exercise";

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
        return response.data || [];
    } catch (error) {
        console.error("Error fetching exercises:", error);
        throw error;
    }
};
