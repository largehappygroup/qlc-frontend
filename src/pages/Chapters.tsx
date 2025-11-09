import { useEffect, useState } from "react";
import axios from "axios";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";

import {
    ActionIcon,
    Affix,
    Badge,
    Button,
    Card,
    Flex,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import {
    IconArrowsUpDown,
    IconClock,
    IconDeviceFloppy,
    IconGripVertical,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";

import Layout from "../components/Layout";
import ConfirmPopup from "../components/ConfirmPopup";
import ChapterModal from "../components/chapters/ChapterModal";

import { Chapter } from "../types/Chapter";
import classes from "../styles/DndList.module.css";

const Chapters: React.FC = () => {
    const [state, handlers] = useListState<Chapter>([]);
    const [reorderMode, setReorderMode] = useState<boolean>(false);
    const [savedChapter, setSavedChapter] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Chapter[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters`
                );
                handlers.setState(
                    response.data.sort((a, b) =>
                        a.order && b.order ? a.order - b.order : -1
                    )
                );
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [savedChapter]);

    const generateExercises = async (chapterId: string | undefined) => {
        try {
            await axios.post(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/exercises/batch?chapterId=${chapterId}`
            );
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * deletes a chapter by id
     * @param id - the uuid of the chapter to delete
     */
    const deleteChapter = async (id: string | undefined) => {
        if (id) {
            try {
                await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters/${id}`
                );
                window.location.reload();
            } catch (err) {
                console.error(err);
            }
        }
    };

    /**
     * Handles the end of a drag event to reorder chapters
     * @param param0 - contains source and destination information
     * @returns void
     */
    const handleDragEnd = ({ destination, source }: any) => {
        if (!destination) return; // If dropped outside a droppable area, do nothing

        // Create a copy of the chapters array from the state
        const reorderedChapters = [...state];
        const [movedItem] = reorderedChapters.splice(source.index, 1); // Remove the dragged item
        reorderedChapters.splice(destination.index, 0, movedItem); // Insert it at the new position

        // Update order in state based on the new order after dragging
        reorderedChapters.forEach((chapter, index) => {
            chapter.order = index + 1; // Update order for each chapter
        });

        // Update the state with the new order
        handlers.setState(reorderedChapters);
    };

    /**
     * Saves the new order of chapters to the backend
     */
    const handleSaveOrder = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/chapters`, {
                chapters: state.map((chapter, index) => ({
                    ...chapter,
                    order: index + 1,
                })),
            });
            setReorderMode(false);
        } catch (err) {
            console.error(err);
        }
    };

    const items = state.map((item, index) => (
        <Draggable
            key={item.uuid}
            index={index}
            draggableId={item.uuid ? item.uuid : item.title}
            isDragDisabled={!reorderMode}
        >
            {(provided, snapshot) => (
                <Card
                    withBorder
                    shadow="sm"
                    className={cx(classes.item, {
                        [classes.itemDragging]: snapshot.isDragging,
                    })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Flex gap="sm" justify="space-between">
                        {reorderMode && (
                            <Flex
                                align="center"
                                {...provided.dragHandleProps}
                                className={classes.dragHandle}
                            >
                                <ActionIcon variant="transparent">
                                    <IconGripVertical size={35} stroke={1.5} />
                                </ActionIcon>
                            </Flex>
                        )}
                        <Flex direction="column" flex="1" gap="xs">
                            <Flex
                                justify="space-between"
                                gap="xs"
                                align={{ base: "start", md: "center" }}
                            >
                                <Flex
                                    gap={{ base: "xs", md: "sm" }}
                                    direction={{ base: "column", md: "row" }}
                                    align={{ base: "start", md: "center" }}
                                    py="xs"
                                    px="sm"
                                >
                                    <Title
                                        size="lg"
                                        order={3}
                                        style={{
                                            textTransform: "capitalize",
                                            wordBreak: "break-all",
                                            hyphens: "auto",
                                        }}
                                    >
                                        Chapter {item.order}: {item.title}
                                    </Title>

                                    <Badge>
                                        {item.assignmentIds
                                            ? `${
                                                  item.assignmentIds.length
                                              } Assignment${
                                                  item.assignmentIds.length ===
                                                  1
                                                      ? ""
                                                      : "s"
                                              }`
                                            : "0 Assignments"}
                                    </Badge>
                                </Flex>
                                <Flex justify="end" flex="1" gap="xs" py="xs">
                                    <ActionIcon
                                        variant="subtle"
                                        color="gray"
                                        onClick={() =>
                                            generateExercises(item.uuid)
                                        }
                                    >
                                        <IconClock size={16} stroke={1.5} />
                                    </ActionIcon>
                                    <ChapterModal
                                        onUpdate={() =>
                                            setSavedChapter(!savedChapter)
                                        }
                                        chapter={item}
                                    >
                                        <ActionIcon
                                            variant="subtle"
                                            color="gray"
                                        >
                                            <IconPencil
                                                size={16}
                                                stroke={1.5}
                                            />
                                        </ActionIcon>
                                    </ChapterModal>
                                    <ConfirmPopup
                                        action={() => deleteChapter(item.uuid)}
                                        prompt="Are you sure you want to delete this chapter?"
                                    >
                                        <ActionIcon
                                            color="red"
                                            variant="subtle"
                                        >
                                            <IconTrash size={16} stroke={1.5} />
                                        </ActionIcon>
                                    </ConfirmPopup>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            )}
        </Draggable>
    ));

    return (
        <Layout title="Chapters">
            <Flex w="100%" flex="1" gap="xs" direction="column">
                <Flex justify="end">
                    {state.length > 1 && (
                        <Button
                            variant="default"
                            onClick={
                                reorderMode
                                    ? handleSaveOrder
                                    : () => setReorderMode(true)
                            }
                            rightSection={
                                reorderMode ? (
                                    <IconDeviceFloppy stroke={1.5} size={16} />
                                ) : (
                                    <IconArrowsUpDown stroke={1.5} size={16} />
                                )
                            }
                        >
                            {reorderMode ? "Save" : "Reorder"}
                        </Button>
                    )}
                </Flex>
                {items.length === 0 && <Text>No Chapters Found.</Text>}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="dnd-list" direction="vertical">
                        {(provided) => (
                            <Flex
                                direction="column"
                                gap="sm"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {items}
                                {provided.placeholder}
                            </Flex>
                        )}
                    </Droppable>
                </DragDropContext>
            </Flex>
            <Affix position={{ bottom: 50, right: 25 }}>
                <ChapterModal onUpdate={() => window.location.reload()}>
                    <Tooltip label="Add a new chapter" position="right">
                        <ActionIcon size="xl" radius="xl" variant="filled">
                            <IconPlus size={20} stroke={2} />
                        </ActionIcon>
                    </Tooltip>
                </ChapterModal>
            </Affix>
        </Layout>
    );
};

export default Chapters;
