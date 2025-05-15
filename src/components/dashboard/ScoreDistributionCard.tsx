import { BarChart } from "@mantine/charts";
import { Card, Space, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

interface ScoreDistributionCardProps {
    userId?: string;
}

const ScoreDistributionCard: React.FC<ScoreDistributionCardProps> = ({
    userId,
}: ScoreDistributionCardProps) => {
    const [averageScoreDistribution, setAverageScoreDistribution] = useState(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/distribution${
                    userId ? "?userId=" + userId : ""
                }`
            );
            setAverageScoreDistribution(response.data);
        };
        fetchData();
    }, []);
    return (
        <>
            {averageScoreDistribution && (
                <Card shadow="sm" withBorder>
                    <Title order={1} size="sm" c="dimmed">
                        Average Score Distribution
                    </Title>
                    <Space h="md" />
                    <BarChart
                        h={300}
                        data={averageScoreDistribution}
                        xAxisLabel="Average Score as a Percentage"
                        yAxisLabel={
                            userId
                                ? "Number of Exercises"
                                : "Number of Students"
                        }
                        dataKey="percentage"
                        series={[
                            {
                                name: "data",
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
