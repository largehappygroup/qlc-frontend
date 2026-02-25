import {
    Flex,
    Text,
    ThemeIcon,
    Accordion,
    Grid,
    Card,
    RingProgress,
    ScrollArea,
    Code,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { WithExercise } from "../../types/Exercise";

const Summary: React.FC<WithExercise> = ({ exercise }: WithExercise) => {
    return (
        <>
            <Grid p="sm" w="100%" h="100%" gutter="md">
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Flex w="100%" direction="column" gap="md">
                        <Card withBorder>
                            <Flex direction="column" align="center" gap="xs">
                                <Text c="dimmed">You answered</Text>
                                <RingProgress
                                    sections={[
                                        {
                                            value: exercise
                                                ? Math.round(
                                                      (exercise?.totalCorrect /
                                                          exercise?.questions
                                                              .length) *
                                                          100,
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
                                                `${exercise?.totalCorrect}/${exercise?.questions.length}`}
                                        </Text>
                                    }
                                />
                                <Text c="dimmed">
                                    questions correctly the first time.
                                </Text>
                            </Flex>
                        </Card>
                        <Card withBorder>
                            <ScrollArea h={300} ta="left">
                                <Code block mb="sm">
                                    {exercise?.submission}
                                </Code>
                            </ScrollArea>
                        </Card>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Card withBorder>
                        <Accordion>
                            {exercise?.questions.map((question, index) => (
                                <Accordion.Item
                                    ta="left"
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
                                        <Text>
                                            <Text span fw="bold">
                                                Question:
                                            </Text>
                                            {` ${question.query}`}
                                        </Text>
                                        <Text>
                                            <Text span fw="bold">
                                                Your First Answer:
                                            </Text>
                                            {` ${
                                                question.userAnswers?.[0]
                                                    ?.selectedAnswer ?? "—"
                                            }`}
                                        </Text>
                                        <Text>
                                            <Text span fw="bold">
                                                Correct Answer:
                                            </Text>
                                            {` ${
                                                question.userAnswers?.[
                                                    (question.userAnswers
                                                        ?.length || 0) - 1
                                                ]?.selectedAnswer ?? "—"
                                            }`}
                                        </Text>
                                        <Text c="dimmed">
                                            <Text span fw="bold">
                                                Explanation:
                                            </Text>
                                            {` ${question.explanation}`}
                                        </Text>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Summary;
