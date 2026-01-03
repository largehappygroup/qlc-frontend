import { Card, Flex, Title, Text, ThemeIcon } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useTotalStudents } from "../../hooks/users";

const TotalStudentsCard: React.FC = () => {
    const { data: totalStudents } = useTotalStudents();
    return (
        <Card withBorder shadow="sm">
            <Flex direction="column" gap="sm">
                <Flex justify="space-between" align="center">
                    <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                        Students
                    </Title>
                    <ThemeIcon c="dimmed" variant="transparent">
                        <IconUsers stroke={2} size={16} />
                    </ThemeIcon>
                </Flex>
                <Flex direction="column">
                    <Title order={2} c="cyan">
                        {totalStudents}
                    </Title>
                    <Text size="sm" c="dimmed">
                        Enrolled
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default TotalStudentsCard;
