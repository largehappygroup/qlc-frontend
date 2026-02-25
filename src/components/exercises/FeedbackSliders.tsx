import { PropsWithChildren, useState } from "react";

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
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

import { useAuth } from "../../hooks/AuthContext";
import { WithChapterId } from "../../types/Chapter";

type FeedbackSlidersProps = PropsWithChildren<
    WithChapterId & { setExists: (exists: boolean) => void }
>;

const FeedbackSliders: React.FC<FeedbackSlidersProps> = ({
    children,
    chapterId,
    setExists,
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [easeOfUnderstanding, setEaseOfUnderstanding] = useState<
        number | null
    >(null);
    const [reasonableQuestions, setReasonableQuestions] = useState<
        number | null
    >(null);
    const [helpsUnderstandCode, setHelpsUnderstandCode] = useState<
        number | null
    >(null);
    const [helpsUnderstandJava, setHelpsUnderstandJava] = useState<
        number | null
    >(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [comments, setComments] = useState("");
    const { user } = useAuth();
    const handleSubmit = async () => {
        // validate required sliders
        const newErrors: { [key: string]: string } = {};
        if (easeOfUnderstanding == null)
            newErrors.easeOfUnderstanding = "Please select a value.";
        if (reasonableQuestions == null)
            newErrors.reasonableQuestions = "Please select a value.";
        if (helpsUnderstandCode == null)
            newErrors.helpsUnderstandCode = "Please select a value.";
        if (helpsUnderstandJava == null)
            newErrors.helpsUnderstandJava = "Please select a value.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/feedback?userId=${
                    user?.vuNetId
                }&chapterId=${chapterId}`,
                {
                    easeOfUnderstanding,
                    reasonableQuestions,
                    helpsUnderstandCode,
                    helpsUnderstandJava,
                    comments,
                },
            );
            setExists(true);
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
        setErrors({});
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
            <Modal fullScreen opened={opened} onClose={close}>
                <Container>
                    <Flex direction="column" gap="sm">
                        {questions.map((question) => (
                            <Flex direction="column" gap="lg" key={question.id}>
                                <Flex align="center" justify="space-between">
                                    <InputLabel required>
                                        {question.text}
                                    </InputLabel>
                                    {errors[question.id] && (
                                        <Text size="xs" c="red" fw={700} mt={6}>
                                            {errors[question.id]}
                                        </Text>
                                    )}
                                </Flex>
                                <Slider
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={question.value ?? undefined}
                                    onChange={(val: number) =>
                                        question.onChange(val)
                                    }
                                    label={null}
                                    showLabelOnHover={false}
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

                                <Divider size="sm" my="sm" />
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
