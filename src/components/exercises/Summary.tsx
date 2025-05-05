import {
    Button,
    Container,
    Flex,
    Text,
    Code,
    ThemeIcon,
    Accordion,
    Modal,
    Box,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Layout from "./Layout";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

interface SummaryProps {
    date?: Date;
    questions?: any[];
    children?: React.ReactNode;
}

const Summary: React.FC<SummaryProps> = ({
    questions,
    children,
    date,
}: SummaryProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Box onClick={open} w="100%">
                {children}
            </Box>

            <Modal
                opened={opened}
                fullScreen
                onClose={close}
                title={date? `Summary for ${date.toLocaleDateString()}` : "Summary"}
                centered
            >
                <Flex direction="column" gap="lg">
                    <Accordion>
                        {questions?.map((question, index) => (
                            <Accordion.Item
                                key={index + 1}
                                value={`${index + 1}`}
                            >
                                <Accordion.Control
                                    icon={
                                        <ThemeIcon color="green">
                                            <IconCheck />
                                        </ThemeIcon>
                                    }
                                >
                                    {`Question ${index + 1}`}
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Text>
                                        In Java, a variable can be declared and
                                        initialized in one line by specifying
                                        the variable's data type, followed by
                                        the variable name, an assignment
                                        operator (=), and the value you want to
                                        assign to it. Here's the general format:
                                    </Text>
                                    <Code>
                                        {" <datatype> <variableName> = <value>"}
                                    </Code>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Flex>
            </Modal>
        </>
    );
};

export default Summary;
