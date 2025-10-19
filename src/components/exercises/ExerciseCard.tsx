import { Badge, Divider, Flex, Text, Button } from "@mantine/core";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import Quiz from "./Quiz";
import Summary from "./Summary";

interface ExerciseCardProps {
    index: number;
    assignment: ChapterAssignment;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
    index,
    assignment,
}: ExerciseCardProps) => {
    const [exercise, setExercise] = useState<Exercise>();
    const [studentCode, setStudentCode] = useState<string>();
    const { user } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<{exercise: Exercise, studentCode: string}>( //todo: switch back to post
                    `${import.meta.env.VITE_BACKEND_URL}/exercises?userId=${
                        user?._id
                    }&assignmentId=${assignment._id}`
                );
                setExercise(response.data.exercise);
                setStudentCode(response.data.studentCode);
            } catch (error) {
                console.error("Error fetching exercise:", error);
            }
        };
        if (user) {
            fetchData();
        }
    }, [assignment, index, user]);

    return (
        <>
            <Flex py="sm" gap="sm" direction="column">
                {index !== 0 && <Divider pb="sm" />}
                <Flex justify="space-between" gap="md">
                    <Badge size="md" variant="light">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                    </Badge>
                    <Badge variant="default" size="md">
                        {exercise ? exercise.status : "Not Started"}
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
                                >
                                    View Results
                                </Button>
                            </Summary>
                        ) : (
                            <Quiz studentCode={studentCode} exercise={exercise} setExercise={setExercise}>
                                <Button
                                    radius="xl"
                                    size="sm"
                                    w={{ base: "100%", lg: "auto" }}
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
