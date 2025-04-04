import { useState } from "react";
import TodayCard from "../components/dashboard/TodayCard";
import PastCard from "../components/dashboard/PastCard";
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
import StreakCard from "../components/dashboard/StreakCard";
import { useAuth } from "../hooks/AuthContext";

const Home: React.FC = () => {
    const [viewMonth, setViewMonth] = useState("");
    const { user } = useAuth();

    return (
        <>
            <Layout>
                <Grid gutter="md">
                    <Grid.Col>
                        <Title order={3}>Hello, {user?.firstName}!</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 8 }}>
                        <TodayCard />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, lg: 4 }}>
                        <StreakCard />
                    </Grid.Col>
                    <Grid.Col>
                        <PastCard user={user} />
                    </Grid.Col>
                </Grid>
                <Divider />
            </Layout>
        </>
    );
};

export default Home;
