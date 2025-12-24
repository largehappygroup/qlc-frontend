import { Button, Flex, Text } from "@mantine/core";

interface MultipleChoiceQuestionProps {
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
            <Flex direction="column" gap="md">
                {availableAnswers?.map((answer, index) => (
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
                        disabled={submitted}
                    >
                        <Text style={{ whiteSpace: "normal" }}>{answer}</Text>
                    </Button>
                ))}
            </Flex>
        </Flex>
    );
};

export default MultipleChoiceQuestion;
