import { ActionIcon, Button, Card, Flex, Text } from "@mantine/core";
import Layout from "../components/Layout";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";
import ChapterModal from "../components/topics/ChapterModal";
import { IconGripVertical, IconPencil, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Chapter, ChapterWithID } from "../types/Chapter";
import axios from "axios";
import { useListState } from "@mantine/hooks";
import classes from "../styles/DndList.module.css";

const Chapters: React.FC = () => {
    const [refresh, setRefresh] = useState<number>(0);
    const [state, handlers] = useListState<ChapterWithID>([]);

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
                    <Flex
                        align="center"
                        {...provided.dragHandleProps}
                        className={classes.dragHandle}
                    >
                        <IconGripVertical size={18} stroke={1.5} />
                    </Flex>
                    <Flex flex="1" justify="space-between" align="center">
                        <h3 style={{ textTransform: "capitalize" }}>
                            Chapter {item.order}: {item.title}
                        </h3>
                        <ChapterModal
                            onUpdate={() => setRefresh(refresh + 1)}
                            target={
                                <ActionIcon variant="subtle" color="gray">
                                    <IconPencil size={16} stroke={1.5} />
                                </ActionIcon>
                            }
                            chapter={item}
                        />
                    </Flex>
                </Flex>
            )}
        </Draggable>
    ));

    return (
        <Layout>
            <Flex w="100%" flex="1" gap="xs" direction="column">
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
                <Flex justify="center">
                    <ChapterModal
                        onUpdate={() => setRefresh(refresh + 1)}
                        target={
                            <Button
                                variant="default"
                                leftSection={
                                    <IconPlus size={16} stroke={1.5} />
                                }
                            >
                                Add a New Chapter
                            </Button>
                        }
                    />
                </Flex>
            </Flex>
        </Layout>
    );
};

export default Chapters;
