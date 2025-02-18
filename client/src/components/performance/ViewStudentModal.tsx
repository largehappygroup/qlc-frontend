import { ActionIcon, Button, Flex, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload, IconEye } from "@tabler/icons-react";
import React from "react";

const ViewStudentModal: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                fullScreen
                opened={opened}
                onClose={close}
                title="View Helen's Details"
            >
                <Flex justify="end">
                    <Button leftSection={<IconDownload size={16} stroke={1.5} />}>Download</Button>
                </Flex>
            </Modal>
            <Tooltip label="View" withArrow>
                <ActionIcon onClick={open}>
                    <IconEye stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </>
    );
};

export default ViewStudentModal;
