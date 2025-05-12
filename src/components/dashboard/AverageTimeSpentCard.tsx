import { Card, Flex, Title, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

interface AverageTimeSpentCardProps {
    individualUser?: boolean;
}

const AverageTimeSpentCard: React.FC<AverageTimeSpentCardProps> = ({
    individualUser,
}: AverageTimeSpentCardProps) => {
    const [timeSpent, setTimeSpent] = useState("");
    const {user} = useAuth();

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
                    <Flex direction="column" align="center">
                        <Title order={2}>{timeSpent}</Title>
                        <Text c="dimmed">Average Time Spent</Text>
                    </Flex>
                </Card>
            )}
        </>
    );
};

export default AverageTimeSpentCard;
