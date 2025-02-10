import { Button, Flex, Text, Textarea } from "@mantine/core";
import { useState } from "react";

interface CodingQuestionProps {
    question?: string;
}

const CodingQuestion: React.FC<CodingQuestionProps> = ({
    question,
}: CodingQuestionProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);

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
