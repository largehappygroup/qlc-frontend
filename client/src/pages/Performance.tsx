import React from "react";
import Layout from "../components/Layout";
import {
    ActionIcon,
    Button,
    Flex,
    Text,
    Popover,
    Table,
    TextInput,
    Checkbox,
    Space,
} from "@mantine/core";
import {
    IconDownload,
    IconEdit,
    IconEye,
    IconFilter,
    IconSearch,
    IconTrash,
} from "@tabler/icons-react";
import ViewStudentModal from "../components/performance/ViewStudentModal";

const elements = [
    { progress: 5 / 20, vuNetId: "wuh31", name: "Helen Wu" },
    { progress: 3 / 20, vuNetId: "bobsmith", name: "Bob Smith" },
    { progress: 4 / 20, vuNetId: "suebrown", name: "Sue Brown" },
];

const Performance: React.FC = () => {
    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.vuNetId}</Table.Td>
            <Table.Td>{element.progress}</Table.Td>
            <Table.Td>
                <Flex gap="sm" justify="end">
                    <ViewStudentModal />
                    <ActionIcon>
                        <IconEdit stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color="red">
                        <IconTrash stroke={1.5} />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Layout>
            <Flex justify="end" gap="md" align="center">
                <TextInput size="xs" placeholder="e.g. John Doe" />
                <ActionIcon size="md">
                    <IconSearch size={20} />
                </ActionIcon>
                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <Button
                            size="xs"
                            leftSection={<IconFilter size={20} />}
                        >
                            Filter
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Flex direction="column" gap="xs">
                            <Flex align="center" gap="xs">
                                <Checkbox />
                                <Text size="sm">Test</Text>
                            </Flex>
                        </Flex>
                        <Space h="xs" />
                        <Button fullWidth size="compact-xs">
                            Apply
                        </Button>
                    </Popover.Dropdown>
                </Popover>
                <Button size="xs" leftSection={<IconDownload size={20} />}>Download</Button>
            </Flex>
            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Student Name</Table.Th>
                        <Table.Th>VUNetID</Table.Th>
                        <Table.Th>Progress</Table.Th>
                        <Table.Th ta="end">Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Layout>
    );
};

export default Performance;
