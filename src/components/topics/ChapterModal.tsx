import {
    ActionIcon,
    Flex,
    TextInput,
    Modal,
    Textarea,
    Tooltip,
    Button,
    Box,
    List,
    Input,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Chapter, NewChapter } from "../../types/Chapter";
import { useForm } from "@mantine/form";
import axios from "axios";
import ChapterAssignments from "./ChapterAssignments";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { useEffect, useState } from "react";
interface ChapterModalProps {
    chapter?: Chapter;
    target: React.ReactNode;
    onUpdate: () => void;
}

const ChapterModal: React.FC<ChapterModalProps> = ({
    chapter,
    target,
    onUpdate,
}: ChapterModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [chapterAssignments, setChapterAssignments] = useState<
        ChapterAssignment[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let assignmentDetails: ChapterAssignment[] = [];
                for (const assignmentId of chapter?.assignments || []) {
                    const response = await axios.get<ChapterAssignment>(
                        `${
                            import.meta.env.VITE_BACKEND_URL
                        }/chapter-assignments/${assignmentId}`
                    );
                    assignmentDetails = [
                        ...assignmentDetails,
                        {
                            ...response.data,
                            initialDueDate: new Date(
                                response.data.initialDueDate
                            ),
                        },
                    ];
                }

                setChapterAssignments(assignmentDetails);
            } catch (err) {
                console.error(err);
            }
        };
        if (chapter) {
            fetchData();
        }
    }, [chapter]);

    const form = useForm({
        initialValues: chapter
            ? chapter
            : {
                  learningObjectives: [],
                  title: "",
                  assignments: [] as string[],
              },
    });

    const hideModal = () => {
        if (!chapter) {
            form.reset();
        }
        close();
    };

    const showModal = () => {
        open();
    };

    const handleAddAssignment = () => {
        setChapterAssignments([
            ...(chapterAssignments || []),
            {
                title: "",
                identifier: "",
                instructions: "",
                initialDueDate: new Date(),
            },
        ]);
    };

    const handleDeleteAssignment = (index: number) => {
        const updatedAssignments = chapterAssignments?.filter(
            (_, i) => i !== index
        );
        setChapterAssignments(updatedAssignments);
    };

    const handleUpdateAssignment = (
        index: number,
        field: string,
        value: any
    ) => {
        const updatedAssignments = chapterAssignments?.map((obj, i) =>
            i === index ? { ...obj, [field]: value } : obj
        );
        setChapterAssignments(updatedAssignments);
    };

    const handleAddObjective = () => {
        form.setFieldValue("learningObjectives", [
            ...form.values.learningObjectives,
            "",
        ]); // Add empty string as a new objective
    };

    // Handle deleting an objective
    const handleDeleteObjective = (index: number) => {
        const updatedObjectives = form.values.learningObjectives.filter(
            (_, i) => i !== index
        );
        form.setFieldValue("learningObjectives", updatedObjectives);
    };

    // Handle updating an objective
    const handleUpdateObjective = (index: number, value: string) => {
        const updatedObjectives = form.values.learningObjectives.map((obj, i) =>
            i === index ? value : obj
        );
        form.setFieldValue("learningObjectives", updatedObjectives);
    };

    const handleSubmit = async (values: NewChapter) => {
        try {
            const newAssignments = chapterAssignments.filter(
                (assignment) => !assignment._id
            );
            if (chapter) {
                const assignmentsToUpdate = chapterAssignments.filter(
                    (assignment) => assignment._id
                );

                const allAssignments = [
                    ...(await Promise.all(
                        newAssignments.map(async (assignment) => {
                            const { data } =
                                await axios.post<ChapterAssignment>(
                                    `${
                                        import.meta.env.VITE_BACKEND_URL
                                    }/chapter-assignments`,
                                    { ...assignment, chapter: chapter?._id }
                                );
                            return data;
                        })
                    )),
                    ...(await Promise.all(
                        assignmentsToUpdate.map(async (assignment) => {
                            const { data } = await axios.put<ChapterAssignment>(
                                `${
                                    import.meta.env.VITE_BACKEND_URL
                                }/chapter-assignments/${assignment._id}`,
                                { ...assignment, chapter: chapter?._id }
                            );
                            return data;
                        })
                    )),
                ];

                await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters/${
                        chapter._id
                    }`,
                    {
                        ...values,
                        assignments: allAssignments.map(
                            (assignment) => assignment._id
                        ),
                    }
                );
            } else {
                const chapterResponse = await axios.post<Chapter>(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters`,
                    { ...values, assignments: [] }
                );

                newAssignments.map(async (assignment) => {
                    const { data } = await axios.post<ChapterAssignment>(
                        `${
                            import.meta.env.VITE_BACKEND_URL
                        }/chapter-assignments`,
                        { ...assignment, chapter: chapterResponse.data._id }
                    );
                    return data;
                });

                form.reset();
            }

            onUpdate();
            close();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Modal fullScreen opened={opened} onClose={hideModal}>
                <form
                    onSubmit={form.onSubmit((values) => handleSubmit(values))}
                >
                    <Flex direction="column" gap="xs">
                        <TextInput
                            withAsterisk
                            label="Title"
                            placeholder="e.g. Introduction to Methods"
                            key={form.key("title")}
                            {...form.getInputProps("title")}
                        />

                        <Flex direction="column" gap="xs">
                            <Input.Label required>
                                Learning Objectives
                            </Input.Label>
                            {form.values.learningObjectives.map(
                                (objective, index) => (
                                    <Flex
                                        key={index}
                                        flex="1"
                                        align="center"
                                        gap="xs"
                                        w="100%"
                                    >
                                        <TextInput
                                            w="100%"
                                            size="xs"
                                            value={objective}
                                            onChange={(e) =>
                                                handleUpdateObjective(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <ActionIcon
                                            color="red"
                                            variant="subtle"
                                            onClick={() =>
                                                handleDeleteObjective(index)
                                            }
                                        >
                                            <IconTrash stroke={1.5} size={16} />
                                        </ActionIcon>
                                    </Flex>
                                )
                            )}
                            <Flex justify="center">
                                <Button
                                    variant="default"
                                    size="xs"
                                  
                                    onClick={handleAddObjective}
                                    leftSection={
                                        <IconPlus size={20} stroke={1.5} />
                                    }
                                >
                                    Add a new learning objective
                                </Button>
                            </Flex>
                        </Flex>
                        <ChapterAssignments
                            assignments={chapterAssignments || []}
                            handleAddAssignment={handleAddAssignment}
                            handleDeleteAssignment={handleDeleteAssignment}
                            handleUpdateAssignment={handleUpdateAssignment}
                        />

                        <Flex justify="end" gap="md">
                            <Button variant="default" onClick={hideModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </Flex>
                    </Flex>
                </form>
            </Modal>
            <Box onClick={showModal}>{target}</Box>
        </>
    );
};

export default ChapterModal;
