import { Tabs } from "@mantine/core";
import Layout from "../components/Layout";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Theme from "../components/settings/Theme";

const Settings: React.FC = () => {
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
                    <Theme />
                </Tabs.Panel>
            </Tabs>
        </Layout>
    );
};

export default Settings;
