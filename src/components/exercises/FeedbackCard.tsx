import { Flex, Text, Badge, Button } from "@mantine/core";
import FeedbackSliders from "./FeedbackSliders";

const FeedbackCard: React.FC = () => {
    return (
        <>
            <Flex justify="space-between" gap="md">
                <Badge variant="default" size="md">
                    Not Started
                </Badge>
            </Flex>
            <Flex
                gap="md"
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align={{ base: "start", sm: "end" }}
            >
                <Flex direction="column" justify="flex-start">
                    <Text size="xl" fw="bold">
                        Please Provide Feedback
                    </Text>
                </Flex>
                <FeedbackSliders>
                    <Button
                        radius="xl"
                        size="sm"
                        w={{ base: "100%", lg: "auto" }}
                    >
                        Give Feedback
                    </Button>
                </FeedbackSliders>
            
            </Flex>
        </>
    );
};

export default FeedbackCard;
