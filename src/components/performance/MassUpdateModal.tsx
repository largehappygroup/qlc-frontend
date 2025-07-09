import { Button, Container, Modal, Space, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";

const MassUpdateModal: React.FC = () => {
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
                title="Download CSV"
            >
                <Container>
                 
                </Container>
            </Modal>
        </>
    );
};

export default MassUpdateModal;
