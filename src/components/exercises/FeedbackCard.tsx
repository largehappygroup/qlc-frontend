import { Flex, Text, Badge, Button, Card } from "@mantine/core";
import FeedbackSliders from "./FeedbackSliders";

interface FeedbackCardProps {
    chapterId?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ chapterId }) => {
    return (
        <Card bg="cyan" c="white">
            <Flex
                gap="md"
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align="center"
            >
                <Text size="xl" fw="bold">
                    Please Provide Feedback
                </Text>
                <Flex direction="column" gap="md" justify="space-between" align="end">
                    <Badge variant="default" size="md">
                        Not Started
                    </Badge>
                    <FeedbackSliders chapterId={chapterId}>
                        <Button
                            radius="xl"
                            size="sm"
                            variant="white"
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
