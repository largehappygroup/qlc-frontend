import { Button, Flex, Text } from "@mantine/core";
import Layout from "../components/Layout";

const Skills: React.FC = () => {
    return (
        <Layout>
            <Flex direction="column" gap="md">
                <Flex direction="column" gap="sm">
                    <Text>String Methods</Text>
                    <Flex gap="xs">
                        {Array(5)
                            .fill(0, 0, 20)
                            .map((item, index) => (
                                <Button
                                    variant={
                                        index % 3 == 0 ? "filled" : "light"
                                    }
                                    size="compact-sm"
                                />
                            ))}
                    </Flex>
                </Flex>
                <Flex direction="column" gap="sm">
                    <Text>File Manipulation</Text>
                    <Flex gap="xs">
                        {Array(10)
                            .fill(0, 0, 20)
                            .map((item, index) => (
                                <Button
                                    variant={
                                        index % 4 - 2 == 0 ? "filled" : "light"
                                    }
                                    size="compact-sm"
                                />
                            ))}
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default Skills;
