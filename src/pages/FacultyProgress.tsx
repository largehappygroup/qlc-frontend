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
import { User } from "../hooks/AuthContext";
import axios from "axios";
import EditStudentModal from "../components/performance/EditStudentModal";
import Search from "../components/performance/Search";

const FacultyProgress: React.FC = () => {
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

    const handleDownload = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/download`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "users.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
            // Use fetch to initiate download as a blob
            /*const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/exercises/download`,
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "exercises.csv"); // Set filename
            document.body.appendChild(link);
            link.click();
            link.remove(); */
        } catch (error) {
            console.error("Download error:", error);
        }
    };

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
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Layout title="Progress">
            <Flex justify="space-between" gap="md" align="center">
                <Search />
                <Button
                    onClick={handleDownload}
                    size="xs"
                    leftSection={<IconDownload size={20} />}
                >
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

export default FacultyProgress;
