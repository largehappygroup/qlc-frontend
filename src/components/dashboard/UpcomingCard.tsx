import { Card, Flex,  Title } from "@mantine/core";
import ChapterDetailsList from "../exercises/ChapterDetailsList";

const UpcomingCard: React.FC = () => {
    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between" gap="sm">
                <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                    Exercises To Do
                </Title>
            </Flex>
            <ChapterDetailsList />
        </Card>
    );
};

export default UpcomingCard;
