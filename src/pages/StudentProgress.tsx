import { Grid } from "@mantine/core";
import Layout from "../components/Layout";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";
import AverageScoreCard from "../components/dashboard/AverageScoreCard";
import AverageTimeSpentCard from "../components/dashboard/AverageTimeSpentCard";

const StudentProgress: React.FC = () => {
    return (
        <Layout title="Progress">
            <Grid>
                <Grid.Col span={6}>
                    <AverageScoreCard individualUser />
                </Grid.Col>
                <Grid.Col span={6}>
                    <AverageTimeSpentCard individualUser />
                </Grid.Col>
                <Grid.Col>
                    <RecentActivityCard individualUser />
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default StudentProgress;
