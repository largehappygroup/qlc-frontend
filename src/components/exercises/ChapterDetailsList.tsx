import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { Flex, Skeleton, Text } from "@mantine/core";
import ExerciseCard from "./ExerciseCard";
import FeedbackCard from "./FeedbackCard";
import { WithChapter } from "../../types/Chapter";

interface ChapterDetailsListProps extends WithChapter {
    date?: Date;
}

const ChapterDetailsList: React.FC<ChapterDetailsListProps> = ({
    chapter,
    date,
}: ChapterDetailsListProps) => {
    const [chapterAssignments, setChapterAssignments] =
        useState<ChapterAssignment[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let query = "";
            if (chapter && date) {
                query += `?chapterId=${chapter._id}&date=${date}`;
            } else if (chapter) {
                query += `?chapterId=${chapter._id}`;
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
                        <FeedbackCard chapterId={chapter?._id} />
                    )
                )}
                {items}
            </Skeleton>
        </Flex>
    );
};

export default ChapterDetailsList;
