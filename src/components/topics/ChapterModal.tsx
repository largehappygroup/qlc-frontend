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
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Chapter, ChapterWithID } from "../../types/Chapter";
import { useForm } from "@mantine/form";
import axios from "axios";
interface ChapterModalProps {
    chapter?: ChapterWithID;
    target: React.ReactNode;
    onUpdate: () => void;
}

const ChapterModal: React.FC<ChapterModalProps> = ({
    chapter,
    target,
    onUpdate,
}: ChapterModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: chapter
            ? chapter
            : {
                  learningObjectives: [],
                  title: "",
              },
    });

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

    const handleSubmit = async (values: FormData) => {
        try {
            if (chapter) {
                const response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters/${
                        chapter._id
                    }`,
                    values
                );
            } else {
                console.log(values);
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters`,
                    values
                );
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
            <Modal fullScreen opened={opened} onClose={close}>
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

                        <Flex justify="end" gap="md">
                            <Button variant="default" onClick={close}>
                                Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                        </Flex>
                    </Flex>
                </form>
            </Modal>
            <Box onClick={open}>{target}</Box>
        </>
    );
};

export default ChapterModal;
