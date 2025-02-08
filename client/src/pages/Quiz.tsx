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
} from "@mantine/core";
import MultipleChoiceQuestion from "../components/MultipleChoiceQuestion";
import CodingQuestion from "../components/CodingQuestion";
import { IconCheck } from "@tabler/icons-react";

const Quiz: React.FC = () => {
    return (
        <>
            <Container px={{ base: 0, lg: "xl" }} py="lg">
                <Flex direction="column" gap="xl">
                    <Flex
                        flex="1"
                        justify="space-between"
                        gap="xl"
                        align="center"
                    >
                        <Progress
                            w="100%"
                            radius="xl"
                            size="lg"
                            value={40}
                            striped
                            animated
                        />
                        <CloseButton />
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
            </Container>
        </>
    );
};

export default Quiz;
