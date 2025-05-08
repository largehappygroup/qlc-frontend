import {
    Button,
    CloseButton,
    Container,
    Divider,
    Flex,
    Progress,
    Box,
    Modal,
    ScrollArea,
} from "@mantine/core";
import MultipleChoiceQuestion from "../questions/MultipleChoiceQuestion";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import Explanation from "../questions/Explanation";

interface QuizProps {
    children?: React.ReactNode;
    exercise?: Exercise;
    setExercise?: (exercise: Exercise) => void;
}

const Quiz: React.FC<QuizProps> = ({
    children,
    exercise,
    setExercise,
}: QuizProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [questionIndex, setQuestionIndex] = useState(
        exercise ? exercise.completedQuestions : 0
    );
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);

    const [timePaused, setTimePaused] = useState(false);
    const [timeStopped, setTimeStopped] = useState(true);
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
        if (timeStopped) {
            setTimeSpent(
                exercise ? exercise?.questions[questionIndex].timeSpent : 0
            );
        }

        if (!timePaused && !timeStopped) {
            const timer = setInterval(() => {
                setTimeSpent((timeSpent) => timeSpent + 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timePaused, timeStopped]);

    const checkAnswer = async () => {
        if (selectedAnswer !== "") {
            setTimePaused(true);
            const questionId = exercise?.questions[questionIndex]._id;
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/${
                    exercise?._id
                }/check?questionId=${questionId}`,
                { userAnswer: selectedAnswer, timeSpent }
            );
            if (response.data.result) {
                setTimeStopped(true);
                setCorrect(true);
            }
            setSubmitted(true);
        }
    };

    const handleContinue = async () => {
        if (correct) {
            if (questionIndex + 1 === exercise?.questions.length) {
                hideModal();
            } else {
                setQuestionIndex(questionIndex + 1);
                setCorrect(false);
                setTimeStopped(false);
            }

            if (setExercise) {
                const refreshExercise = await axios.get<Exercise>(
                    `${import.meta.env.VITE_BACKEND_URL}/exercises/${
                        exercise?._id
                    }`
                );
                setExercise(refreshExercise.data);
            }
        }
        setSubmitted(false);
        setSelectedAnswer("");
        setTimePaused(false);
    };

    const showModal = () => {
        setTimePaused(false);
        setTimeStopped(false);
        open();
    };

    const hideModal = () => {
        setTimeStopped(false);
        setTimePaused(true);
        close();
    };

    return (
        <>
            <Box w={{ base: "100%", lg: "auto" }} onClick={showModal}>
                {children}
            </Box>
            <Modal
                opened={opened}
                onClose={hideModal}
                withCloseButton={false}
                scrollAreaComponent={ScrollArea.Autosize}
                centered
                fullScreen
            >
                <Container>
                    <Flex direction="column" gap="xl">
                        <Flex align="center" gap="md">
                            <Progress
                                flex="1"
                                radius="xl"
                                size="lg"
                                value={
                                    100 *
                                    (questionIndex /
                                        (exercise?.questions.length || 1))
                                }
                                striped
                                animated
                            />
                            {timeSpent}
                            <CloseButton onClick={hideModal} />
                        </Flex>
                        <MultipleChoiceQuestion
                            value={selectedAnswer}
                            onChange={setSelectedAnswer}
                            query={exercise?.questions[questionIndex].query}
                            availableAnswers={
                                exercise?.questions[questionIndex]
                                    .availableAnswers
                            }
                        />
                        <Divider />
                        {submitted && (
                            <Explanation
                                correct={correct}
                                explanation={
                                    exercise?.questions[questionIndex]
                                        .explanation
                                }
                            />
                        )}
                        <Flex justify="end">
                            {submitted ? (
                                <Button
                                    onClick={handleContinue}
                                    radius="xl"
                                    w={{ base: "100%", md: "auto" }}
                                >
                                    Continue
                                </Button>
                            ) : (
                                <Button
                                    onClick={checkAnswer}
                                    radius="xl"
                                    w={{ base: "100%", md: "auto" }}
                                >
                                    Submit
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Container>
            </Modal>
        </>
    );
};

export default Quiz;
