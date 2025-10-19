import { Flex, Rating, Text } from "@mantine/core";

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

    return questions.map((question) => {
        return (
            <>
                <Flex justify="space-between" align="center" gap="md">
                    <Text>{question.preface}</Text>
                    <Flex justify="center" align="center" gap="md">
                        <Text size="sm">{question[1]}</Text>
                        <Rating
                            value={value ? value[question.value] : undefined}
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
