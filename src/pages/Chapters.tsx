import {
    ActionIcon,
    Affix,
    Button,
    Card,
    Flex,
    Text,
    Tooltip,
} from "@mantine/core";
import Layout from "../components/Layout";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";
import ChapterModal from "../components/topics/ChapterModal";
import {
    IconGripVertical,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Chapter, ChapterWithID } from "../types/Chapter";
import axios from "axios";
import { useListState } from "@mantine/hooks";
import classes from "../styles/DndList.module.css";
import ConfirmPopup from "../components/ConfirmPopup";

const Chapters: React.FC = () => {
    const [refresh, setRefresh] = useState<number>(0);
    const [state, handlers] = useListState<ChapterWithID>([]);
    const [reorderMode, setReorderMode] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ChapterWithID[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters`
                );
                handlers.setState(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [refresh]);

    const deleteChapter = async (id: string) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/chapters/${id}`
            );
            setRefresh(refresh + 1);
        } catch (err) {
            console.error(err);
        }
    };

    const items = state.map((item, index) => (
        <Draggable key={item._id} index={index} draggableId={item._id}>
            {(provided, snapshot) => (
                <Flex
                    gap="xs"
                    align="center"
                    className={cx(classes.item, {
                        [classes.itemDragging]: snapshot.isDragging,
                    })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {reorderMode && (
                        <Flex
                            align="center"
                            {...provided.dragHandleProps}
                            className={classes.dragHandle}
                        >
                            <IconGripVertical size={18} stroke={1.5} />
                        </Flex>
                    )}

                    <Flex flex="1" justify="space-between" align="center">
                        <h3 style={{ textTransform: "capitalize" }}>
                            Chapter {item.order}: {item.title}
                        </h3>
                        <Flex justify="end" gap="xs">
                            <ChapterModal
                                onUpdate={() => setRefresh(refresh + 1)}
                                target={
                                    <ActionIcon variant="subtle" color="gray">
                                        <IconPencil size={16} stroke={1.5} />
                                    </ActionIcon>
                                }
                                chapter={item}
                            />
                            <ConfirmPopup
                                action={() => deleteChapter(item._id)}
                                prompt="Are you sure you want to delete this chapter?"
                            >
                                <ActionIcon variant="subtle" color="red">
                                    <IconTrash size={16} stroke={1.5} />
                                </ActionIcon>
                            </ConfirmPopup>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Draggable>
    ));

    return (
        <Layout>
            <Flex w="100%" flex="1" gap="xs" direction="column">
                <Flex justify="end">
                    <Button onClick={() => setReorderMode(!reorderMode)}>
                        {reorderMode ? "Save New Order" : "Reorder Chapters"}
                    </Button>
                </Flex>
                <DragDropContext
                    onDragEnd={({ destination, source }) =>
                        handlers.reorder({
                            from: source.index,
                            to: destination?.index || 0,
                        })
                    }
                >
                    <Droppable droppableId="dnd-list" direction="vertical">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {items}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Flex>
            <Affix position={{ bottom: 50, right: 25 }}>
                <ChapterModal
                    onUpdate={() => setRefresh(refresh + 1)}
                    target={
                        <Tooltip label="Add a new chapter" position="right">
                            <ActionIcon size="xl" radius="xl" variant="filled">
                                <IconPlus size={20} stroke={2} />
                            </ActionIcon>
                        </Tooltip>
                    }
                />
            </Affix>
        </Layout>
    );
};

export default Chapters;
