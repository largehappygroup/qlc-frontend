import { Card, Flex, Text } from "@mantine/core";
import ChapterDetailsList from "../exercises/ChapterDetailsList";

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
            <ChapterDetailsList date={new Date()} />
        </Card>
    );
};

export default UpcomingCard;
