import { Flex, Rating, Text } from "@mantine/core";
import { useEffect } from "react";

interface RatingsProps {
    value?: { [key: string]: number };
    onChange?: (value: { [key: string]: number }) => void;
}

const questions = [
    {
        preface: "Regarding the clarity of the question, it was",
        value: "clarity",
        1: "Very hard to understand",
        5: "Very easy to understand",
    },
    {
        preface: "Regarding the helpfulness of the question, it was",
        value: "helpfulness",
        1: "Not helpful for understanding coding concepts.",
        5: "Very helpful for understanding coding concepts.",
    },
];

const Ratings: React.FC<RatingsProps> = ({ value, onChange }) => {
    useEffect(() => {
        if (!value && onChange) {
            onChange(
                questions
                    .map((q) => q.value)
                    .reduce((acc, value) => ({ ...acc, [value]: 3 }), {})
            );
        }
    }, []);
    useEffect(() => {
        console.log("Ratings value changed:", value);
    }, [value]);
    return questions.map((question) => {
        return (
            <>
                <Flex justify="space-between" align="center" gap="md">
                    <Text>{question.preface}</Text>
                    <Flex justify="space-between" align="center" gap="md">
                        <Text size="sm">{question[1]}</Text>
                        <Rating
                            value={value ? value[question.value] : 3}
                            onChange={(val) => {
                                const newValue = {
                                    ...value,
                                    [question.value]: val,
                                };
                                onChange && onChange(newValue);
                            }}
                            count={5}
                        />
                        <Text size="sm">{question[5]}</Text>
                    </Flex>
                </Flex>
            </>
        );
    });
};

export default Ratings;
