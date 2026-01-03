import {
    Card,
    Flex,
    Title,
    ActionIcon,
    ScrollArea,
    Text,
    Space,
    Divider,
    Badge,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { WithUserId } from "../../types/User";
import { useRecentActivity } from "../../hooks/exercises";

const RecentActivityCard: React.FC<WithUserId> = ({ userId }) => {
    const { data: activities, isLoading, refetch } = useRecentActivity(userId);
    return (
        <Card withBorder shadow="sm">
            <Flex justify="space-between" align="center">
                <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                    Recent Activity
                </Title>
                <ActionIcon
                    onClick={() => refetch()}
                    variant="filled"
                    color="cyan"
                >
                    <IconRefresh size={20} stroke={2} />
                </ActionIcon>
            </Flex>
            <Space h="md" />
            {isLoading ? (
                "Loading..."
            ) : (
                <ScrollArea mah={400}>
                    <Flex direction="column" gap="xs">
                        {activities?.length === 0 &&
                            "No recent activity found."}
                        {activities?.map((activity, index) => (
                            <>
                                {index !== 0 && <Divider />}
                                <Flex justify="space-between" align="center">
                                    <Flex gap="md" align="center">
                                        <Badge size="xl">
                                            {activity.score}
                                        </Badge>

                                        <Flex direction="column">
                                            <Title order={2} size="lg">
                                                {`${activity.assignment.identifier}: ${activity.assignment.title}`}
                                            </Title>

                                            <Text c="dimmed" size="sm">
                                                {activity.userName}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Text c="dimmed">
                                        {activity.completedTimestamp}
                                    </Text>
                                </Flex>
                            </>
                        ))}
                    </Flex>
                </ScrollArea>
            )}
        </Card>
    );
};

export default RecentActivityCard;
