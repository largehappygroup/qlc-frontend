import { Card, Flex,  Title } from "@mantine/core";
import ChapterDetailsList from "../exercises/ChapterDetailsList";

interface UpcomingCardProps {
    status?: string;
    topics?: string[];
}

const UpcomingCard: React.FC<UpcomingCardProps> = ({}: UpcomingCardProps) => {
    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                    To Do This Week
                </Title>
            </Flex>
            <ChapterDetailsList date={new Date()} />
        </Card>
    );
};

export default UpcomingCard;
