import {
    Affix,
    Button,
    CloseButton,
    Container,
    Divider,
    Flex,
    Progress,
    Title,
    Text,
    Code,
    ThemeIcon,
    Box,
    Modal,
    ScrollArea,
    Popover,
    Space,
} from "@mantine/core";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import CodingQuestion from "./questions/CodingQuestion";
import { IconCheck } from "@tabler/icons-react";
import Layout from "./Layout";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../types/Exercise";
import { Question } from "../types/Question";
import Explanation from "./questions/Explanation";
import { useAuth } from "../hooks/AuthContext";

interface QuizProps {
    children?: React.ReactNode;
    exercise: Exercise | undefined;
    setExercise: (exercise: Exercise) => void;
}

const Quiz: React.FC<QuizProps> = ({
    children,
    exercise,
    setExercise,
}: QuizProps) => {
    const { user } = useAuth();
    const [opened, { open, close }] = useDisclosure(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [question, setQuestion] = useState<Question>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const [userCorrect, setUserCorrect] = useState(false);

    const [timePaused, setTimePaused] = useState(true);
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const questionId = exercise?.questions[questionIndex]._id;
            if (questionId) {
                const response = await axios.get<Question>(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/questions/${questionId}`
                );
                setQuestion(response.data);
            }
        };
        if (exercise) {
            console.log(exercise)
            fetchData();
        }
    }, [questionIndex, exercise]);

    useEffect(() => {
        setTimeSpent(0);

        if (!timePaused) {
            const timer = setInterval(() => {
                setTimeSpent((timeSpent) => timeSpent + 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timePaused]);

    const checkAnswer = async () => {
        if (selectedAnswer !== "") {
            const questionId = exercise?.questions[questionIndex]._id;
            const response = await axios.post(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/questions/${questionId}/check`,
                { userAnswer: selectedAnswer }
            );
            setUserCorrect(response.data);
            setSubmitted(true);
        }
    };

    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1);
        setSubmitted(false);
        setSelectedAnswer("");
    };

    const showModal = () => {
        setTimePaused(false);
        open();
    };

    const hideModal = () => {
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
                            query={question?.query}
                            availableAnswers={question?.availableAnswers}
                        />
                        <Divider />
                        {submitted && (
                            <Explanation
                                explanation={question?.explanation}
                                correct={userCorrect}
                            />
                        )}
                        <Flex justify="end">
                            {submitted ? (
                                <Button
                                    onClick={nextQuestion}
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
