import { Button, Flex, Grid, Text } from "@mantine/core";

interface MultipleChoiceQuestionProps {
    userSelectedAnswers?: string[];
    submitted?: boolean;
    query: string | undefined;
    availableAnswers: string[] | undefined;
    value?: string;
    onChange?: (item: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    submitted,
    query,
    availableAnswers,
    value,
    userSelectedAnswers,
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
                    <Grid.Col span={6}>
                        <Button
                            fullWidth
                            key={index}
                            size="xs"
                            variant={answer == value ? "filled" : "light"}
                            radius="xl"
                            py="sm"
                            h="100%"
                            style={{
                                whiteSpace: "preserve",
                            }}
                            onClick={() => selectAnswer(answer)}
                            disabled={
                                submitted ||
                                userSelectedAnswers?.includes(answer)
                            }
                        >
                            <Text size="sm" style={{ whiteSpace: "preserve" }}>
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
