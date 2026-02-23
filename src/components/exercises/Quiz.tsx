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
import { Exercise, WithExercise } from "../../types/Exercise";
import Explanation from "../questions/Explanation";
import Ratings from "../questions/Ratings";
import StartQuiz from "./StartQuiz";
import CompleteQuiz from "./CompleteQuiz";
import { useCheckAnswer, useSubmitRatings } from "../../hooks/useExercises";
import { getExercise } from "../../api/exercises";

const Quiz: React.FC<PropsWithChildren<WithExercise>> = ({
    children,
    exercise,
}: PropsWithChildren<WithExercise>) => {
    const { mutateAsync: submitRatings } = useSubmitRatings();
    const { mutateAsync: checkAnswer } = useCheckAnswer();
    const [opened, { open, close }] = useDisclosure(false);
    const [showStart, setShowStart] = useState(true);
    const [showEnd, setShowEnd] = useState(false);

    const computeInitialIndex = (ex?: Exercise) => {
        if (!ex || !Array.isArray(ex.questions) || ex.questions.length === 0)
            return 0;
        // prefer the first question that is not completed (server `status: 'completed'`)
        const firstIncomplete = ex.questions.findIndex((q) => {
            return q.status !== "completed";
        });

        if (firstIncomplete !== -1) return firstIncomplete;
        // otherwise fall back to completedQuestions (safe guard)
        return typeof ex.completedQuestions === "number"
            ? Math.min(ex.completedQuestions, ex.questions.length - 1)
            : 0;
    };

    const [questionIndex, setQuestionIndex] = useState(() =>
        computeInitialIndex(exercise),
    );
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);

    const [ratings, setRatings] = useState<{ [key: string]: number }>(
        exercise ? exercise?.questions[questionIndex].ratings : {},
    );
    const [ratingsError, setRatingsError] = useState("");

    const [timePaused, setTimePaused] = useState(true);
    const [timeStopped, setTimeStopped] = useState(true);
    const [timeSpent, setTimeSpent] = useState(0);

    // sync questionIndex only when exercise data changes
    useEffect(() => {
        if (exercise) {
            const idx = computeInitialIndex(exercise);
            setQuestionIndex((prev) => Math.max(prev, idx));
        }
    }, [exercise]);

    // manage timers and timeSpent; depend on timePaused/timeStopped and questionIndex
    useEffect(() => {
        if (timeStopped) {
            setTimeSpent(
                exercise ? exercise?.questions[questionIndex].timeSpent : 0,
            );
        }

        if (!timePaused && !timeStopped) {
            const timer = setInterval(() => {
                setTimeSpent((timeSpent) => timeSpent + 1);
            }, 1000);

            return () => clearInterval(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timePaused, timeStopped, questionIndex]);

    /**
     * If the answer is correct, move to the next question or close the modal if it is the last question.
     * If not correct, do nothing.
     * Fetch the updated exercise from the backend to get the latest progress.
     */
    const handleContinue = async () => {
        if (!correct) {
            setSubmitted(false);
            setSelectedAnswer("");
            setTimePaused(false);
            setRatingsError("");
            return;
        }
        const requiredRatings = ["clarity", "helpfulness"];
        const missing = requiredRatings.filter(
            (key) => ratings[key] === undefined || ratings[key] === null,
        );
        if (correct && missing.length > 0) {
            setRatingsError(
                "Please fill out all required ratings before continuing.",
            );
            return;
        }

        if (correct && exercise) {
            await submitRatings({ exercise, ratings, questionIndex });
            // re-fetch the exercise from the server to get authoritative state
            try {
                const updated = await getExercise(
                    exercise.userId,
                    exercise.assignmentId,
                );
                // if server marks exercise complete, show end; otherwise advance
                const completed =
                    updated?.completedQuestions >=
                    (updated?.questions?.length || 0);
                if (completed) {
                    setShowEnd(true);
                } else {
                    setQuestionIndex(questionIndex + 1);
                    setCorrect(false);
                    setTimeStopped(false);
                    setRatings({});
                }
            } catch (e) {
                // fallback: advance locally
                setQuestionIndex(questionIndex + 1);
                setCorrect(false);
                setTimeStopped(false);
                setRatings({});
            }
        }
        setRatingsError("");
        setSubmitted(false);
        setSelectedAnswer("");
        setTimePaused(false);
    };

    const showModal = () => {
        // If the current question has already been submitted, show the submitted screen with ratings
        const question = exercise?.questions[questionIndex];
        if (question) {
            const hasUserAnswer =
                Array.isArray(question.userAnswers) &&
                question.userAnswers.length > 0;
            const lastAnswer = hasUserAnswer
                ? question.userAnswers?.[question.userAnswers.length - 1]
                : "";
            // consider a question "submitted" if there's a user answer, ratings, or status indicates an attempt
            const wasSubmitted = question.status !== "not-attempted";

            if (wasSubmitted) {
                setSubmitted(true);
                setRatings(question.ratings);
                // userAnswers items may be strings or objects { selectedAnswer }
                setSelectedAnswer(lastAnswer ? lastAnswer?.selectedAnswer : "");

                setCorrect(
                    Boolean(
                        question.status === "correct-attempted" ||
                        question.status === "completed",
                    ),
                );
                setShowStart(false);
                setShowEnd(false);
                setTimeSpent(question.timeSpent || 0);
            } else {
                setShowStart(true);
                setShowEnd(false);
                setSubmitted(false);
                setRatings({});
                setCorrect(false);
            }
        }
        setTimePaused(true);
        setTimeStopped(true);
        open();
    };

    const hideModal = () => {
        setTimeStopped(true);
        setTimePaused(true);
        close();
    };

    const startQuiz = () => {
        setShowStart(false);
        setTimePaused(false);
        setTimeStopped(false);
    };

    const requiredRatings = ["clarity", "helpfulness"];
    const canContinue =
        !correct ||
        (!!ratings &&
            requiredRatings.every(
                (key) => ratings[key] !== undefined && ratings[key] !== null,
            ));

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
                                (100 * (exercise?.completedQuestions || 0)) /
                                (exercise?.questions.length || 1)
                            }
                            striped
                            animated
                        />

                        <CloseButton onClick={hideModal} />
                    </Flex>
                    {showStart ? (
                        <StartQuiz exercise={exercise} startQuiz={startQuiz} />
                    ) : showEnd ? (
                        <CompleteQuiz onEnd={hideModal} exercise={exercise} />
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
                                        userSelectedAnswers={exercise?.questions[
                                            questionIndex
                                        ]?.userAnswers?.map(
                                            (answer) => answer.selectedAnswer,
                                        )}
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
                                    <Flex
                                        direction="column"
                                        gap="xs"
                                        align="end"
                                    >
                                        {ratingsError && submitted && (
                                            <Box
                                                style={{
                                                    color: "red",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {ratingsError}
                                            </Box>
                                        )}
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
                                                    if (!exercise) return;
                                                    setTimePaused(true);
                                                    const result =
                                                        await checkAnswer({
                                                            selectedAnswer,
                                                            exercise,
                                                            questionIndex,
                                                            timeSpent,
                                                        });

                                                    if (result) {
                                                        setTimeStopped(true);
                                                        setCorrect(true);
                                                    }
                                                    setSubmitted(true);
                                                    setRatingsError("");
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
