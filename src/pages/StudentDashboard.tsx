import { useState } from "react";
import {
    Button,
    Container,
    Flex,
    Title,
    Text,
    Divider,
    Grid,
    ScrollArea,
} from "@mantine/core";
import {
    IconCaretLeft,
    IconCaretLeftFilled,
    IconCaretRightFilled,
} from "@tabler/icons-react";
import Layout from "../components/Layout";
import { DatePicker } from "@mantine/dates";
import { useAuth } from "../hooks/AuthContext";
import ProgressCard from "../components/dashboard/ProgressCard";
import UpcomingCard from "../components/dashboard/UpcomingCard";
import ScoreDistributionCard from "../components/dashboard/ScoreDistributionCard";

const StudentDashboard: React.FC = () => {
    const [viewMonth, setViewMonth] = useState("");
    const { user } = useAuth();

    return (
        <Layout title="Dashboard">
            <Grid gutter="md">
                <Grid.Col>
                    <Title order={3}>Hello, {user?.firstName}!</Title>
                </Grid.Col>
                <Grid.Col>
                    <ScoreDistributionCard userId={user?._id} />
                </Grid.Col>

                <Grid.Col>
                    <UpcomingCard />
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default StudentDashboard;
