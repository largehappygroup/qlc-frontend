import { Card, Flex, Title, ActionIcon, ScrollArea, Text } from "@mantine/core";
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
}

interface RecentActivityCardProps {
    individualUser?: boolean;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
    individualUser,
}: RecentActivityCardProps) => {
    const [activities, setActivities] = useState<Response[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/recent-activity${
                    individualUser ? "?userId=" + user?._id : ""
                }`
            );
            setActivities(response.data);
        };
        fetchData();
    }, [user, individualUser]);

    return (
        <Card withBorder>
            <Flex justify="space-between">
                <Title order={1}>Recent Activity</Title>
                <ActionIcon variant="default" c="gray">
                    <IconRefresh size={20} stroke={2} />
                </ActionIcon>
            </Flex>
            <ScrollArea mah={400}>
                <Flex direction="column" gap="xs">
                    {activities.map((activity) => (
                        <Flex justify="space-between">
                            <Flex direction="column">
                                <Title order={3}>
                                    {`${activity.assignment.identifier}: ${activity.assignment.title}`}
                                </Title>
                                <Text c="dimmed">{activity.userName}</Text>
                            </Flex>
                            <Text>{activity.completedTimestamp}</Text>
                        </Flex>
                    ))}
                </Flex>
            </ScrollArea>
        </Card>
    );
};

export default RecentActivityCard;
