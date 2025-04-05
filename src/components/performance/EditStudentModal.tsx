import {
    ActionIcon,
    Button,
    Flex,
    Modal,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../hooks/AuthContext";
import { IconEdit, IconPencil } from "@tabler/icons-react";

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
                <TextInput label="First Name" value={student.firstName} />
                <TextInput label="Last Name" value={student.lastName} />
                <TextInput label="Email" value={student.email} />
            </Modal>
            <ActionIcon variant="subtle" color="gray" onClick={open}>
                <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
        </>
    );
};

export default EditStudentModal;
