import Layout from "../components/Layout";
import Profile from "../components/settings/Profile";
import Theme from "../components/settings/Theme";

const Settings: React.FC = () => {
    return (
        <Layout title="Settings">
            <Profile />
            <Theme />
        </Layout>
    );
};

export default Settings;
