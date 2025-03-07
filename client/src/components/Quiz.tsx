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

interface QuizProps {
    children?: React.ReactNode;
    exercise: Exercise | undefined;
}

const Quiz: React.FC<QuizProps> = ({ children, exercise }: QuizProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [question, setQuestion] = useState<Question>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);
    const [userCorrect, setUserCorrect] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const questionId = exercise?.questions[questionIndex].questionId;
            if (questionId) {
                const response = await axios.get<Question>(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/questions/${questionId}`
                );
                setQuestion(response.data);
            }
        };
        fetchData();
    }, [questionIndex, exercise]);

    const checkAnswer = async () => {
        if (selectedAnswer !== "") {
            const questionId = exercise?.questions[questionIndex].questionId;
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

    return (
        <>
            <Box w={{ base: "100%", lg: "auto" }} onClick={open}>
                {children}
            </Box>
            <Modal
                opened={opened}
                onClose={close}
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

                            <CloseButton onClick={close} />
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
