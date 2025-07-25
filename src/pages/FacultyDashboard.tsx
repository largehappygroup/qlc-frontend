import {

    Grid,

} from "@mantine/core";
import Layout from "../components/Layout";

import TotalStudentsCard from "../components/dashboard/TotalStudentsCard";
import ScoreDistributionCard from "../components/dashboard/ScoreDistributionCard";
import AverageScoreCard from "../components/dashboard/AverageScoreCard";
import AverageTimeSpentCard from "../components/dashboard/AverageTimeSpentCard";
import RecentActivityCard from "../components/dashboard/RecentActivityCard";

const FacultyDashboard: React.FC = () => {

    return (
        <Layout title="Dashboard">
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <TotalStudentsCard />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <AverageScoreCard />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <AverageTimeSpentCard />
                </Grid.Col>

                <Grid.Col>
                    <ScoreDistributionCard />
                </Grid.Col>

                <Grid.Col>
                    <RecentActivityCard />
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default FacultyDashboard;
