import { Box, Button, Flex, Modal, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

interface ConfirmPopupProps {
    children?: React.ReactNode;
    prompt?: string;
    action?: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
    children,
    prompt,
    action,
}: ConfirmPopupProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Box onClick={open}>{children}</Box>
            <Modal opened={opened} centered onClose={close}>
                {prompt}
                <Space h="md" />
                <Flex justify="end" gap="xs">
                    <Button variant="outlined" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="filled" onClick={action}>
                        Ok
                    </Button>
                </Flex>
            </Modal>
        </>
    );
};

export default ConfirmPopup;
