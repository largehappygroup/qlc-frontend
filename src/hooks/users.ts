import { useQuery } from "@tanstack/react-query";
import { getTotalStudents, getUsers } from "../api/users";


export const useUsers = (role?: string) => {
    return useQuery({
        queryKey: ["users", role],
        queryFn: async () => getUsers(role),
    });
};

export const useTotalStudents = () => {
    return useQuery({
        queryKey: ["totalStudents"],
        queryFn: async () => getTotalStudents(),
    });
}