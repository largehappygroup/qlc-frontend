import { Card, Flex, Text } from "@mantine/core";
import ChapterExercises from "../exercises/ChapterExercises";

interface UpcomingCardProps {
    status?: string;
    topics?: string[];
}

const UpcomingCard: React.FC<UpcomingCardProps> = ({}: UpcomingCardProps) => {
    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Text size="xs" c="dimmed" fw="bold" tt="uppercase">
                    To Do This Week
                </Text>
            </Flex>
            <ChapterExercises date={new Date()} />
        </Card>
    );
};

export default UpcomingCard;
