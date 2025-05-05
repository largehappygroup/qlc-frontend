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
import TimeCard from "../components/dashboard/TimeCard";
import UpcomingCard from "../components/dashboard/UpcomingCard";

const StudentDashboard: React.FC = () => {
    const [viewMonth, setViewMonth] = useState("");
    const { user } = useAuth();

    return (
        <>
            <Layout>
                <Grid gutter="md">
                    <Grid.Col>
                        <Title order={3}>Hello, {user?.firstName}!</Title>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <ProgressCard />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TimeCard />
                    </Grid.Col>
                    <Grid.Col>
                        <UpcomingCard />
                    </Grid.Col>
                </Grid>
            </Layout>
        </>
    );
};

export default StudentDashboard;
