import { Card, Flex, Text, Title } from "@mantine/core";
import React from "react";

const StreakCard: React.FC = () => {
    return (
        <Card shadow="sm" withBorder h="100%">
            <Text>Current Streak</Text>
            <Flex h="100%" align="center">
                <Title>2 Days</Title>
            </Flex>
        </Card>
    );
};

export default StreakCard;
