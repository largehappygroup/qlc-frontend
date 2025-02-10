import {
    Affix,
    Button,
    CloseButton,
    Container,
    Divider,
    Flex,
    Progress,
    Title,
    Text,
    Code,
    ThemeIcon,
    Box,
    Modal,
    ScrollArea,
    Popover,
    Space,
} from "@mantine/core";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import CodingQuestion from "./questions/CodingQuestion";
import { IconCheck } from "@tabler/icons-react";
import Layout from "./Layout";
import { useDisclosure } from "@mantine/hooks";

interface QuizProps {
    children?: React.ReactNode;
}

const Quiz: React.FC<QuizProps> = ({ children }: QuizProps) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Box w={{ base: "100%", lg: "auto" }} onClick={open}>
                {children}
            </Box>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                scrollAreaComponent={ScrollArea.Autosize}
                centered
                fullScreen
            >
                <Flex direction="column" gap="xl">
                    <Flex align="center" gap="md">
                        <Progress
                            flex="1"
                            radius="xl"
                            size="lg"
                            value={40}
                            striped
                            animated
                        />

                        <CloseButton onClick={close} />
                    </Flex>
                    <MultipleChoiceQuestion
                        question="What is the correct way to declare and initialize a variable in
                Java?"
                        availableAnswers={[
                            "int a = 1;",
                            "var a = 1;",
                            "a = 1",
                            "int a;",
                        ]}
                    />
                    <Divider />
                    <Flex gap="lg" align="center">
                        <ThemeIcon color="green">
                            <IconCheck
                                style={{ width: "70%", height: "70%" }}
                            />
                        </ThemeIcon>
                        <Title>Correct!</Title>
                    </Flex>
                    <Text>
                        In Java, a variable can be declared and initialized in
                        one line by specifying the variable's data type,
                        followed by the variable name, an assignment operator
                        (=), and the value you want to assign to it. Here's the
                        general format:
                    </Text>
                    <Code>{" <datatype> <variableName> = <value>"}</Code>
                    <Button radius="xl" fullWidth>
                        Submit
                    </Button>
                </Flex>
            </Modal>
        </>
    );
};

export default Quiz;
