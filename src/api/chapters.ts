import axios from "axios";
import { Chapter } from "../types/Chapter";
import { Assignment } from "../types/Assignment";

export const getAllChapters = async (order?: string, released?: boolean) => {
    try {
        const response = await axios.get<Chapter[]>(
            `${import.meta.env.VITE_BACKEND_URL}/chapters`,
            {
                params: {
                    order,
                    released,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw new Error("Error fetching chapters: " + error);
    }
};

/**
 * Creates a new chapter
 * @param newChapter - Partial<Chapter> object containing the details of the new chapter
 * @param assignments - Optional array of Partial<Assignment> objects to associate with the new chapter
 * @returns - the created Chapter object
 */
export const createChapter = async (
    newChapter: Partial<Chapter>,
    assignments?: Partial<Assignment>[],
) => {
    try {
        const response = await axios.post<Chapter>(
            `${import.meta.env.VITE_BACKEND_URL}/chapters`,
            { ...newChapter, assignments },
        );
        return response.data;
    } catch (error) {
        throw new Error("Error creating chapter: " + error);
    }
};

/**
 * Updates an existing chapter by its uuid
 * @param chapterId - uuid of the chapter to update
 * @param updatedChapter - Partial<Chapter> object containing the updated details of the chapter
 * @param assignments - Optional array of Partial<Assignment> objects to associate with the updated chapter
 * @returns - the updated Chapter object
 */
export const editChapterById = async (
    chapterId: string,
    updatedChapter: Partial<Chapter>,
    assignments?: Partial<Assignment>[],
) => {
    try {
        const response = await axios.put<Chapter>(
            `${import.meta.env.VITE_BACKEND_URL}/chapters/${chapterId}`,
            { ...updatedChapter, assignments },
        );
        return response.data;
    } catch (error) {
        console.error("Error editing chapter:", error);
    }
};

/**
 * Deletes a chapter by its uuid
 * @param chapterId - uuid of the chapter to delete
 * @returns - nothing
 */
export const deleteChapterById = async (chapterId: string) => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/chapters/${chapterId}`,
        );
    } catch (error) {
        console.error("Error deleting chapter:", error);
    }
};
