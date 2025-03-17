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
    ActionIcon,
    Popover,
} from "@mantine/core";
import { MonthPicker, MonthPickerInput } from "@mantine/dates";
import {
    IconCaretLeftFilled,
    IconCaretRightFilled,
    IconEye,
} from "@tabler/icons-react";
import Summary from "../Summary";
import { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { useAuth } from "../../hooks/AuthContext";

const PastCard: React.FC = () => {
    const { user } = useAuth();
    const [currentMonth, setCurrentMonth] = useState<Date | null>(new Date());
    const [exercises, setExercises] = useState<Exercise[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Exercise[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/exercises?userId=${
                        user?._id
                    }&month=${currentMonth?.getMonth()}&year=${currentMonth?.getFullYear()}`
                );
                setExercises(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (user) {
            fetchData();
        }
    }, [currentMonth, user]);

    const rows = exercises.map((exercise) => (
        <Table.Tr key={new Date(exercise.date).toLocaleDateString()}>
            <Table.Td>
                <Badge>{new Date(exercise.date).toLocaleDateString()}</Badge>
            </Table.Td>
            <Table.Td>{exercise.topics.join(", ")}</Table.Td>
            <Table.Td ta="end">
                <Summary questions={["", "", "", "", ""]}>
                    <ActionIcon size="lg">
                        <IconEye />
                    </ActionIcon>
                </Summary>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between">
                <Text>{`${
                    (currentMonth?.getMonth() || new Date().getMonth()) + 1
                }/${currentMonth?.getFullYear()} Exercises`}</Text>
                <Popover>
                    <Popover.Target>
                        <Button>{`${
                            (currentMonth?.getMonth() ||
                                new Date().getMonth()) + 1
                        }/${currentMonth?.getFullYear()}`}</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <MonthPicker
                            value={currentMonth}
                            onChange={setCurrentMonth}
                        >
                            <Button>Month</Button>
                        </MonthPicker>
                        <Flex justify="end" gap="xs">
                            <Button size="compact-xs" variant="outline">
                                Cancel
                            </Button>
                            <Button size="compact-xs">Ok</Button>
                        </Flex>
                    </Popover.Dropdown>
                </Popover>
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
                <Table.Tbody>
                    {rows.length === 0
                        ? `No exercises found for ${
                              (currentMonth?.getMonth() ||
                                  new Date().getMonth()) + 1
                          }/${currentMonth?.getFullYear()}.`
                        : rows}
                </Table.Tbody>
            </Table>
        </Card>
    );
};

export default PastCard;
