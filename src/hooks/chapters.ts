

import { useQuery } from "@tanstack/react-query";
import { getChapters } from "../api/chapters";
import { useAuth } from "./AuthContext";

const { user } = useAuth();

export const useChapters = (order?: string, date?: Date) => {
    return useQuery({
        queryKey: ["chapters", order, date],
        queryFn: async () => getChapters(order, date),
        enabled: !!user,
    });
};