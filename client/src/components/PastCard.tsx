import { Badge, Card, Flex, Title, Text, Button } from "@mantine/core";

const PastCard: React.FC = () => {
    return (
        <Card shadow="sm" withBorder>
            <Flex direction="column" gap="xs">
                <Badge>{new Date().toLocaleDateString()}</Badge>

                <Flex align="end" gap="lg" justify="space-between">
                    <Text>Topic(s): Arithmetic, Strings</Text>

                    <Button size="compact-sm">Start</Button>
                </Flex>
            </Flex>
        </Card>
    );
};

export default PastCard;
