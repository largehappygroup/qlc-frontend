import { Card, Flex, Title, Text, ThemeIcon } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { IconStars } from "@tabler/icons-react";

interface AverageScoreCardProps {
    userId?: string
}

const AverageScoreCard: React.FC<AverageScoreCardProps> = ({
    userId
}: AverageScoreCardProps) => {
    const [average, setAverage] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/average${
                    userId ? "?userId=" + userId : ""
                }`
            );
            setAverage(response.data);
        };
        fetchData();
    });

    return (
        <Card withBorder shadow="sm">
            <Flex direction="column" gap="sm">
                <Flex justify="space-between" align="center">
                    <Title c="dimmed" size="sm" order={1}>
                        Average Score
                    </Title>
                    <ThemeIcon c="dimmed" variant="transparent">
                        <IconStars stroke={1.5} size={25} />
                    </ThemeIcon>
                </Flex>
                <Flex direction="column">
                    <Title order={2}>{average}%</Title>
                    <Text size="md" c="dimmed">
                        Per Exercise
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default AverageScoreCard;
