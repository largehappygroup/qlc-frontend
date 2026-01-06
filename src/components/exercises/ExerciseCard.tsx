import { useEffect} from "react";

import { Badge, Divider, Flex, Text, Button } from "@mantine/core";

import { Assignment } from "../../types/Assignment";

import Quiz from "./Quiz";
import Summary from "./Summary";
import { useExercise } from "../../hooks/exercises";
import { useAuth } from "../../hooks/AuthContext";

interface ExerciseCardProps {
    index: number;
    assignment: Assignment;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
    index,
    assignment,
}: ExerciseCardProps) => {
    const {user} = useAuth();
    const { data: exercise, refetch, isLoading } = useExercise(user?.vuNetId,assignment.uuid);

    useEffect(() => {
        refetch();
    }, [assignment, index]);

    return (
        <>
            <Flex py="sm" gap="sm" direction="column">
                {index !== 0 && <Divider pb="sm" />}
                <Flex justify="space-between" gap="md">
                    <Badge variant="default" size="md">
                        {exercise ? exercise.status : "Not Started"}
                    </Badge>
                    <Badge size="md" variant="light">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                    </Badge>
                </Flex>
                <Flex
                    gap="md"
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between"
                    align={{ base: "start", sm: "end" }}
                >
                    <Flex direction="column" justify="flex-start">
                        <Text size="xl" fw="bold">
                            {assignment.identifier}: {assignment.title}
                        </Text>
                        {exercise && (
                            <Text size="sm" c="dimmed">
                                {exercise.completedQuestions}/
                                {exercise.questions?.length} Questions Completed
                            </Text>
                        )}
                    </Flex>

                    {exercise ? (
                        exercise.status === "Complete" ? (
                            <Summary exercise={exercise}>
                                <Button
                                    radius="xl"
                                    size="sm"
                                    w={{ base: "100%", lg: "auto" }}
                                    loading={isLoading}
                                >
                                    View Results
                                </Button>
                            </Summary>
                        ) : (
                            <Quiz exercise={exercise} refresh={refetch}>
                                <Button
                                    radius="xl"
                                    size="sm"
                                    w={{ base: "100%", lg: "auto" }}
                                    loading={isLoading}
                                >
                                    {exercise.status === "Not Started"
                                        ? "Start"
                                        : "Continue"}
                                </Button>
                            </Quiz>
                        )
                    ) : (
                        <Button
                            radius="xl"
                            size="sm"
                            w={{ base: "100%", lg: "auto" }}
                            disabled
                            loading={isLoading}
                        >
                            Locked
                        </Button>
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default ExerciseCard;
