import { Badge, Card, Flex, Title, Text, Button } from "@mantine/core";
import Summary from "../Summary";
import Quiz from "../Quiz";
import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { useAuth } from "../../hooks/AuthContext";

interface TodayCardProps {
    status?: string;
    topics?: string[];
}

const TodayCard: React.FC<TodayCardProps> = ({
    status,
    topics,
}: TodayCardProps) => {
    const [exercise, setExercise] = useState<Exercise>();
    const { user } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<Exercise>(
                    `${import.meta.env.VITE_BACKEND_URL}/exercises`,
                    {userId: user?._id}
                );
                setExercise(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        if (user) {
            fetchData();
        }
    }, [user]);

    const formatDate = (date: Date | undefined) => {
        if (date && !isNaN(new Date(date).getTime())) {
            return new Date(date).toLocaleDateString();
        }
        return "Invalid Date"; // or any fallback text you prefer
    };

    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Badge>{formatDate(exercise?.date)}</Badge>
                <Badge tt="capitalize">{exercise?.status}</Badge>
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
                    <Quiz exercise={exercise}>
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
