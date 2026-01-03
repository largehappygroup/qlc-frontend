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

export const getTotalStudents = async () => {
    try {
        const response = await axios.get<number>(
            `${import.meta.env.VITE_BACKEND_URL}/users/total-students`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching total students:", error);
        throw error;
    }
};

export const handleDownload = async (student: boolean, fields: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/users/download${
                student ? "?role=student&" : "?"
            }fields=${fields}`,
            { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Download error:", error);
    }
};
