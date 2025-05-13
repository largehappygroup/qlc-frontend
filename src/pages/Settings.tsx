import {
    Avatar,
    Button,
    Divider,
    Flex,
    Grid,
    Space,
    Switch,
    Tabs,
    Text,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthContext";
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";

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
                    <Profile />
                </Tabs.Panel>
                <Tabs.Panel value="notifications">
                    <Notifications />
                </Tabs.Panel>

                <Tabs.Panel value="theme">
                    <Title order={1} size="md">Mode</Title>
                    <Space h="md" />
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
