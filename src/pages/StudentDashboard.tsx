import { Title, Grid } from "@mantine/core";

import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthContext";
import UpcomingCard from "../components/dashboard/UpcomingCard";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <Layout title="Dashboard">
            <Grid gutter="md">
                <Grid.Col>
                    <Title order={3}>Hello, {user?.firstName}!</Title>
                </Grid.Col>
                <Grid.Col>
                    <UpcomingCard />
                </Grid.Col>
                <Grid.Col>
                    <RecentActivityCard userId={user?.vuNetId} />
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default StudentDashboard;
