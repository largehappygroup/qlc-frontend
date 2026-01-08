import {
    Button,
    CloseButton,
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
import { WithExercise } from "../../types/Exercise";
import Explanation from "../questions/Explanation";
import Ratings from "../questions/Ratings";
import StartQuiz from "./StartQuiz";
import CompleteQuiz from "./CompleteQuiz";
import { checkAnswer, submitRatings } from "../../api/exercises";

interface QuizProps extends WithExercise {
    refresh: () => void;
}

const Quiz: React.FC<PropsWithChildren<QuizProps>> = ({
    children,
    exercise,
    refresh,
}: PropsWithChildren<QuizProps>) => {
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

    /**
     * If the answer is correct, move to the next question or close the modal if it is the last question.
     * If not correct, do nothing.
     * Fetch the updated exercise from the backend to get the latest progress.
     */
    const handleContinue = async () => {
        if (correct) {
            await submitRatings(exercise, ratings, questionIndex);

            if (questionIndex + 1 === exercise?.questions.length) {
                setShowEnd(true);
            } else {
                setQuestionIndex(questionIndex + 1);
                setCorrect(false);
                setTimeStopped(false);
                setRatings({});
            }

            refresh();
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

    const requiredRatings = ["clarity", "helpfulness", "ai-usage"];
    const canContinue = requiredRatings.every(
        (key) => ratings[key] !== undefined && ratings[key] !== null
    );

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
                <Flex direction="column" gap="xl" p="xl">
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
                        <StartQuiz exercise={exercise} startQuiz={startQuiz} />
                    ) : showEnd ? (
                        <CompleteQuiz endQuiz={hideModal} />
                    ) : (
                        <Grid>
                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                <Code block>
                                    <ScrollArea h={550}>
                                        {exercise?.submission}
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
                                            exercise?.questions[questionIndex]
                                                .query
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
                                                reason={
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
                                                disabled={!canContinue}
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
                                                onClick={async () => {
                                                    setTimePaused(true);
                                                    const result =
                                                        await checkAnswer(
                                                            selectedAnswer,
                                                            exercise,
                                                            questionIndex,
                                                            timeSpent
                                                        );

                                                    if (result) {
                                                        setTimeStopped(true);
                                                        setCorrect(true);
                                                    }
                                                    setSubmitted(true);
                                                }}
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
            </Modal>
        </>
    );
};

export default Quiz;
