import {
    Flex,
    Text,
    ThemeIcon,
    Accordion,
    Grid,
    Card,
    RingProgress,
    ActionIcon,
    ScrollArea,
    Code,
} from "@mantine/core";
import { IconCheck, IconCode, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { WithExercise } from "../../types/Exercise";

const Summary: React.FC<WithExercise> = ({ exercise }: WithExercise) => {
    const [showCode, setShowCode] = useState<boolean>(false);
    return (
        <>
            <Grid w="100%" h="100%">
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card>
                        <Flex direction="column" align="center" gap="xs">
                            <Text>Your Score</Text>
                            <Text c="dimmed">
                                You answered{" "}
                                {exercise &&
                                    `${exercise?.totalCorrect} out of ${exercise?.questions.length} questions correctly the first time.`}
                            </Text>
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
                                            Math.round(
                                                (exercise?.totalCorrect /
                                                    exercise?.questions
                                                        .length) *
                                                    100,
                                            )}
                                        %
                                    </Text>
                                }
                            />
                        </Flex>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Flex justify="end" mb="md">
                        <ActionIcon
                            size="sm"
                            onClick={() => setShowCode(!showCode)}
                        >
                            <IconCode />
                        </ActionIcon>
                    </Flex>
                    {showCode && (
                        <ScrollArea h={300} ta="left">
                            <Code block mb="sm">
                                {exercise?.submission}
                            </Code>
                        </ScrollArea>
                    )}
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
                                                (question.userAnswers?.length ||
                                                    0) - 1
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
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Summary;
