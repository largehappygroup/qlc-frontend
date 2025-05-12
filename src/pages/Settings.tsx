import {
    Avatar,
    Button,
    Divider,
    Flex,
    Grid,
    Switch,
    Tabs,
    Text,
    useMantineColorScheme,
} from "@mantine/core";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthContext";
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";

const Settings: React.FC = () => {
    const { user } = useAuth();
    const { setColorScheme } = useMantineColorScheme();

    return (
        <Layout title="Settings">
            <Tabs defaultValue="profile">
                <Tabs.List>
                    <Tabs.Tab value="profile">Profile</Tabs.Tab>
                    <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
                    <Tabs.Tab value="theme">Theme</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="profile">
                    <Grid py="lg">
                        <Grid.Col>
                            <Flex
                                gap="lg"
                                align="center"
                                direction={{ base: "column", md: "row" }}
                            >
                                <Avatar
                                    size="xl"
                                    key={`${user?.firstName} ${user?.lastName}`}
                                    name={`${user?.firstName} ${user?.lastName}`}
                                    color="initials"
                                />
                                <Flex
                                    ta={{ base: "center", md: "left" }}
                                    direction="column"
                                >
                                    <Text
                                        fw={700}
                                        size="xl"
                                    >{`${user?.firstName} ${user?.lastName}`}</Text>
                                    <Text>{user?.email}</Text>
                                </Flex>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>
                <Tabs.Panel value="notifications">
                    <Grid py="lg" gutter="md">
                        <Grid.Col span={4}>
                            Email Notifications
                            <Text>
                                Get email notifications when you are offline.
                                You can turn these off.
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Flex direction="column" gap="xs">
                                <Switch
                                    defaultChecked
                                    description="Receive emails when exercises are due"
                                    label="Exercise Due Dates"
                                />
                                <Switch
                                    defaultChecked
                                    description="Receive emails when exercises become available"
                                    label="Exercise Start Dates"
                                />
                            </Flex>
                        </Grid.Col>
                        <Grid.Col>
                            <Divider />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            Desktop Notifications
                            <Text>
                                Get desktop notifications when you are offline.
                                You can turn these off.
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Flex direction="column" gap="xs">
                                <Switch
                                    defaultChecked
                                    description="Receive emails when exercises are due"
                                    label="Exercise Due Dates"
                                />
                                <Switch
                                    defaultChecked
                                    description="Receive emails when exercises become available"
                                    label="Exercise Start Dates"
                                />
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>

                <Tabs.Panel value="theme">
                    <Flex justify="space-between" gap="sm">
                        <Button
                            leftSection={<IconSun size={20} stroke={2} />}
                            flex="1"
                            variant="default"
                            onClick={() => setColorScheme("light")}
                        >
                            Light
                        </Button>
                        <Button
                            leftSection={<IconMoon size={20} stroke={2} />}
                            flex="1"
                            variant="default"
                            onClick={() => setColorScheme("dark")}
                        >
                            Dark
                        </Button>
                        <Button
                            leftSection={<IconSunMoon size={20} stroke={2} />}
                            flex="1"
                            variant="default"
                            onClick={() => setColorScheme("auto")}
                        >
                            System
                        </Button>
                    </Flex>
                </Tabs.Panel>
            </Tabs>
        </Layout>
    );
};

export default Settings;
