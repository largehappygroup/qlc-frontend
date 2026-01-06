import { BarChart } from "@mantine/charts";
import { Card, Title, Text, Flex, Loader } from "@mantine/core";
import { WithUserId } from "../../types/User";
import { useScoreDistribution } from "../../hooks/exercises";

const ScoreDistributionCard: React.FC<WithUserId> = ({ userId }) => {
    const { data: averageScoreDistribution, isLoading } =
        useScoreDistribution(userId);

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
                        <Loader type="oval" size="lg" />
                    ) : (
                        <Text>No score distribution found.</Text>
                    )}
                </Flex>
            </Card>
        </>
    );
};

export default ScoreDistributionCard;
