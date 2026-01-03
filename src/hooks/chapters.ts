

import { useQuery } from "@tanstack/react-query";
import { getChapters } from "../api/chapters";

export const useChapters = (order?: string, date?: Date) => {
    return useQuery({
        queryKey: ["chapters", order, date],
        queryFn: async () => getChapters(order, date),
    });
};