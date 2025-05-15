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
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

interface Response {
    userName: string;
    assignment: {
        identifier: string;
        title: string;
    };
    completedTimestamp: string;
    score: string;
}

interface RecentActivityCardProps {
    userId?: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
    userId,
}: RecentActivityCardProps) => {
    const [activities, setActivities] = useState<Response[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        setIsLoading(true);
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/exercises/recent-activity${
                userId ? "?userId=" + userId : ""
            }`
        );
        setActivities(response.data);
        setIsLoading(false);
    };
    return (
        <Card withBorder shadow="sm">
            <Flex justify="space-between" align="center">
                <Title c="dimmed" size="sm" order={1}>
                    Recent Activity
                </Title>
                <ActionIcon onClick={fetchData} variant="default" c="gray">
                    <IconRefresh size={20} stroke={2} />
                </ActionIcon>
            </Flex>
            <Space h="md" />
            {isLoading ? (
                "Loading..."
            ) : (
                <ScrollArea mah={400}>
                    <Flex direction="column" gap="xs">
                        {activities.map((activity, index) => (
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
