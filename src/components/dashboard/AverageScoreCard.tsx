import { Card, Flex, Title, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

interface AverageScoreCardProps {
    individualUser?: boolean;
}

const AverageScoreCard: React.FC<AverageScoreCardProps> = ({
    individualUser,
}: AverageScoreCardProps) => {
    const [average, setAverage] = useState(0);
    const { user } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/average${
                    individualUser ? "?userId=" + user?._id : ""
                }`
            );
            setAverage(response.data);
        };
        fetchData();
    });

    return (
        <Card withBorder>
            <Flex direction="column" align="center">
                <Title order={2}>{average}%</Title>
                <Text c="dimmed">Average Score</Text>
            </Flex>
        </Card>
    );
};

export default AverageScoreCard;
