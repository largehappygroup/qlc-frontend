import { Card, Flex, Title, Text, ThemeIcon } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { PropsWithUserId, useAuth } from "../../hooks/AuthContext";
import { IconClock } from "@tabler/icons-react";

const AverageTimeSpentCard: React.FC<PropsWithUserId> = ({
    userId,
}: PropsWithUserId) => {
    const [timeSpent, setTimeSpent] = useState("00:00:00");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/time-spent${
                    userId ? "?userId=" + userId : ""
                }`
            );
            if (response.data) {
                setTimeSpent(response.data);
            } else {
                setTimeSpent("00:00:00");
            }
        };
        fetchData();
    });

    return (
        <Card withBorder shadow="sm">
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
    );
};

export default AverageTimeSpentCard;
