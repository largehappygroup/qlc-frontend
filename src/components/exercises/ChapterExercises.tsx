import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { Flex, Skeleton, Text } from "@mantine/core";
import ExerciseCard from "./ExerciseCard";
import FeedbackCard from "./FeedbackCard";
import { Chapter } from "../../types/Chapter";

interface ChapterExercisesProps {
    chapter?: Chapter;
    date?: Date;
}

const ChapterExercises: React.FC<ChapterExercisesProps> = ({
    chapter,
    date,
}: ChapterExercisesProps) => {
    const [chapterAssignments, setChapterAssignments] =
        useState<ChapterAssignment[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let query = "";
            if (chapter && date) {
                query += `?chapterId=${chapter.uuid}&date=${date}`;
            } else if (chapter) {
                query += `?chapterId=${chapter.uuid}`;
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
    }, [chapter, date]);

    const items = chapterAssignments?.map((assignment, index) => (
        <ExerciseCard index={index} assignment={assignment} />
    ));

    return (
        <Flex direction="column" gap="xs" pt="sm">
            <Skeleton visible={isLoading}>
                {items?.length === 0 ? (
                    <Text>No Assignments Found.</Text>
                ) : (
                    chapter?.requestFeedback && (
                        <FeedbackCard chapterId={chapter?.uuid} />
                    )
                )}
                {items}
            </Skeleton>
        </Flex>
    );
};

export default ChapterExercises;
