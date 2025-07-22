import { Flex, ThemeIcon, Title, Text,  } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface ExplanationProps {
    correct?: boolean;
    explanation?: string | undefined;
}

const Explanation: React.FC<ExplanationProps> = ({
    correct,
    explanation,
}: ExplanationProps) => {
    return (
        <>
            <Flex gap="lg" align="center">
                {correct ? (
                    <ThemeIcon color="green">
                        <IconCheck style={{ width: "70%", height: "70%" }} />
                    </ThemeIcon>
                ) : (
                    <ThemeIcon color="red">
                        <IconX style={{ width: "70%", height: "70%" }} />
                    </ThemeIcon>
                )}

                <Title>{`${correct ? "C" : "Inc"}orrect!`}</Title>
            </Flex>
            <Text>{explanation}</Text>
        </>
    );
};

export default Explanation;
