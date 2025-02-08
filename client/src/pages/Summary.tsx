import {
    Button,
    Container,
    Flex,
    Text,
    Code,
    ThemeIcon,
    Accordion,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface SummaryProps {
    questions?: [];
}

const Summary: React.FC<SummaryProps> = ({ questions }: SummaryProps) => {
    return (
        <>
            <Container px={{ base: 0, lg: "xl" }} py="lg">
                <Flex direction="column" gap="lg">
                    <Accordion>
                        {questions?.map((question, index) => (
                            <Accordion.Item key={index} value={`${index}`}>
                                <Accordion.Control
                                    icon={
                                        <ThemeIcon color="green">
                                            <IconCheck />
                                        </ThemeIcon>
                                    }
                                >
                                    Question 1
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

                    <Button radius="xl" fullWidth>
                        Back to Home
                    </Button>
                </Flex>
            </Container>
        </>
    );
};

export default Summary;
