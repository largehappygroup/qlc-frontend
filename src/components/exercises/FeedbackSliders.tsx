import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    InputLabel,
    Modal,
    Slider,
    Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { PropsWithChildren, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { WithChapterId } from "../../types/Chapter";

type FeedbackSlidersProps = PropsWithChildren<WithChapterId>;

const FeedbackSliders: React.FC<FeedbackSlidersProps> = ({
    children,
    chapterId,
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [easeOfUnderstanding, setEaseOfUnderstanding] = useState(3);
    const [reasonableQuestions, setReasonableQuestions] = useState(3);
    const [helpsUnderstandCode, setHelpsUnderstandCode] = useState(3);
    const [helpsUnderstandJava, setHelpsUnderstandJava] = useState(3);
    const [comments, setComments] = useState("");
    const { user } = useAuth();
    const handleSubmit = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/feedback?userId=${
                    user?._id
                }&chapterId=${chapterId}`,
                {
                    easeOfUnderstanding,
                    reasonableQuestions,
                    helpsUnderstandCode,
                    helpsUnderstandJava,
                    comments,
                }
            );
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
        close();
    };
    const questions = [
        {
            id: "easeOfUnderstanding",
            text: "The exercises are easy to understand.",
            value: easeOfUnderstanding,
            onChange: setEaseOfUnderstanding,
        },
        {
            id: "reasonableQuestions",
            text: "The exercises are asking reasonable questions.",
            value: reasonableQuestions,
            onChange: setReasonableQuestions,
        },
        {
            id: "helpsUnderstandCode",
            text: "The exercises are helping me better understand the programming assignment code they are based on.",
            value: helpsUnderstandCode,
            onChange: setHelpsUnderstandCode,
        },
        {
            id: "helpsUnderstandJava",
            text: "The exercises are overall helping me better understand the Java programming language.",
            value: helpsUnderstandJava,
            onChange: setHelpsUnderstandJava,
        },
    ];
    return (
        <>
            <Modal
                fullScreen
                opened={opened}
                onClose={close}
                title="Exercise Feedback"
            >
                <Container>
                    <Flex direction="column" gap="xl">
                        {questions.map((question) => (
                            <Flex direction="column" gap="lg" key={question.id}>
                                <InputLabel required>
                                    {question.text}
                                </InputLabel>
                                <Slider
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={question.value}
                                    onChange={question.onChange}
                                    showLabelOnHover={false}
                                    defaultValue={3}
                                    marks={[
                                        {
                                            value: 1,
                                            label: "Strongly Disagree",
                                        },
                                        { value: 2, label: "Disagree" },
                                        { value: 3, label: "Neutral" },
                                        { value: 4, label: "Agree" },
                                        { value: 5, label: "Strongly Agree" },
                                    ]}
                                />
                                <Divider size="sm" my="md" />
                            </Flex>
                        ))}
                        <Flex direction="column" gap="sm">
                            <InputLabel>
                                Please give any additional feedback you have
                                about the exercises.
                            </InputLabel>
                            <Textarea
                                placeholder="Your feedback"
                                minRows={6}
                                maxRows={6}
                                value={comments}
                                onChange={(event) =>
                                    setComments(event.currentTarget.value)
                                }
                            />
                        </Flex>
                        <Flex justify="flex-end">
                            <Button variant="outline" onClick={handleSubmit}>
                                Submit Feedback
                            </Button>
                        </Flex>
                    </Flex>
                </Container>
            </Modal>
            <Box w={{ base: "100%", lg: "auto" }} onClick={open}>
                {children}
            </Box>
        </>
    );
};

export default FeedbackSliders;
