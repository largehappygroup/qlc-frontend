import { Badge, Card, Flex, Title, Text, Button } from "@mantine/core";

import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { useAuth } from "../../hooks/AuthContext";

interface TimeCardProps {
    status?: string;
    topics?: string[];
}

const TimeCard: React.FC<TimeCardProps> = ({}: TimeCardProps) => {
    const [exercise, setExercise] = useState<Exercise>();
    const { user } = useAuth();

    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Text size="xs" c="dimmed" fw="bold" tt="uppercase">
                    Average Time Spent
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

export default TimeCard;
