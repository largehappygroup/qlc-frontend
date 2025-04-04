import { Button, Flex, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Question } from "../../types/Question";
import axios from "axios";

interface MultipleChoiceQuestionProps {
    query: string | undefined;
    availableAnswers: string[] | undefined;
    value?: string;
    onChange?: (item: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    query,
    availableAnswers,
    value,
    onChange,
}: MultipleChoiceQuestionProps) => {
    const selectAnswer = (answer: string) => {
        if (onChange) {
            onChange(answer);
        }
    };

    return (
        <Flex direction="column" gap="xl">
            <Text ta="center">{query}</Text>
            <Grid>
                {availableAnswers?.map((answer, index) => (
                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Button
                            fullWidth
                            key={index}
                            size="md"
                            h="100%"
                            variant={answer == value ? "filled" : "light"}
                            radius="xl"
                            py="sm"
                            style={{ whiteSpace: "normal" }}
                            onClick={() => selectAnswer(answer)}
                        >
                            <Text style={{ whiteSpace: "normal" }}>
                                {answer}
                            </Text>
                        </Button>
                    </Grid.Col>
                ))}
            </Grid>
        </Flex>
    );
};

export default MultipleChoiceQuestion;
