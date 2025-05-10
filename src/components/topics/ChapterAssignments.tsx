import {
    ActionIcon,
    Button,
    Card,
    Fieldset,
    Flex,
    Grid,
    Space,
    Text,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import React from "react";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { useHover } from "@mantine/hooks";

interface ChapterAssignmentsProps {
    assignments: ChapterAssignment[];
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
        <Card withBorder>
            <Title order={2} pb="xs">
                Assignments
            </Title>
            <Text c="dimmed">Define assignments for this chapter</Text>
            <Space h="md" />
            <Flex direction="column" gap="md">
                {assignments.map((assignment, index) => (
                    <Fieldset key={index} legend={`Assignment ${index + 1}`}>
                        <Flex gap="md" flex="1" align="end">
                            <TextInput
                                flex="1"
                                withAsterisk
                                label="Title"
                                onChange={(e) =>
                                    handleUpdateAssignment(
                                        index,
                                        "title",
                                        e.target.value
                                    )
                                }
                                value={assignment.title}
                            />
                            <TextInput
                                withAsterisk
                                flex="1"
                                label="Identifier"
                                onChange={(e) =>
                                    handleUpdateAssignment(
                                        index,
                                        "identifier",
                                        e.target.value
                                    )
                                }
                                value={assignment.identifier}
                            />
                            <ActionIcon
                                color="red"
                                variant="subtle"
                                onClick={() => handleDeleteAssignment(index)}
                            >
                                <IconTrash stroke={1.5} size={20} />
                            </ActionIcon>
                        </Flex>

                        <Textarea
                            withAsterisk
                            label="Instructions"
                            onChange={(e) =>
                                handleUpdateAssignment(
                                    index,
                                    "instructions",
                                    e.target.value
                                )
                            }
                            rows={6}
                            value={assignment.instructions}
                        />
                        <Flex gap="md" flex="1">
                            <DateInput
                                withAsterisk
                                flex="1"
                                onChange={(e) =>
                                    handleUpdateAssignment(
                                        index,
                                        "startDate",
                                        e
                                    )
                                }
                                label="Exercise Start Date"
                                value={assignment.startDate}
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
