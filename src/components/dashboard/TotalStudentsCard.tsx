import { Card, Flex, Title, Text, ThemeIcon } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
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
        <Card withBorder shadow="sm">
            <Flex direction="column" gap="sm">
                <Flex justify="space-between" align="center">
                    <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                        Students
                    </Title>
                    <ThemeIcon c="dimmed" variant="transparent">
                        <IconUsers stroke={2} size={25} />
                    </ThemeIcon>
                </Flex>
                <Flex direction="column">
                    <Title order={2} c="cyan">
                        {totalStudents}
                    </Title>
                    <Text size="sm" c="dimmed">
                        Enrolled
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default TotalStudentsCard;
