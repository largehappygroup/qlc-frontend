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
    Code,
    Grid,
} from "@mantine/core";
import MultipleChoiceQuestion from "../questions/MultipleChoiceQuestion";

import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";
import { Exercise, WithExerciseAndSetExercise } from "../../types/Exercise";
import Explanation from "../questions/Explanation";
import Ratings from "../questions/Ratings";
import StartQuiz from "./StartQuiz";
import CompleteQuiz from "./CompleteQuiz";

const Quiz: React.FC<PropsWithChildren<WithExerciseAndSetExercise>> = ({
    children,
    exercise,
    setExercise,
}: PropsWithChildren<WithExerciseAndSetExercise>) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [showStart, setShowStart] = useState(true);
    const [showEnd, setShowEnd] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(
        exercise ? exercise.completedQuestions : 0
    );
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);

    const [ratings, setRatings] = useState<{ [key: string]: number }>(
        exercise ? exercise?.questions[questionIndex].ratings : {}
    );

    const [timePaused, setTimePaused] = useState(true);
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
        const questionId = exercise?.questions[questionIndex].uuid;
        await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/${
                exercise?.uuid
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
            const questionId = exercise?.questions[questionIndex].uuid;
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/${
                    exercise?.uuid
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
                setShowEnd(true);
            } else {
                setQuestionIndex(questionIndex + 1);
                setCorrect(false);
                setTimeStopped(false);
                setRatings({});
            }

            if (setExercise) {
                const refreshExercise = await axios.get<Exercise>(
                    `${import.meta.env.VITE_BACKEND_URL}/exercises/${
                        exercise?.uuid
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
        setShowStart(true);
        setTimePaused(true);
        setTimeStopped(true);
        open();
    };

    const hideModal = () => {
        setTimeStopped(false);
        setTimePaused(true);
        close();
    };

    const startQuiz = () => {
        setShowStart(false);
        setTimePaused(false);
        setTimeStopped(false);
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
                        {showStart ? (
                            <StartQuiz
                                exercise={exercise}
                                startQuiz={startQuiz}
                            />
                        ) : showEnd ? (
                            <CompleteQuiz endQuiz={hideModal} />
                        ) : (
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <Code block>
                                        <ScrollArea h={300}>
                                            {exercise?.studentCode}
                                        </ScrollArea>
                                    </Code>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <Flex direction="column" gap="md" mb="md">
                                        <MultipleChoiceQuestion
                                            submitted={submitted}
                                            value={selectedAnswer}
                                            onChange={setSelectedAnswer}
                                            query={
                                                exercise?.questions[
                                                    questionIndex
                                                ].query
                                            }
                                            availableAnswers={
                                                exercise?.questions[
                                                    questionIndex
                                                ].availableAnswers
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
                                                    w={{
                                                        base: "100%",
                                                        md: "auto",
                                                    }}
                                                >
                                                    Continue
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={checkAnswer}
                                                    radius="xl"
                                                    w={{
                                                        base: "100%",
                                                        md: "auto",
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Grid.Col>
                            </Grid>
                        )}
                    </Flex>
                </Container>
            </Modal>
        </>
    );
};

export default Quiz;
