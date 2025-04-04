import { ActionIcon, Button, Flex, Grid, Modal, Space, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDownload, IconEye } from "@tabler/icons-react";
import React from "react";
import { User } from "../../hooks/AuthContext";
import PastCard from "../dashboard/PastCard";

interface ViewStudentModalProps {
    student: User;
}

const ViewStudentModal: React.FC<ViewStudentModalProps> = ({
    student,
}: ViewStudentModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                fullScreen
                opened={opened}
                onClose={close}
                title={`View Details for ${student.firstName} ${student.lastName}`}
            >
                <Flex justify="end">
                    <Button
                        leftSection={<IconDownload size={16} stroke={1.5} />}
                    >
                        Download
                    </Button>
                </Flex>
                <Space h="md" />
                <Grid>
                    <Grid.Col>
                        <PastCard user={student} />
                    </Grid.Col>
                </Grid>
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
