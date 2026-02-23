import { Button, Flex, Grid, ScrollArea, Text } from "@mantine/core";

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
                            size="md"
                            h={100}
                            variant={answer == value ? "filled" : "light"}
                            radius="xl"
                            py="sm"
                            style={{
                                whiteSpace: "preserve",
                                overflow: "hidden",
                            }}
                            onClick={() => selectAnswer(answer)}
                            disabled={submitted || userSelectedAnswers?.includes(answer)}
                        >
                            <ScrollArea
                                h="100%"
                                w="100%"
                                scrollbarSize={6}
                                offsetScrollbars="y"
                            >
                                <Text style={{ whiteSpace: "preserve" }}>
                                    {answer}
                                </Text>
                            </ScrollArea>
                        </Button>
                    </Grid.Col>
                ))}
            </Grid>
        </Flex>
    );
};

export default MultipleChoiceQuestion;
