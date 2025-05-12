import {
    ActionIcon,
    Card,
    Flex,
    Grid,
    ScrollArea,
    Space,
    Text,
    Title,
} from "@mantine/core";
import Layout from "../components/Layout";
import { BarChart } from "@mantine/charts";
import { IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import TotalStudentsCard from "../components/dashboard/TotalStudentsCard";
import ScoreDistributionCard from "../components/dashboard/ScoreDistributionCard";

const FacultyDashboard: React.FC = () => {
    return (
        <Layout title="Dashboard">
            <Grid>
                <Grid.Col span={6}>
                    <TotalStudentsCard />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card withBorder>
                        <Flex direction="column" align="center">
                            <Title order={2}>88%</Title>
                            <Text c="dimmed">Average</Text>
                        </Flex>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card withBorder>
                        <Flex direction="column" align="center">
                            <Title order={2}>42</Title>
                            <Text c="dimmed">Total Students</Text>
                        </Flex>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card withBorder>
                        <Flex direction="column" align="center">
                            <Title order={2}>88%</Title>
                            <Text c="dimmed">Average</Text>
                        </Flex>
                    </Card>
                </Grid.Col>

                <Grid.Col>
                    <ScoreDistributionCard />
                </Grid.Col>

                <Grid.Col>
                    <Card withBorder>
                        <Flex justify="space-between">
                            <Title order={1}>Recent Activity</Title>
                            <ActionIcon variant="default" c="gray">
                                <IconRefresh size={20} stroke={2} />
                            </ActionIcon>
                        </Flex>
                        <ScrollArea h={400}>
                            <Flex justify="space-between">
                                <Flex direction="column">
                                    <Title order={3}>PA03-A: sfdsdfadsf</Title>
                                    <Text c="dimmed">John Doe</Text>
                                </Flex>
                            </Flex>
                        </ScrollArea>
                    </Card>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default FacultyDashboard;
