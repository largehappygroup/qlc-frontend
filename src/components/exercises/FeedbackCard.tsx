import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";

import { Flex, Text, Badge, Button, Card } from "@mantine/core";
import FeedbackSliders from "./FeedbackSliders";
import { WithChapterId } from "../../types/Chapter";

const FeedbackCard: React.FC<WithChapterId> = ({ chapterId }) => {
    const [exists, setExists] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/feedback/exists`,
                    { params: { chapterId, userId: user?.vuNetId } }
                );
                setExists(response.data.exists);
            } catch (error) {
                console.error("Error checking feedback status:", error);
            }
        };
        fetchData();
    }, [chapterId]);

    return (
        <Card bg="cyan" c="white">
            <Flex
                gap="md"
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align="center"
            >
                <Flex direction="column" gap="md">
                    <Badge variant="default" size="md">
                        {exists ? "Completed" : "Not Started"}
                    </Badge>
                    <Text size="xl" fw="bold">
                        Please Provide Feedback
                    </Text>
                </Flex>
                {exists && (
                    <FeedbackSliders chapterId={chapterId}>
                        <Button
                            radius="xl"
                            size="sm"
                            variant="white"
                            w={{ base: "100%", lg: "auto" }}
                        >
                            Start
                        </Button>
                    </FeedbackSliders>
                )}
            </Flex>
        </Card>
    );
};

export default FeedbackCard;
