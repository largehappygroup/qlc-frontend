import {
    Flex,
    Modal,
    Button,
    Box,
    Tabs,
    Container,
    Space,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Chapter } from "../../types/Chapter";
import { useForm } from "@mantine/form";
import axios from "axios";
import ChapterAssignments from "./ChapterAssignments";
import { ChapterAssignment } from "../../types/ChapterAssignment";
import { useEffect, useState } from "react";
import GeneralInfo from "./GeneralInfo";
import LearningObjectives from "./LearningObjectives";
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
                for (const assignmentId of chapter?.assignmentIds || []) {
                    const response = await axios.get<ChapterAssignment>(
                        `${
                            import.meta.env.VITE_BACKEND_URL
                        }/assignments/${assignmentId}`
                    );
                    assignmentDetails = [
                        ...assignmentDetails,
                        {
                            ...response.data,
                            startDate: new Date(response.data.startDate),

                            dueDate: new Date(response.data.dueDate),
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
                  description: "",
                  releaseDate: new Date(),
                  requestFeedback: false,
              },
        validate: {
            learningObjectives: (value) =>
                value.length == 0
                    ? "At least one learning objective is required."
                    : null,
            title: (value) =>
                !value || value.length == 0 ? "A title is required." : null,
            description: (value) =>
                !value || value.length == 0
                    ? "A description is required."
                    : null,
            releaseDate: (value) =>
                !value ? "A release date is required." : null,
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
                startDate: new Date(),
                dueDate: new Date(),
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

    const handleSubmit = async (values: Chapter) => {
        try {
            if (chapter) {
                await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters/${
                        chapter._id
                    }`,
                    {
                        ...values,
                        assignments: chapterAssignments,
                    }
                );
            } else {
                if (chapterAssignments.length > 0) {
                    await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/chapters`,
                        {
                            ...values,
                            assignments: chapterAssignments,
                        }
                    );
                } else {
                    await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/chapters`,
                        values
                    );
                }

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
            <Modal
                title={chapter ? "Edit Existing Chapter" : "Create New Chapter"}
                fullScreen
                opened={opened}
                onClose={hideModal}
                withinPortal
            >
                <form
                    onSubmit={form.onSubmit((values) => handleSubmit(values))}
                >
                    <Container size="xl">
                        <Tabs
                            variant="pills"
                            orientation="horizontal"
                            defaultValue="general"
                        >
                            <Tabs.List>
                                <Tabs.Tab value="general">
                                    General Information
                                </Tabs.Tab>
                                <Tabs.Tab value="objectives">
                                    Learning Objectives
                                </Tabs.Tab>
                                <Tabs.Tab value="assignments">
                                    Assignments
                                </Tabs.Tab>
                            </Tabs.List>
                            <Space h="lg" />
                            {(form.errors.title ||
                                form.errors.description ||
                                form.errors.releaseDate) && (
                                <Text c="red" ta="center" size="sm">
                                    Please check all tabs to make sure you have
                                    filled out the required fields.
                                </Text>
                            )}
                            <Tabs.Panel value="general">
                                <GeneralInfo form={form} />
                            </Tabs.Panel>

                            <Tabs.Panel value="objectives">
                                <LearningObjectives
                                    form={form}
                                    handleAddObjective={handleAddObjective}
                                    handleDeleteObjective={
                                        handleDeleteObjective
                                    }
                                    handleUpdateObjective={
                                        handleUpdateObjective
                                    }
                                />
                            </Tabs.Panel>

                            <Tabs.Panel value="assignments">
                                <ChapterAssignments
                                    assignments={chapterAssignments || []}
                                    handleAddAssignment={handleAddAssignment}
                                    handleDeleteAssignment={
                                        handleDeleteAssignment
                                    }
                                    handleUpdateAssignment={
                                        handleUpdateAssignment
                                    }
                                />
                            </Tabs.Panel>
                        </Tabs>
                        <Space h="lg" />
                        <Flex justify="end" gap="md">
                            <Button variant="default" onClick={hideModal}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </Flex>
                    </Container>
                </form>
            </Modal>
            <Box onClick={showModal}>{target}</Box>
        </>
    );
};

export default ChapterModal;
