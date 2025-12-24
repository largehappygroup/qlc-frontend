import { ActionIcon, Text, Flex, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { WithAssignmentId } from "../../types/Assignment";
import axios from "axios";
import { Exercise } from "../../types/Exercise";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

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
                <Table.Td>{question.availableAnswers}</Table.Td>
                <Table.Td>{question.explanation}</Table.Td>
                <Table.Td>{question.hints}</Table.Td>
            </Table.Tr>
        )) || [];

    return (
        <>
            <Flex justify="space-between" align="center" mb="md">
                <Flex gap="md" align="center">
                    <ActionIcon
                        disabled={exercisesIndex === 0}
                        onClick={() => setExercisesIndex(exercisesIndex - 1)}
                    >
                        <IconArrowLeft />
                    </ActionIcon>
                    <Text>{exercises[exercisesIndex].userId}</Text>
                    <ActionIcon
                        disabled={exercisesIndex === exercises.length - 1}
                        onClick={() => setExercisesIndex(exercisesIndex + 1)}
                    >
                        <IconArrowRight />
                    </ActionIcon>
                </Flex>
            </Flex>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Question #</Table.Th>
                        <Table.Th>Query</Table.Th>
                        <Table.Th>Available Answers</Table.Th>
                        <Table.Th>Explanation</Table.Th>
                        <Table.Th>Hints</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
};

export default ExerciseTable;
