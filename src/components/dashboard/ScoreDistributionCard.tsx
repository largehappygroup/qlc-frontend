import { BarChart } from "@mantine/charts";
import { Card, Space, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

const ScoreDistributionCard: React.FC = () => {
    const [averageScoreDistribution, setAverageScoreDistribution] = useState(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/distribution`
            );
            setAverageScoreDistribution(response.data);
        };
        fetchData();
    }, []);
    return (
        <>
            {averageScoreDistribution && (
                <Card withBorder>
                    <Title order={1} size="sm" c="dimmed">
                        Average Score Distribution
                    </Title>
                    <Space h="md" />
                    <BarChart
                        h={300}
                        data={averageScoreDistribution}
                        xAxisLabel="Average Score as a Percentage"
                        yAxisLabel="Number of Students"
                        dataKey="percentage"
                        series={[
                            {
                                name: "students",
                            },
                        ]}
                        tickLine="y"
                    />
                </Card>
            )}
        </>
    );
};

export default ScoreDistributionCard;
