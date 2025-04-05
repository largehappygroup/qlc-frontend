import React, { useEffect, useState } from "react";
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
    Group,
    Menu,
} from "@mantine/core";
import {
    IconDots,
    IconDownload,
    IconEdit,
    IconEye,
    IconFilter,
    IconMail,
    IconNote,
    IconPencil,
    IconReportAnalytics,
    IconSearch,
    IconTrash,
} from "@tabler/icons-react";
import ViewStudentModal from "../components/performance/ViewStudentModal";
import { User } from "../hooks/AuthContext";
import axios from "axios";
import EditStudentModal from "../components/performance/EditStudentModal";
import ConfirmPopup from "../components/ConfirmPopup";
import Search from "../components/performance/Search";

const Performance: React.FC = () => {
    const [students, setStudents] = useState<User[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<User[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/users?role=student`
                );
                setStudents(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    });

    const rows = students?.map((student) => (
        <Table.Tr key={student.vuNetId}>
            <Table.Td>
                <Group gap="sm">
                    <div>
                        <Text fz="sm" fw={500}>
                            {`${student.firstName} ${student.lastName}`}
                        </Text>
                        <Text c="dimmed" fz="xs" tt="capitalize">
                            {student.role}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{student.email}</Text>
                <Text fz="xs" c="dimmed">
                    Email
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <EditStudentModal student={student} />
                    <Menu
                        transitionProps={{ transition: "pop" }}
                        withArrow
                        position="bottom-end"
                        withinPortal
                    >
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots size={16} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={
                                    <IconMail size={16} stroke={1.5} />
                                }
                            >
                                Add note
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconReportAnalytics
                                        size={16}
                                        stroke={1.5}
                                    />
                                }
                            >
                                Analytics
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconTrash size={16} stroke={1.5} />
                                }
                                color="red"
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Layout>
            
            <Flex justify="space-between" gap="md" align="center">
                <Search />
                <Button size="xs" leftSection={<IconDownload size={20} />}>
                    Download
                </Button>
            </Flex>
            <Space h="md" />
            <Table verticalSpacing="sm">
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Layout>
    );
};

export default Performance;
