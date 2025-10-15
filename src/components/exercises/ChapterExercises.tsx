import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { Flex, Skeleton, Text } from "@mantine/core";
import ExerciseCard from "./ExerciseCard";

interface ChapterExercisesProps {
    chapterId?: string;
    date?: Date;
}

const ChapterExercises: React.FC<ChapterExercisesProps> = ({
    chapterId,
    date,
}: ChapterExercisesProps) => {
    const [chapterAssignments, setChapterAssignments] =
        useState<ChapterAssignment[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let query = "";
            if (chapterId && date) {
                query += `?chapterId=${chapterId}&date=${date}`;
            } else if (chapterId) {
                query += `?chapterId=${chapterId}`;
            } else if (date) {
                query += `?date=${date}`;
            }
            const response = await axios.get<ChapterAssignment[]>(
                `${import.meta.env.VITE_BACKEND_URL}/assignments${query}`
            );
            setChapterAssignments(response.data);
            setIsLoading(false);
        };

        fetchData();
    }, [chapterId, date]);

    const items = chapterAssignments?.map((assignment, index) => (
        <ExerciseCard index={index} assignment={assignment} />
    ));

    return (
        <Flex direction="column" gap="xs" pt="sm">
            <Skeleton visible={isLoading}>
                {items?.length === 0 && <Text>No Assignments Found.</Text>}
                {items}
            </Skeleton>
        </Flex>
    );
};

export default ChapterExercises;
