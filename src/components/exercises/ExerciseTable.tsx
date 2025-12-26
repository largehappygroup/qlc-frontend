import {
    ActionIcon,
    Text,
    Flex,
    Table,
    List,
    Button,
    ScrollArea,
    Code,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { WithAssignmentId } from "../../types/Assignment";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { IconArrowLeft, IconArrowRight, IconReload } from "@tabler/icons-react";

const ExerciseTable: React.FC<WithAssignmentId> = ({ assignmentId }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [exercisesIndex, setExercisesIndex] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Exercise[]>(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/exercises?assignmentId=${assignmentId}`
                );
                setExercises(response.data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchData();
    }, [assignmentId]);

    if (!exercises || exercises.length === 0) {
        return <Text>No exercises found for this assignment.</Text>;
    }
    const rows =
        exercises[exercisesIndex].questions?.map((question, index) => (
            <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{question.query}</Table.Td>
                <Table.Td>
                    <List>
                        {question.availableAnswers.map((answer) => (
                            <List.Item>{answer}</List.Item>
                        ))}
                    </List>
                </Table.Td>
                <Table.Td>{question.explanation}</Table.Td>
                <Table.Td>
                    <List>
                        {question.hints
                            ? question.hints?.map((hint) => (
                                  <List.Item>{hint}</List.Item>
                              ))
                            : "None"}
                    </List>
                </Table.Td>
            </Table.Tr>
        )) || [];

    return (
        <>
            <Flex justify="space-between" align="center" mb="md">
                <Flex gap="md" align="center">
                    <ActionIcon
                        variant="subtle"
                        disabled={exercisesIndex === 0}
                        onClick={() => setExercisesIndex(exercisesIndex - 1)}
                    >
                        <IconArrowLeft />
                    </ActionIcon>
                    <Text>{exercises[exercisesIndex].userId}</Text>
                    <ActionIcon
                        variant="subtle"
                        disabled={exercisesIndex === exercises.length - 1}
                        onClick={() => setExercisesIndex(exercisesIndex + 1)}
                    >
                        <IconArrowRight />
                    </ActionIcon>
                </Flex>
                <Flex justify="end" align="center">
                    <Button leftSection={<IconReload />}>Regenerate</Button>
                </Flex>
            </Flex>
            <ScrollArea h={300}>
                <Code block mb="md">
                    {exercises[exercisesIndex].studentCode}
                </Code>
            </ScrollArea>

            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w="5%">#</Table.Th>
                        <Table.Th w="15%">Query</Table.Th>
                        <Table.Th w="20%">Available Answers</Table.Th>
                        <Table.Th w="40%">Explanation</Table.Th>
                        <Table.Th w="20%">Hints</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
};

export default ExerciseTable;
