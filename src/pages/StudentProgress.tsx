import { Grid } from "@mantine/core";
import Layout from "../components/Layout";
import AverageScoreCard from "../components/dashboard/AverageScoreCard";
import AverageTimeSpentCard from "../components/dashboard/AverageTimeSpentCard";
import { useAuth } from "../hooks/AuthContext";
import ScoreDistributionCard from "../components/dashboard/ScoreDistributionCard";

const StudentProgress: React.FC = () => {
    const { user } = useAuth();
    return (
        <Layout title="Progress">
            <Grid>
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
        </Layout>
    );
};

export default StudentProgress;
