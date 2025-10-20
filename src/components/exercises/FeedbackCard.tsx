import { Flex, Text, Badge, Button, Card } from "@mantine/core";
import FeedbackSliders from "./FeedbackSliders";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";

interface FeedbackCardProps {
    chapterId?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ chapterId }) => {
    const [exists, setExists] = useState(false);
    const {user} = useAuth();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/feedback/exists`,
                { params: { chapterId, userId: user?._id } }
            );
            setExists(response.data.exists);
        } catch (error) {
            console.error("Error checking feedback status:", error);
        }
    }
    fetchData();
    }, [chapterId]);

    if (exists) {
        return null;
    }
    
    return (
        <Card bg="cyan" c="white">
            <Flex
                gap="md"
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align="center"
            >
                <Text size="xl" fw="bold">
                    Please Provide Feedback
                </Text>
                <Flex direction="column" gap="md" justify="space-between" align="end">
                    <Badge variant="default" size="md">
                        Not Started
                    </Badge>
                    <FeedbackSliders chapterId={chapterId}>
                        <Button
                            radius="xl"
                            size="sm"
                            variant="white"
                            w={{ base: "100%", lg: "auto" }}
                        >
                            Give Feedback
                        </Button>
                    </FeedbackSliders>
                </Flex>
            </Flex>
        </Card>
    );
};

export default FeedbackCard;
