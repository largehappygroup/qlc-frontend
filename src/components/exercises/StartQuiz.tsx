import { Flex, Title, Text, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { WithExercise } from "../../types/Exercise";
import { Assignment } from "../../types/Assignment";
import axios from "axios";

interface StartQuizProps extends WithExercise {
    startQuiz: () => void;
}

const StartQuiz: React.FC<StartQuizProps> = ({ startQuiz, exercise }) => {
    const [assignment, setAssignment] = useState<Assignment>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Assignment>(
                    `${import.meta.env.VITE_BACKEND_URL}/assignments/${
                        exercise?.assignmentId
                    }`
                );
                setAssignment(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [exercise?.assignmentId]);

    return (
        <Flex
            gap="lg"
            direction="column"
            w="100%"
            h="100%"
            align="center"
            ta="center"
        >
            <Title order={1}>
                {`${assignment?.identifier}: ${assignment?.title}`}
            </Title>
            <Text c="dimmed">
                {`Questions Completed: ${exercise?.completedQuestions}/${exercise?.questions.length}`}
            </Text>
            <Button onClick={startQuiz}>Begin!</Button>
        </Flex>
    );
};

export default StartQuiz;
