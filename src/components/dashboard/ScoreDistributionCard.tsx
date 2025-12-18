import { BarChart } from "@mantine/charts";
import { Card, Title, Text, Flex } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { WithUserId } from "../../types/User";

const ScoreDistributionCard: React.FC<WithUserId> = ({ userId }) => {
    const [averageScoreDistribution, setAverageScoreDistribution] = useState(
        []
    );

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/exercises/distribution${
                        userId ? "?userId=" + userId : ""
                    }`
                );
                setAverageScoreDistribution(response.data);
            } catch (error) {
                console.error("Error fetching score distribution:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Card shadow="sm" withBorder>
                <Flex direction="column" justify="space-between" gap="sm">
                    <Title c="dimmed" size="xs" tt="uppercase" order={1}>
                        Average Score Distribution
                    </Title>
                    {averageScoreDistribution &&
                    averageScoreDistribution.length > 0 ? (
                        <>
                            <BarChart
                                h={300}
                                data={averageScoreDistribution}
                                xAxisLabel="Average Score as a Percentage"
                                yAxisLabel={
                                    userId
                                        ? "Number of Exercises"
                                        : "Number of Students"
                                }
                                yAxisProps={{ allowDecimals: false }}
                                barProps={{ barSize: 50 }}
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
                        </>
                    ) : isLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <Text>No score distribution found.</Text>
                    )}
                </Flex>
            </Card>
        </>
    );
};

export default ScoreDistributionCard;
