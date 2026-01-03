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
import {
    IconArrowLeft,
    IconArrowRight,
    IconCode,
    IconReload,
} from "@tabler/icons-react";
import { useExercises } from "../../hooks/exercises";
import { regenerateExercise } from "../../api/exercises";

const ExerciseTable: React.FC<WithAssignmentId> = ({ assignmentId }) => {
    const [exercisesIndex, setExercisesIndex] = useState<number>(0);
    const [showCode, setShowCode] = useState<boolean>(false);
    const { data: exercises, isLoading } = useExercises(assignmentId);

    useEffect(() => {
        setShowCode(false);
    }, [exercisesIndex]);

    if (!exercises || exercises.length === 0) {
        return <Text>No exercises found for this assignment.</Text>;
    }
    const rows =
        exercises[exercisesIndex].questions?.map((question, index) => (
            <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>
                    <ScrollArea h={100}>
                        <Text size="xs">{question.query}</Text>
                    </ScrollArea>
                </Table.Td>
                <Table.Td>
                    <ScrollArea h={100}>
                        <List size="xs">
                            {question.availableAnswers.map((answer) => (
                                <List.Item>
                                    <Text size="xs">{answer}</Text>
                                </List.Item>
                            ))}
                        </List>
                    </ScrollArea>
                </Table.Td>
                <Table.Td>
                    <ScrollArea h={100}>
                        <Text size="xs">{question.explanation}</Text>
                    </ScrollArea>
                </Table.Td>
                <Table.Td>
                    <ScrollArea h={100}>
                        <List size="xs">
                            {question.hints
                                ? question.hints?.map((hint) => (
                                      <List.Item>
                                          <Text size="xs">{hint}</Text>
                                      </List.Item>
                                  ))
                                : "None"}
                        </List>
                    </ScrollArea>
                </Table.Td>
            </Table.Tr>
        )) || [];

    return (
        <>
            {isLoading ? <Text>Loading...</Text> : null}
            <Flex justify="space-between" align="center" mb="sm">
                <Flex gap="md" align="center">
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        disabled={exercisesIndex === 0}
                        onClick={() => setExercisesIndex(exercisesIndex - 1)}
                    >
                        <IconArrowLeft />
                    </ActionIcon>
                    <Text size="sm">{exercises[exercisesIndex].userId}</Text>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        disabled={exercisesIndex === exercises.length - 1}
                        onClick={() => setExercisesIndex(exercisesIndex + 1)}
                    >
                        <IconArrowRight />
                    </ActionIcon>
                </Flex>

                <Flex justify="end" align="center" gap="md">
                    <ActionIcon
                        size="sm"
                        onClick={() => setShowCode(!showCode)}
                    >
                        <IconCode />
                    </ActionIcon>
                    <Button
                        onClick={() =>
                            regenerateExercise(
                                exercises[exercisesIndex].userId,
                                assignmentId
                            )
                        }
                        size="sm"
                        leftSection={<IconReload />}
                    >
                        Regenerate
                    </Button>
                </Flex>
            </Flex>
            {showCode && (
                <ScrollArea h={300}>
                    <Code block mb="sm">
                        {exercises[exercisesIndex].studentCode}
                    </Code>
                </ScrollArea>
            )}
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w="5%">#</Table.Th>
                        <Table.Th w="15%">Query</Table.Th>
                        <Table.Th w="25%">Available Answers</Table.Th>
                        <Table.Th w="30%">Explanation</Table.Th>
                        <Table.Th w="25%">Hints</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
};

export default ExerciseTable;
