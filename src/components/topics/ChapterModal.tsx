import {
    ActionIcon,
    Flex,
    TextInput,
    Modal,
    Textarea,
    Tooltip,
    Button,
    Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { Chapter } from "../../types/Chapter";
import { useForm } from "@mantine/form";
import axios from "axios";
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
    const form = useForm({
        mode: "uncontrolled",
        initialValues: chapter
            ? chapter
            : {
                  order: 1,
                  learningObjectives: ["something"],
                  title: "",
              },
    });

    const handleSubmit = async (values: Chapter) => {
        try {
            console.log(values);
            if (chapter) {
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters`,
                    values
                );
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
                    </Flex>
                    <Flex justify="end" gap="md">
                        <Button variant="default" onClick={close}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </Flex>
                </form>
            </Modal>
            <Box onClick={open}>{target}</Box>
        </>
    );
};

export default ChapterModal;
