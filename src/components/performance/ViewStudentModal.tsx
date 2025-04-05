import {
    ActionIcon,
    Button,
    Flex,
    Grid,
    Menu,
    Modal,
    Space,
    Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconDownload,
    IconEye,
    IconReportAnalytics,
} from "@tabler/icons-react";
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
            <Menu.Item
                onClick={open}
                leftSection={<IconReportAnalytics size={16} stroke={1.5} />}
            >
                Analytics
            </Menu.Item>
        </>
    );
};

export default ViewStudentModal;
