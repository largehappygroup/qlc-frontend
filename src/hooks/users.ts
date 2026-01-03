import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";
import { getTotalStudents, getUsers } from "../api/users";

const { user } = useAuth();

export const useUsers = (role?: string) => {
    return useQuery({
        queryKey: ["users", role],
        queryFn: async () => getUsers(role),
        enabled: !!user,
    });
};

export const useTotalStudents = () => {
    return useQuery({
        queryKey: ["totalStudents"],
        queryFn: async () => getTotalStudents(),
        enabled: !!user,
    });
}