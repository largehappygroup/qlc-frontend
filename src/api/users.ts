import axios from "axios";
import { User } from "../types/User";

export const getUsers = async (role?: string) => {
    try {
        let query = "";
        if (role) {
            query += `?role=${role}`;
        }
        const response = await axios.get<User[]>(
            `${import.meta.env.VITE_BACKEND_URL}/users${query}`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
