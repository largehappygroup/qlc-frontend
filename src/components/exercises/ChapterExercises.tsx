import React, { useEffect, useState } from "react";
import { Chapter } from "../../types/Chapter";
import axios from "axios";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { Badge, Button, Divider, Flex, Skeleton, Text } from "@mantine/core";
import { IconProgressCheck } from "@tabler/icons-react";
import ExerciseCard from "./ExerciseCard";

interface ChapterExercisesProps {
    chapterId?: string;
}

const ChapterExercises: React.FC<ChapterExercisesProps> = ({
    chapterId,
}: ChapterExercisesProps) => {
    const [chapterAssignments, setChapterAssignments] =
        useState<ChapterAssignment[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<ChapterAssignment[]>(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/assignments?chapterId=${chapterId}`
            );
            setChapterAssignments(response.data);
            setIsLoading(false);
        };
        if (chapterId) {
            fetchData();
        }
    }, [chapterId]);

    const items = chapterAssignments?.map((assignment, index) => (
        <ExerciseCard index={index} assignment={assignment}/>
    ));

    return (
        <Flex direction="column" gap="xs" py="sm">
            <Skeleton visible={isLoading}>
                {items?.length === 0 && <Text>No Assignments Found.</Text>}
                {items}
            </Skeleton>
        </Flex>
    );
};

export default ChapterExercises;
