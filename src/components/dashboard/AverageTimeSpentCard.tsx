import { Card, Flex, Title, Text, ThemeIcon } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { IconClock } from "@tabler/icons-react";

interface AverageTimeSpentCardProps {
    individualUser?: boolean;
}

const AverageTimeSpentCard: React.FC<AverageTimeSpentCardProps> = ({
    individualUser,
}: AverageTimeSpentCardProps) => {
    const [timeSpent, setTimeSpent] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/time-spent${
                    individualUser ? "?userId=" + user?._id : ""
                }`
            );
            setTimeSpent(response.data);
        };
        fetchData();
    });

    return (
        <>
            {timeSpent && (
                <Card withBorder>
                    <Flex direction="column" gap="sm">
                        <Flex justify="space-between" align="center">
                            <Title c="dimmed" size="sm" order={1}>
                                Average Time Spent
                            </Title>
                            <ThemeIcon c="dimmed" variant="transparent">
                                <IconClock stroke={1.5} size={25} />
                            </ThemeIcon>
                        </Flex>
                        <Flex direction="column">
                            <Title order={2}>{timeSpent}</Title>
                            <Text size="md" c="dimmed">
                                Per Exercise
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            )}
        </>
    );
};

export default AverageTimeSpentCard;
