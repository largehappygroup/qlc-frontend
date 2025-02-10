import { Button, Flex, Grid, Text } from "@mantine/core";
import { useState } from "react";

interface MultipleChoiceQuestionProps {
    question?: string;
    availableAnswers?: string[];
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    question,
    availableAnswers,
}: MultipleChoiceQuestionProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);

    return (
        <Flex direction="column" gap="xl">
            <Text ta="center">{question}</Text>
            <Grid>
                {availableAnswers?.map((answer, index) => (
                    <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Button
                            fullWidth
                            key={index}
                            size="md"
                            variant={
                                index == selectedAnswer ? "filled" : "light"
                            }
                            radius="xl"
                            onClick={() => setSelectedAnswer(index)}
                        >
                            {answer}
                        </Button>
                    </Grid.Col>
                ))}
            </Grid>
        </Flex>
    );
};

export default MultipleChoiceQuestion;
