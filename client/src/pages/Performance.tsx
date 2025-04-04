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
            <Table.Td>{`${student.firstName} ${student.lastName}`}</Table.Td>
            <Table.Td>{student.vuNetId}</Table.Td>
            <Table.Td>{student.email}</Table.Td>
            <Table.Td>
                <Flex gap="sm" justify="end">
                    <ViewStudentModal student={student} />
                    <EditStudentModal student={student} />
                    <ConfirmPopup prompt="Are you sure you wish to delete this student? All progress and previous exercises will be deleted.">
                        <ActionIcon color="red">
                            <IconTrash stroke={1.5} />
                        </ActionIcon>
                    </ConfirmPopup>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Layout>
            <Flex justify="end" gap="md" align="center">
                <Search />

                <Button size="xs" leftSection={<IconDownload size={20} />}>
                    Download
                </Button>
            </Flex>
            <Table striped>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Student Name</Table.Th>
                        <Table.Th>VUNetID</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th ta="end">Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Layout>
    );
};

export default Performance;
