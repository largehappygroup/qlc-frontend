import { Card, Flex, Title, Text } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TotalStudentsCard: React.FC = () => {
    const [totalStudents, setTotalStudents] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<number>(
                `${import.meta.env.VITE_BACKEND_URL}/users/total-students`
            );
            setTotalStudents(response.data);
        };
        fetchData();
    });

    return (
        <Card withBorder>
            <Flex direction="column" align="center">
                <Title order={2}>{totalStudents}</Title>
                <Text c="dimmed">Total Student(s)</Text>
            </Flex>
        </Card>
    );
};

export default TotalStudentsCard;
