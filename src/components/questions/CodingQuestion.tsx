import { Flex, Text, Textarea } from "@mantine/core";

interface CodingQuestionProps {
    question?: string;
}

const CodingQuestion: React.FC<CodingQuestionProps> = ({
    question,
}: CodingQuestionProps) => {
    return (
        <>
            <Text ta="center">{question}</Text>
            <Flex direction="column" gap="xl">
                <Textarea></Textarea>
            </Flex>
        </>
    );
};

export default CodingQuestion;
