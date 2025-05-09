import { Avatar, Flex, Grid, Tabs, Text } from "@mantine/core";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthContext";

const Settings: React.FC = () => {
    const {user} = useAuth();

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
                <Tabs.Panel value="notifications">Profile</Tabs.Panel>

                <Tabs.Panel value="theme">Profile</Tabs.Panel>
            </Tabs>
        </Layout>
    );
};

export default Settings;
