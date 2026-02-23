import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createChapter,
    deleteChapterById,
    editChapterById,
    getAllChapters,
} from "../api/chapters";
import { Chapter } from "../types/Chapter";
import { Assignment } from "../types/Assignment";

/**
 * Retrieves all chapters, optionally filtered by order and/or released status
 * @param order - order of chapters (asc or desc)
 * @param released - whether chapters are released
 * @returns - chapters array
 */
export const useAllChapters = (order?: string, released?: boolean) => {
    return useQuery({
        queryKey: ["chapters", order, released],
        queryFn: async () => getAllChapters(order, released),
    });
};

/**
 * Creates a new chapter
 * @param newChapter - Partial<Chapter> object containing the details of the new chapter
 * @param assignments - Optional array of Partial<Assignment> objects to associate with the new chapter
 * @returns - the created Chapter object
 */
export const useCreateChapter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            newChapter,
            assignments,
        }: {
            newChapter: Partial<Chapter>;
            assignments?: Partial<Assignment>[];
        }) => createChapter(newChapter, assignments),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapters"] });
        },
        onError: (error) => {
            console.error("Error creating chapter:", error);
        },
    });
};

/**
 * Updates an existing chapter by its uuid
 * @param chapterId - uuid of the chapter to update
 * @param updatedChapter - Partial<Chapter> object containing the updated details of the chapter
 * @param assignments - Optional array of Partial<Assignment> objects to associate with the updated chapter
 * @returns - the updated Chapter object
 */
export const useEditChapterById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            chapterId,
            updatedChapter,
            assignments,
        }: {
            chapterId: string;
            updatedChapter: Partial<Chapter>;
            assignments?: Partial<Assignment>[];
        }) => editChapterById(chapterId, updatedChapter, assignments),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapters"] });
        },
        onError: (error) => {
            console.error("Error editing chapter:", error);
        },
    });
};

/**
 * Deletes a chapter by its uuid
 * @param chapterId - uuid of the chapter to delete
 * @returns - nothing
 */
export const useDeleteChapterById = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ chapterId }: { chapterId: string }) =>
            deleteChapterById(chapterId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapters"] });
        },
        onError: (error) => {
            console.error("Error deleting chapter:", error);
        },
    });
};
