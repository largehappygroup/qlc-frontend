import {
    Card,
    Flex,
    Title,
    Text,
    ThemeIcon,
    Loader,
} from "@mantine/core";
import { WithUserId } from "../../types/User";
import { IconStars } from "@tabler/icons-react";
import { useAverageScore } from "../../hooks/exercises";

const AverageScoreCard: React.FC<WithUserId> = ({ userId }) => {
    const { data: average, isLoading } = useAverageScore(userId);

    return (
        <Card withBorder shadow="sm">
            <Flex direction="column" gap="sm">
                <Flex justify="space-between" align="center">
                    <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                        Average Score
                    </Title>
                    <ThemeIcon c="dimmed" variant="transparent">
                        <IconStars stroke={1.5} size={16} />
                    </ThemeIcon>
                </Flex>
                <Flex direction="column">
                    {isLoading ? (
                        <Loader type="dots" />
                    ) : (
                        <Title order={2} c="cyan">
                            {average}%
                        </Title>
                    )}

                    <Text size="sm" c="dimmed">
                        Per Exercise
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default AverageScoreCard;
