import {
    ActionIcon,
    Button,
    Card,
    Fieldset,
    Flex,
    Select,
    Space,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import React from "react";
import { Assignment, assignmentIdentifiers } from "../../types/Assignment";

interface ChapterAssignmentsProps {
    assignments: Assignment[];
    handleAddAssignment: () => void;
    handleDeleteAssignment: (index: number) => void;
    handleUpdateAssignment: (index: number, field: string, value: any) => void;
}

const ChapterAssignments: React.FC<ChapterAssignmentsProps> = ({
    assignments,
    handleAddAssignment,
    handleDeleteAssignment,
    handleUpdateAssignment,
}: ChapterAssignmentsProps) => {
    return (
        <Card withBorder shadow="sm">
            <Title order={2} pb="xs">
                Assignments
            </Title>
            <Text c="dimmed">Define assignments for this chapter</Text>
            <Space h="md" />
            <Flex direction="column" gap="md">
                {assignments.map((assignment, index) => (
                    <Fieldset key={index} legend={`Assignment ${index + 1}`}>
                        <Flex gap="md" flex="1" align="center">
                            <TextInput
                                flex="1"
                                withAsterisk
                                label="Title"
                                onChange={(e) =>
                                    handleUpdateAssignment(
                                        index,
                                        "title",
                                        e.target.value,
                                    )
                                }
                                value={assignment.title}
                            />
                            <Select
                                withAsterisk
                                flex="1"
                                value={assignment.identifier}
                                label="Identifier"
                                onChange={(val) =>
                                    handleUpdateAssignment(
                                        index,
                                        "identifier",
                                        val,
                                    )
                                }
                                data={assignmentIdentifiers}
                            />

                            <DateInput
                                flex="1"
                                withAsterisk
                                onChange={(e) =>
                                    handleUpdateAssignment(index, "dueDate", e)
                                }
                                label="Exercise Due Date"
                                value={assignment.dueDate}
                            />
                            <ActionIcon
                                color="red"
                                variant="subtle"
                                onClick={() => handleDeleteAssignment(index)}
                            >
                                <IconTrash stroke={1.5} size={20} />
                            </ActionIcon>
                        </Flex>
                    </Fieldset>
                ))}
                <Flex justify="center">
                    <Button
                        variant="default"
                        onClick={handleAddAssignment}
                        leftSection={<IconPlus size={20} stroke={1.5} />}
                    >
                        Add a new assignment
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ChapterAssignments;
