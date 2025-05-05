import { Badge, Card, Flex, Title, Text, Button } from "@mantine/core";

import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { useAuth } from "../../hooks/AuthContext";

interface ProgressCardProps {
    status?: string;
    topics?: string[];
}

const ProgressCard: React.FC<ProgressCardProps> = ({}: ProgressCardProps) => {
    const [exercise, setExercise] = useState<Exercise>();
    const { user } = useAuth();

    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Text size="xs" c="dimmed" fw="bold" tt="uppercase">
                    Exercises Completed
                </Text>
            </Flex>
            <Text size="xl" fw="bold">
                2/4
            </Text>
            <Text size="xs" c="dimmed">
                Chapter 2 In Progress
            </Text>
        </Card>
    );
};

export default ProgressCard;
