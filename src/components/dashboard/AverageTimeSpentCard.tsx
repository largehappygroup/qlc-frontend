import { Card, Flex, Title, Text, ThemeIcon } from "@mantine/core";
import { WithUserId } from "../../types/User";
import { IconClock } from "@tabler/icons-react";
import { useAverageTimeSpent } from "../../hooks/exercises";

const AverageTimeSpentCard: React.FC<WithUserId> = ({ userId }) => {
    
    const {data: timeSpent} = useAverageTimeSpent(userId);

    return (
        <Card withBorder shadow="sm">
            <Flex direction="column" gap="sm">
                <Flex justify="space-between" align="center">
                    <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                        Average Time Spent
                    </Title>
                    <ThemeIcon c="dimmed" variant="transparent">
                        <IconClock stroke={1.5} size={16} />
                    </ThemeIcon>
                </Flex>
                <Flex direction="column">
                    <Title order={2} c="cyan">{timeSpent}</Title>
                    <Text size="sm" c="dimmed">
                        Per Exercise
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default AverageTimeSpentCard;
