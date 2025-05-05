import { Badge, Card, Flex, Title, Text, Button } from "@mantine/core";

import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { useAuth } from "../../hooks/AuthContext";

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
            <Text size="xl" fw="bold">
                1 Minute
            </Text>
            <Text size="xs" c="dimmed">
                Per Question
            </Text>
        </Card>
    );
};

export default UpcomingCard;
