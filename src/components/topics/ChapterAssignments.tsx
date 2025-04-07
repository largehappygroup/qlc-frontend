import { Card, Flex, Grid, Input, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
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
    const { hovered, ref } = useHover();

    return (
        <>
            <Input.Label>Assignments</Input.Label>
            <Grid h="100%">
                {assignments.map((assignment, index) => (
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <Card h="100%" withBorder>
                            <TextInput
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
                            <Textarea
                                label="Instructions"
                                onChange={(e) =>
                                    handleUpdateAssignment(
                                        index,
                                        "instructions",
                                        e.target.value
                                    )
                                }
                                value={assignment.instructions}
                            />
                            <DateInput
                                onChange={(e) =>
                                    handleUpdateAssignment(
                                        index,
                                        "initialDueDate",
                                        e
                                    )
                                }
                                label="Initial Assignment Due Date"
                                value={assignment.initialDueDate}
                            />
                        </Card>
                    </Grid.Col>
                ))}

                <Grid.Col span={{ base: 12, md: 3 }}>
                    <Card
                        h="100%"
                        shadow={hovered ? "md" : "none"}
                        withBorder
                        ref={ref}
                        onClick={handleAddAssignment}
                    >
                        <Flex flex="1" align="center" justify="center">
                            <IconPlus />
                        </Flex>
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default ChapterAssignments;
