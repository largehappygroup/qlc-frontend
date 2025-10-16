import { BarChart } from "@mantine/charts";
import { Card, Space, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { PropsWithUserId } from "../../hooks/AuthContext";

const ScoreDistributionCard: React.FC<PropsWithUserId> = ({
    userId,
}: PropsWithUserId) => {
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
            {averageScoreDistribution && averageScoreDistribution.length > 0 && (
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
                        yAxisProps={{allowDecimals: false}}
                        barProps={{barSize: 50}}
                        withBarValueLabel
                        dataKey="percentage"
                        series={[
                            {
                                name: "data",
                            },
                        ]}
                        tickLine="y"
                        gridAxis="none"
                        withTooltip={false}
                    />
                </Card>
            )}
        </>
    );
};

export default ScoreDistributionCard;
