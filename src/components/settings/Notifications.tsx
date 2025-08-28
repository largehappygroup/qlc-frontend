import { Divider, Flex, Grid, Space, Switch, Title, Text } from "@mantine/core";

const Notifications = () => {
    const desktopPermission = () => {
        
        console.log(Notification.permission == "granted");
    };
    return (
        <Grid py="lg" gutter="xl">
            <Grid.Col span={6}>
                <Title order={1} size="lg">
                    Email Notifications
                </Title>
                <Space h="xs" />
                <Text size="sm" c="dimmed">
                    Get email notifications when you are offline. You can turn
                    these off.
                </Text>
            </Grid.Col>
            <Grid.Col span={6}>
                <Flex direction="column" gap="xs">
                    <Switch
                        size="md"
                        defaultChecked
                        description="Receive emails when exercises are due"
                        label="Exercise Due Dates"
                    />
                    <Switch
                        size="md"
                        defaultChecked
                        description="Receive emails when exercises become available"
                        label="Exercise Start Dates"
                    />
                </Flex>
            </Grid.Col>
            <Grid.Col>
                <Divider />
            </Grid.Col>
            <Grid.Col span={6}>
                <Title order={1} size="lg">
                    Desktop Notifications
                </Title>
                <Space h="xs" />
                <Text c="dimmed" size="sm">
                    Get desktop notifications when you are offline. You can turn
                    these off.
                </Text>
            </Grid.Col>
            <Grid.Col span={6}>
                <Flex direction="column" gap="xs">
                    <Switch
                        size="md"
                        onClick={desktopPermission}
                        checked={Notification.permission == "granted"}
                        description="Receive emails when exercises are due"
                        label="Exercise Due Dates"
                    />
                    <Switch
                        size="md"
                        checked={Notification.permission == "granted"}
                        onClick={desktopPermission}
                        description="Receive emails when exercises become available"
                        label="Exercise Start Dates"
                    />
                </Flex>
            </Grid.Col>
        </Grid>
    );
};

export default Notifications;
