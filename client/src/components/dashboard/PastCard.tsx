import {
    Badge,
    Card,
    Flex,
    Title,
    Text,
    Button,
    Space,
    Divider,
    Table,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import Summary from "../Summary";

const PastCard: React.FC = () => {
    const fakeExerciseData = [
        { date: new Date(2025, 1, 9), topics: ["Variables", "Data Types"] },
        { date: new Date(2025, 1, 8), topics: ["Integers", "Floats"] },
        { date: new Date(2025, 1, 7), topics: ["Methods"] },
        { date: new Date(2025, 1, 6), topics: ["Classes", "OOP"] },
        { date: new Date(2025, 1, 5), topics: ["Formatting", "JavaDoc"] },
    ];

    const rows = fakeExerciseData.map((exercise) => (
        <Table.Tr key={exercise.date.toLocaleDateString()}>
            <Table.Td>
                <Badge>{exercise.date.toLocaleDateString()}</Badge>
            </Table.Td>
            <Table.Td>{exercise.topics.join(", ")}</Table.Td>
            <Table.Td ta="end">
                <Summary questions={["", "", "", "", ""]}>
                    <Button radius="xl" size="compact-sm">View</Button>
                </Summary>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between">
                <Text>02/2025 Exercises</Text>
                <Flex gap="md">
                    <Button
                        size="compact-sm"
                        variant="subtle"
                        leftSection={
                            <IconCaretLeftFilled size={16} stroke={1.5} />
                        }
                    >
                        01/2025
                    </Button>
                    <Button
                        size="compact-sm"
                        variant="subtle"
                        rightSection={
                            <IconCaretRightFilled size={16} stroke={1.5} />
                        }
                    >
                        03/2025
                    </Button>
                </Flex>
            </Flex>
            <Space h="md" />
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Topic(s)</Table.Th>
                        <Table.Th ta="end">Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Card>
    );
};

export default PastCard;
