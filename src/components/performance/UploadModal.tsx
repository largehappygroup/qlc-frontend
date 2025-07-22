import {
    Alert,
    Button,
    Container,
    Flex,
    Group,
    Modal,
    Pill,
    Space,
    Text,
} from "@mantine/core";
import { Dropzone, MIME_TYPES, FileWithPath } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

const UploadModal: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [file, setFile] = useState<FileWithPath>();
    const [rejectAlert, setRejectAlert] = useState<string>("");

    const handleUpload = async () => {
        if (!file) {
            setRejectAlert("You must upload a file!");
        } else {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/users/upload`,
                formData
            );
            console.log(response.data);
        }
    };

    return (
        <>
            <Button
                onClick={open}
                size="xs"
                leftSection={<IconUpload size={20} />}
            >
                Upload
            </Button>

            <Modal centered fullScreen opened={opened} onClose={close}>
                <Container>
                    {rejectAlert && (
                        <>
                            <Alert
                                variant="light"
                                color="red"
                                withCloseButton
                                title="File Upload Error"
                                onClose={() => setRejectAlert("")}
                                icon={<IconInfoCircle />}
                            >
                                {rejectAlert}
                            </Alert>
                            <Space h="md" />
                        </>
                    )}

                    <Dropzone
                        multiple={false}
                        onDrop={(files) => setFile(files[0])}
                        onReject={(files) =>
                            setRejectAlert(
                                `"${files[0].file.name}" cannot be uploaded because it is not a .csv or the file size is too large.`
                            )
                        }
                        accept={[MIME_TYPES.csv]}
                        maxSize={5 * 1024 ** 2}
                    >
                        <Group
                            justify="center"
                            gap="xl"
                            mih={220}
                            style={{ pointerEvents: "none" }}
                        >
                            <Dropzone.Accept>
                                <IconUpload
                                    size={52}
                                    color="var(--mantine-color-blue-6)"
                                    stroke={1.5}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX
                                    size={52}
                                    color="var(--mantine-color-red-6)"
                                    stroke={1.5}
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconUpload
                                    size={52}
                                    color="var(--mantine-color-dimmed)"
                                    stroke={1.5}
                                />
                            </Dropzone.Idle>

                            <div>
                                <Text size="xl" inline>
                                    Drag a csv here or click to select file
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    The file should not exceed 5 MB
                                </Text>
                            </div>
                        </Group>
                    </Dropzone>
                    {file && (
                        <>
                            <Space h="md" />
                            <Pill
                                size="xl"
                                onRemove={() => setFile(undefined)}
                                withRemoveButton
                            >
                                {file?.name}
                            </Pill>
                        </>
                    )}

                    <Space h="md" />
                    <Flex justify="end">
                        <Button onClick={handleUpload}>Submit</Button>
                    </Flex>
                </Container>
            </Modal>
        </>
    );
};

export default UploadModal;
