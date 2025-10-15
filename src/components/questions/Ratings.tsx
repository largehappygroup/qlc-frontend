import { Rating, Text } from "@mantine/core";
import { useEffect } from "react";

interface RatingsProps {
    value?: { [key: string]: number };
    onChange?: (value: { [key: string]: number }) => void;
}

const questions = [
    { preface: "Regarding the clarity of the question...", 1: "I did not understand what the question was asking.", 5: "It was very easy to understand what the question was asking." },
    { preface: "Regarding the helpfulness of the question...", 1: "Not helpful at helping me understand coding concepts.", 5: "Helpful at helping me understand coding concepts." },
]

const Ratings: React.FC<RatingsProps> = ({ value, onChange }) => {
    useEffect(() => {
        if (!value && onChange) {
            onChange(questions.map(q => q.preface).reduce((acc, preface) => ({ ...acc, [preface]: 3 }), {}));
        }
    }, []);
    useEffect(() => {
        console.log("Ratings value changed:", value);
    }, [value]);
    return questions.map((question) => {
        const key = question.preface;
        return (
            <>
            <Text>{question.preface}</Text>
            <Rating
                value={value ? value[key] : 3}
                onChange={(val) => {
                    const newValue = { ...value, [key]: val };
                    onChange && onChange(newValue);
                }}
                count={5}
                
            />
            </>
        );
    });
};

export default Ratings;