import { Button, Container, Modal, Space, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import UserCsv from "./UserCsv";
import ExerciseCsv from "./ExerciseCsv";

interface DownloadModalProps {
    onlyUser: boolean;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
    onlyUser,
}: DownloadModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Button
                onClick={open}
                size="xs"
                leftSection={<IconDownload size={20} />}
            >
                Download
            </Button>
            <Modal
                centered
                fullScreen
                opened={opened}
                onClose={close}
            >
                <Container>
                    {onlyUser ? (
                        <UserCsv student={false} />
                    ) : (
                        <Tabs
                            variant="pills"
                            orientation="horizontal"
                            defaultValue="students"
                        >
                            <Tabs.List grow>
                                <Tabs.Tab value="students">
                                    Student Information
                                </Tabs.Tab>
                                <Tabs.Tab value="exercises">
                                    Exercise Results
                                </Tabs.Tab>
                            </Tabs.List>
                            <Space h="md" />
                            <Tabs.Panel value="students">
                                <UserCsv student />
                            </Tabs.Panel>
                            <Tabs.Panel value="exercises">
                                <ExerciseCsv />
                            </Tabs.Panel>
                        </Tabs>
                    )}
                </Container>
            </Modal>
        </>
    );
};

export default DownloadModal;
