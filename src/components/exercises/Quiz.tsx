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
    Tabs,
    Code,
} from "@mantine/core";
import MultipleChoiceQuestion from "../questions/MultipleChoiceQuestion";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import Explanation from "../questions/Explanation";
import Ratings from "../questions/Ratings";

interface QuizProps {
    children?: React.ReactNode;
    exercise?: Exercise;
    studentCode?: string;
    setExercise?: (exercise: Exercise) => void;
}

const Quiz: React.FC<QuizProps> = ({
    children,
    exercise,
    studentCode,
    setExercise,
}: QuizProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [questionIndex, setQuestionIndex] = useState(
        exercise ? exercise.completedQuestions : 0
    );
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);

    const [ratings, setRatings] = useState<{ [key: string]: number }>(
        exercise ? exercise?.questions[questionIndex].ratings : {}
    );

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

    const submitRatings = async () => {
        const questionId = exercise?.questions[questionIndex]._id;
        await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/${
                exercise?._id
            }/ratings`,
            { questionId, ratings }
        );
    };

    /**
     * Check the selected answer with the backend and get whether it is correct.
     * If correct, stop the timer and show the explanation.
     */
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

    /**
     * If the answer is correct, move to the next question or close the modal if it is the last question.
     * If not correct, do nothing.
     * Fetch the updated exercise from the backend to get the latest progress.
     */
    const handleContinue = async () => {
        if (correct) {
            await submitRatings();

            if (questionIndex + 1 === exercise?.questions.length) {
                hideModal();
            } else {
                setQuestionIndex(questionIndex + 1);
                setCorrect(false);
                setTimeStopped(false);
                setRatings({});
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

                            <CloseButton onClick={hideModal} />
                        </Flex>
                        <Tabs defaultValue="question">
                            <Tabs.List>
                                <Tabs.Tab value="question">Question</Tabs.Tab>
                                <Tabs.Tab value="studentCode">
                                    Student Code
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="question" pt="xs">
                                <MultipleChoiceQuestion
                                    submitted={submitted}
                                    value={selectedAnswer}
                                    onChange={setSelectedAnswer}
                                    query={
                                        exercise?.questions[questionIndex].query
                                    }
                                    availableAnswers={
                                        exercise?.questions[questionIndex]
                                            .availableAnswers
                                    }
                                />
                                <Divider />
                                {submitted && (
                                    <>
                                        <Explanation
                                            correct={correct}
                                            explanation={
                                                exercise?.questions[
                                                    questionIndex
                                                ].explanation
                                            }
                                        />
                                        {correct && (
                                            <Ratings
                                                value={ratings}
                                                onChange={setRatings}
                                            />
                                        )}
                                    </>
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
                            </Tabs.Panel>
                            <Tabs.Panel value="studentCode" pt="xs">
                                <Code block>{studentCode}</Code>
                            </Tabs.Panel>
                        </Tabs>
                    </Flex>
                </Container>
            </Modal>
        </>
    );
};

export default Quiz;
