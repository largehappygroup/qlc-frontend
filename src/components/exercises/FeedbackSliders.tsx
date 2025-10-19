import {
    Box,
    Container,
    Divider,
    Flex,
    InputLabel,
    Modal,
    Slider,
    Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


interface FeedbackProps {
    children?: React.ReactNode;
}

const questions = [
    {
        id: "easeOfUnderstanding",
        text: "The exercises are easy to understand.",
    },
    {
        id: "reasonableQuestions",
        text: "The exercises are asking reasonable questions.",
    },
    {
        id: "helpsUnderstandCode",
        text: "The exercises are helping me better understand the programming assignment code they are based on.",
    },
    {
        id: "helpsUnderstandJava",
        text: "The exercises are overall helping me better understand the Java programming language.",
    },
];

const FeedbackSliders: React.FC<FeedbackProps> = ({ children }) => {
    const [opened, { open, close }] = useDisclosure(false);

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
                            <Flex direction="column" gap="xl" key={question.id}>
                                <InputLabel required>
                                    {question.text}
                                </InputLabel>
                                <Slider
                                    min={1}
                                    max={5}
                                    step={1}
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
                            <Textarea placeholder="Your feedback" minRows={3} />
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
