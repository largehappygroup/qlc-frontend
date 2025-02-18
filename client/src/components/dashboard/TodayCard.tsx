import { Badge, Card, Flex, Title, Text, Button } from "@mantine/core";
import Summary from "../Summary";
import Quiz from "../Quiz";
import { useEffect, useState } from "react";
import axios from "axios";

interface TodayCardProps {
    date?: Date;
    status?: string;
    topics?: string[];
}

const TodayCard: React.FC<TodayCardProps> = ({
    date,
    status,
    topics,
}: TodayCardProps) => {
    
    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Badge>{date?.toLocaleDateString()}</Badge>
                <Badge tt="capitalize">{status}</Badge>
            </Flex>
            <Flex
                justify="space-between"
                direction={{ base: "column", lg: "row" }}
                align={{ base: "start", lg: "end" }}
                gap={{ base: "sm", lg: "md" }}
            >
                <Flex direction="column" gap={{ base: "sm", lg: "md" }}>
                    <Title>Today's Exercises</Title>
                    <Text>Topic(s): Arithmetic, Strings</Text>
                </Flex>
                
                {status == "Complete" ? (
                    <Summary questions={["", "", "", "", ""]}>
                        <Button
                            radius="xl"
                            size="compact-md"
                            w={{ base: "100%", lg: "auto" }}
                        >
                            View
                        </Button>
                    </Summary>
                ) : (
                    <Quiz>
                        <Button
                            radius="xl"
                            size="compact-md"
                            w={{ base: "100%", lg: "auto" }}
                        >
                            Start
                        </Button>
                    </Quiz>
                )}
            </Flex>
        </Card>
    );
};

export default TodayCard;
