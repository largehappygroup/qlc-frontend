import { Flex, Text, Badge, Button, Card } from "@mantine/core";
import FeedbackSliders from "./FeedbackSliders";

const FeedbackCard: React.FC = () => {
    return (
        <Card bg="cyan" c="white">
            <Flex
                gap="md"
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align={{ base: "start", sm: "end" }}
            >
                <Text size="xl" fw="bold">
                    Please Provide Feedback
                </Text>
                <Flex direction="column" justify="space-between" align="end">
                    <Badge variant="default" size="md">
                        Not Started
                    </Badge>
                    <FeedbackSliders>
                        <Button
                            radius="xl"
                            size="sm"
                            color="white"
                            w={{ base: "100%", lg: "auto" }}
                        >
                            Give Feedback
                        </Button>
                    </FeedbackSliders>
                </Flex>
            </Flex>
        </Card>
    );
};

export default FeedbackCard;
