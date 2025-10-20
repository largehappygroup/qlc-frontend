import {
    Flex,
    Text,
    ThemeIcon,
    Accordion,
    Modal,
    Box,
    Grid,
    Card,
    RingProgress,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";
import { useDisclosure } from "@mantine/hooks";
import { WithExercise } from "../../types/Exercise";

interface SummaryProps extends PropsWithChildren<WithExercise> {
    date?: Date;
}

const Summary: React.FC<SummaryProps> = ({
    exercise,
    children,
    date,
}: SummaryProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Box w={{ base: "100%", lg: "auto" }} onClick={open}>
                {children}
            </Box>

            <Modal
                opened={opened}
                fullScreen
                onClose={close}
                title={
                    date
                        ? `Summary for ${date.toLocaleDateString()}`
                        : "Summary"
                }
                centered
            >
                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Card>
                            <Flex direction="column" align="center" gap="xs">
                                <Text>Your Score</Text>
                                <Text c="dimmed">
                                    You answered{" "}
                                    {exercise &&
                                        `${exercise?.totalCorrect} out of ${exercise?.questions.length} questions correctly`}
                                </Text>
                                <RingProgress
                                    sections={[
                                        {
                                            value: exercise
                                                ? Math.round(
                                                      (exercise?.totalCorrect /
                                                          exercise?.questions
                                                              .length) *
                                                          100
                                                  )
                                                : 0,
                                            color: "green",
                                        },
                                    ]}
                                    label={
                                        <Text
                                            c="green"
                                            fw={700}
                                            ta="center"
                                            size="xl"
                                        >
                                            {exercise &&
                                                Math.round(
                                                    (exercise?.totalCorrect /
                                                        exercise?.questions
                                                            .length) *
                                                        100
                                                )}
                                            %
                                        </Text>
                                    }
                                />
                            </Flex>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Accordion>
                            {exercise?.questions.map((question, index) => (
                                <Accordion.Item
                                    key={index + 1}
                                    value={`${index + 1}`}
                                >
                                    <Accordion.Control
                                        icon={
                                            <ThemeIcon
                                                color={
                                                    question.correct
                                                        ? "green"
                                                        : "red"
                                                }
                                            >
                                                {question.correct ? (
                                                    <IconCheck />
                                                ) : (
                                                    <IconX />
                                                )}
                                            </ThemeIcon>
                                        }
                                    >
                                        {`Question ${index + 1}`}
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text>{question.query}</Text>
                                        <Text>
                                            {
                                                question.userAnswers?.[
                                                    question.userAnswers
                                                        ?.length - 1
                                                ].selectedAnswer
                                            }
                                        </Text>
                                        <Text c="dimmed">
                                            {question.explanation}
                                        </Text>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Grid.Col>
                </Grid>
            </Modal>
        </>
    );
};

export default Summary;
