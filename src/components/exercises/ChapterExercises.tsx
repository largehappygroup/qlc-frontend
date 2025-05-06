import React, { useEffect, useState } from "react";
import { Chapter } from "../../types/Chapter";
import axios from "axios";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { Badge, Button, Divider, Flex, Text } from "@mantine/core";
import { IconProgressCheck } from "@tabler/icons-react";

interface ChapterExercisesProps {
    chapterId?: string;
}

const ChapterExercises: React.FC<ChapterExercisesProps> = ({
    chapterId,
}: ChapterExercisesProps) => {
    const [chapterAssignments, setChapterAssignments] =
        useState<ChapterAssignment[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<ChapterAssignment[]>(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/assignments?chapter=${chapterId}`
            );
            setChapterAssignments(response.data);
        };
        if (chapterId) {
            fetchData();
        }
    }, [chapterId]);

    const items = chapterAssignments?.map((assignment) => (
        <Flex gap="sm" direction="column">
            <Divider />
            <Flex justify="space-between" gap="md">
                <Badge size="md" variant="light">
                    {new Date(assignment.initialDueDate).toLocaleDateString()}
                </Badge>
                <Badge variant="default" size="md">
                    Completed
                </Badge>
            </Flex>
            <Flex gap="md" justify="space-between" align="end">
                <Flex direction="column" justify="flex-start">
                    <Text size="xl" fw="bold">
                        {assignment.identifier}: {assignment.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                        3/5 Questions
                    </Text>
                </Flex>
                <Button size="compact-sm">Continue</Button>
            </Flex>
        </Flex>
    ));

    return (
        <Flex direction="column" gap="xs" py="sm">
            {items?.length === 0 && <Text>No Assignments Found.</Text>}
            {items}
        </Flex>
    );
};

export default ChapterExercises;
