import {
    Flex,
    Modal,
    Button,
    Box,
    Tabs,
    Container,
    Space,
    Text,
    Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Chapter, WithChapter } from "../../types/Chapter";
import { useForm } from "@mantine/form";
import ChapterAssignments from "./ChapterAssignments";
import { Assignment } from "../../types/Assignment";
import { PropsWithChildren, useEffect, useState } from "react";
import GeneralInfo from "./GeneralInfo";
import { useAllAssignments } from "../../hooks/useAssignments";
import { useCreateChapter, useEditChapterById } from "../../hooks/useChapters";

const ChapterModal: React.FC<PropsWithChildren<WithChapter>> = ({
    chapter,
    children,
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { data: chapterAssignmentsData, isLoading } = useAllAssignments(
        chapter ? chapter?.uuid : undefined,
    );

    const { mutateAsync: createChapter } = useCreateChapter();
    const { mutateAsync: editChapterById } = useEditChapterById();

    const [chapterAssignments, setChapterAssignments] = useState<
        Assignment[] | undefined
    >(chapterAssignmentsData);

    useEffect(() => {
        // If editing an existing chapter, set assignments from backend; if creating new, reset to empty
        if (chapter) {
            setChapterAssignments(chapterAssignmentsData);
        } else {
            setChapterAssignments([]);
        }
    }, [chapter, chapterAssignmentsData]);

    const form = useForm<
        Partial<Chapter> & { assignments: Partial<Assignment>[] }
    >({
        initialValues: chapter
            ? { ...chapter, assignments: [] as Partial<Assignment>[] }
            : {
                  uuid: "",
                  title: "",
                  assignments: [] as Partial<Assignment>[],
                  description: "",
                  released: false,
                  requestFeedback: false,
              },
        validate: {
            title: (value) =>
                !value || value.length == 0 ? "A title is required." : null,
            description: (value) =>
                !value || value.length == 0
                    ? "A description is required."
                    : null,
            released: (value) =>
                value === undefined ? "A released status is required." : null,
        },
    });

    const hideModal = () => {
        if (!chapter) {
            form.reset();
            setChapterAssignments([]); // Reset assignments when closing modal for new chapter
        }
        close();
    };

    const showModal = () => {
        if (!chapter) {
            form.reset();
            setChapterAssignments([]); // Ensure assignments are empty when creating new chapter
        }
        open();
    };

    const handleAddAssignment = () => {
        setChapterAssignments([
            ...(chapterAssignments || []),
            {
                uuid: "",
                title: "",
                identifier: "",
                dueDate: new Date(),
            },
        ]);
    };

    const handleDeleteAssignment = (index: number) => {
        const updatedAssignments = chapterAssignments?.filter(
            (_, i) => i !== index,
        );
        setChapterAssignments(updatedAssignments);
    };

    const handleUpdateAssignment = (
        index: number,
        field: string,
        value: any,
    ) => {
        const updatedAssignments = chapterAssignments?.map((obj, i) =>
            i === index ? { ...obj, [field]: value } : obj,
        );
        setChapterAssignments(updatedAssignments);
    };

    const handleSubmit = async (values: Partial<Chapter>) => {
        if (chapter) {
            await editChapterById({
                chapterId: chapter.uuid,
                updatedChapter: values,
                assignments: chapterAssignments,
            });
        } else {
            // Only send assignments that have at least a title or identifier (avoid empty objects)
            const filteredAssignments = (chapterAssignments || []).filter(
                (a) => a && (a.title || a.identifier),
            );

            await createChapter({
                newChapter: values,
                assignments:
                    filteredAssignments.length > 0 ? filteredAssignments : [],
            });

            form.reset();
            setChapterAssignments([]);
        }
        close();
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

                                <Tabs.Tab value="assignments">
                                    Assignments
                                </Tabs.Tab>
                            </Tabs.List>
                            <Space h="lg" />
                            {(form.errors.title ||
                                form.errors.description ||
                                form.errors.released) && (
                                <Text c="red" ta="center" size="sm">
                                    Please check all tabs to make sure you have
                                    filled out the required fields.
                                </Text>
                            )}
                            {isLoading ? (
                                <Loader type="dots" size="xl" />
                            ) : (
                                <>
                                    <Tabs.Panel value="general">
                                        <GeneralInfo form={form} />
                                    </Tabs.Panel>

                                    <Tabs.Panel value="assignments">
                                        <ChapterAssignments
                                            assignments={
                                                chapterAssignments || []
                                            }
                                            handleAddAssignment={
                                                handleAddAssignment
                                            }
                                            handleDeleteAssignment={
                                                handleDeleteAssignment
                                            }
                                            handleUpdateAssignment={
                                                handleUpdateAssignment
                                            }
                                        />
                                    </Tabs.Panel>
                                </>
                            )}
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
            <Box onClick={showModal}>{children}</Box>
        </>
    );
};

export default ChapterModal;
