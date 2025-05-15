import { Grid } from "@mantine/core";
import Layout from "../components/Layout";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";
import AverageScoreCard from "../components/dashboard/AverageScoreCard";
import AverageTimeSpentCard from "../components/dashboard/AverageTimeSpentCard";
import { useAuth } from "../hooks/AuthContext";

const StudentProgress: React.FC = () => {
    const { user } = useAuth();
    return (
        <Layout title="Progress">
            <Grid>
                <Grid.Col span={6}>
                    <AverageScoreCard userId={user?._id} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <AverageTimeSpentCard userId={user?._id} />
                </Grid.Col>
                <Grid.Col>
                    <RecentActivityCard userId={user?._id} />
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default StudentProgress;
