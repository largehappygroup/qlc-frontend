import {
    Button,
    Container,
    Flex,
    InputLabel,
    Modal,
    Slider,
    Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Feedback: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal fullScreen opened={opened} onClose={close} title="Exercise Feedback">
                <Container>
                    <Flex direction="column" gap="xl">
                        <Flex direction="column" gap="sm">
                            <InputLabel required>
                                The exercises are easy to understand and are
                                asking reasonable questions.
                            </InputLabel>
                            <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={3}
                                marks={[
                                    { value: 1, label: "Strongly Disagree" },
                                    { value: 2, label: "Disagree" },
                                    { value: 3, label: "Neutral" },
                                    { value: 4, label: "Agree" },
                                    { value: 5, label: "Strongly Agree" },
                                ]}
                            />
                        </Flex>
                        <Flex direction="column" gap="sm">
                            <InputLabel required>
                                The exercises are helping me better understand
                                the code they are based on.
                            </InputLabel>
                            <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={3}
                                marks={[
                                    { value: 1, label: "Strongly Disagree" },
                                    { value: 2, label: "Disagree" },
                                    { value: 3, label: "Neutral" },
                                    { value: 4, label: "Agree" },
                                    { value: 5, label: "Strongly Agree" },
                                ]}
                            />
                        </Flex>
                        <Flex direction="column" gap="sm">
                            <InputLabel required>
                                The exercises are helping me better understand
                                Java.
                            </InputLabel>
                            <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={3}
                                marks={[
                                    { value: 1, label: "Strongly Disagree" },
                                    { value: 2, label: "Disagree" },
                                    { value: 3, label: "Neutral" },
                                    { value: 4, label: "Agree" },
                                    { value: 5, label: "Strongly Agree" },
                                ]}
                            />
                        </Flex>
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
            <Button onClick={open}>Give Feedback</Button>
        </>
    );
};

export default Feedback;
