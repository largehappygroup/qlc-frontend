import { Title, Grid, Alert } from "@mantine/core";

import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthContext";
import UpcomingCard from "../components/dashboard/UpcomingCard";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";
import AverageScoreCard from "../components/dashboard/AverageScoreCard";
import AverageTimeSpentCard from "../components/dashboard/AverageTimeSpentCard";
import ScoreDistributionCard from "../components/dashboard/ScoreDistributionCard";

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <Layout title="Dashboard">
            <Grid gutter="md">
                <Grid.Col span={6}>
                    <Grid>
                        <Grid.Col span={12}>
                            <Alert title="AI Usage Notice">
                                This website application uses AI to generate and
                                validate the exercises. This introduces a
                                possibility that the LLM responses are
                                incorrect. Please indicate any incorrect or odd
                                exercises in the requested feedback sections
                                within the website application.
                            </Alert>
                        </Grid.Col>
                        <Grid.Col>
                            <Title order={3}>Hello, {user?.firstName}!</Title>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AverageScoreCard userId={user?.vuNetId} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <AverageTimeSpentCard userId={user?.vuNetId} />
                        </Grid.Col>
                        <Grid.Col>
                            <ScoreDistributionCard userId={user?.vuNetId} />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Grid>
                        <Grid.Col>
                            <UpcomingCard />
                        </Grid.Col>
                        <Grid.Col>
                            <RecentActivityCard userId={user?.vuNetId} />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default StudentDashboard;
