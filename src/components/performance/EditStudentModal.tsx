import { ActionIcon, Button, Flex, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../hooks/AuthContext";
import { IconEdit } from "@tabler/icons-react";

interface EditStudentModalProps {
    student: User;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({
    student,
}: EditStudentModalProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                fullScreen
                opened={opened}
                onClose={close}
                title={`Edit Details for ${student.firstName} ${student.lastName}`}
            >
                <Flex justify="end">
                    <Button>Download</Button>
                </Flex>
            </Modal>
            <Tooltip label="Edit" withArrow>
                <ActionIcon onClick={open}>
                    <IconEdit stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </>
    );
};

export default EditStudentModal;
