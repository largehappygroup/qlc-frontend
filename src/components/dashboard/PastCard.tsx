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
import { useAuth, User } from "../../hooks/AuthContext";

interface PastCardProps {
    user: User | null;
}

const PastCard: React.FC<PastCardProps> = ({ user }: PastCardProps) => {
    const [currentMonth, setCurrentMonth] = useState<Date | null>(new Date());
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [opened, setOpened] = useState(false);

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

    const handleMonthChange = (e: Date | null) => {
        setOpened(false);
        setCurrentMonth(e);
    };

    const rows = exercises.map((exercise) => (
        <Table.Tr key={new Date(exercise.date).toLocaleDateString()}>
            <Table.Td>
                <Badge>{new Date(exercise.date).toLocaleDateString()}</Badge>
            </Table.Td>
            <Table.Td>{exercise.topics.join(", ")}</Table.Td>
            <Table.Td ta="end">
                <Summary
                    date={new Date(exercise.date)}
                    questions={["", "", "", "", ""]}
                >
                    <ActionIcon variant="subtle" color="gray">
                        <IconEye size={16} stroke={1.5} />
                    </ActionIcon>
                </Summary>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card shadow="sm" withBorder>
            <Flex justify="space-between">
                <Text>{`${currentMonth?.toLocaleString("default", {
                    month: "long",
                })} ${currentMonth?.getFullYear()} Exercises`}</Text>
                <Popover opened={opened} onChange={setOpened}>
                    <Popover.Target>
                        <Button
                            onClick={() => setOpened((e) => !e)}
                        >{`${currentMonth?.toLocaleString("default", {
                            month: "long",
                        })} ${currentMonth?.getFullYear()}`}</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <MonthPicker
                            value={currentMonth}
                            onChange={handleMonthChange}
                            minDate={new Date(2024, 7, 1)}
                            maxDate={new Date()}
                        >
                            <Button>Month</Button>
                        </MonthPicker>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
            <Space h="md" />
            {rows.length === 0 ? (
                `No exercises found for ${currentMonth?.toLocaleString(
                    "default",
                    { month: "long" }
                )} ${currentMonth?.getFullYear()}.`
            ) : (
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
            )}
        </Card>
    );
};

export default PastCard;
