import { Card, Flex, Text, Title } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

const StreakCard: React.FC = () => {
    const { user } = useAuth();
    const [streak, setStreak] = useState("Loading...");

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/users/${
                        user?._id
                    }/streak`
                );
                setStreak(response.data);
            }
        };
        fetchData();
    }, [user]);

    return (
        <Card shadow="sm" withBorder h="100%">
            <Text>Current Streak</Text>
            <Flex h="100%" align="center">
                <Title>{streak}</Title>
            </Flex>
        </Card>
    );
};

export default StreakCard;
