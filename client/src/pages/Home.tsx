import { useState } from "react";
import TodayCard from "../components/TodayCard";
import PastCard from "../components/PastCard";
import { Button, Container, Flex, Title, Text, Divider } from "@mantine/core";
import { IconCaretLeft, IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";

const Home: React.FC = () => {
    const [viewMonth, setViewMonth] = useState("");
    return (
        <>
            <Container py="lg">
                <Flex direction="column" gap="lg">
                    <Title>Hello, Helen!</Title>
                    <TodayCard date={new Date()} status="Incomplete" />
                    <Divider />
                    <Flex justify="space-between" align="center">
                        <Button variant="subtle" leftSection={<IconCaretLeftFilled size={15} />}>Previous Month</Button>
                        <Text ta="center">Current Month's Exercises</Text>
                        <Button variant="subtle" rightSection={<IconCaretRightFilled size={15} />}>Next Month</Button>
                    </Flex>
                    <Flex direction="column">
                        <PastCard />
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};

export default Home;
