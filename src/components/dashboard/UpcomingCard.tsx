import { Badge, Card, Flex, Title, Text, Button } from "@mantine/core";

import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { useAuth } from "../../hooks/AuthContext";
import ChapterExercises from "../exercises/ChapterExercises";

interface UpcomingCardProps {
    status?: string;
    topics?: string[];
}

const UpcomingCard: React.FC<UpcomingCardProps> = ({}: UpcomingCardProps) => {
    const [exercise, setExercise] = useState<Exercise>();
    const { user } = useAuth();

    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Text size="xs" c="dimmed" fw="bold" tt="uppercase">
                    Exercises This Week
                </Text>
            </Flex>
            <ChapterExercises chapterId="6818cbb5bca8c567cca5c657" />
        </Card>
    );
};

export default UpcomingCard;
