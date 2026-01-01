import axios from "axios";
import { Chapter } from "../types/Chapter";

export const getChapters = async (order?: string, date?: Date) => {
    try {
        let query = "";
        if (order && date) {
            query += `?order=${order}&date=${date}`;
        } else if (order) {
            query += `?order=${order}`;
        } else if (date) {
            query += `?date=${date}`;
        }
        const response = await axios.get<Chapter[]>(
            `${import.meta.env.VITE_BACKEND_URL}/chapters${query}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching chapters:", error);
        throw error;
    }
};