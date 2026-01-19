import { Flex, ThemeIcon, Title, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useAuth } from "../../hooks/AuthContext";

interface ExplanationProps {
    correct?: boolean;
    reason?: string | undefined;
}

const Explanation: React.FC<ExplanationProps> = ({
    correct,
    reason,
}: ExplanationProps) => {
    const { user } = useAuth();
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
            <Text>{reason}</Text>
            <Text c="dimmed" size="sm">
                If you believe the question itself is incorrect, please click{" "}
                <a
                    href={`mailto:helen.wu@vanderbilt.edu?subject=${encodeURI(
                        "CS1101 QLC Study Exercise Issue",
                    )}&body=${encodeURI(
                        `Hi Helen!\n\nFor the exercises this week, I believe that question [INSERT QUESTION] for assigment [INSERT ASSIGNMENT (ex. PA06-A)] is incorrect because [INSERT REASON HERE]. Please take a look and let me know what you think.\nThank you!\n\n-- ${user?.firstName} ${user?.lastName} (${user?.email})`,
                    )}`}
                >
                    here
                </a>{" "}
                right now to send an email to Helen. Once you've sent out that
                email, please continue with the rest of the exercise. You'll get
                a response regarding the issue within 24-48 hours.
            </Text>
        </>
    );
};

export default Explanation;
