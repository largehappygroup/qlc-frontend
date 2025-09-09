import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Flex, Text, Table, Space, Group } from "@mantine/core";

import { User } from "../hooks/AuthContext";
import axios from "axios";
import EditStudentModal from "../components/performance/EditStudentModal";
import Search from "../components/performance/Search";
import DownloadModal from "../components/performance/DownloadModal";
import UploadModal from "../components/performance/UploadModal";

const FacultyProgress: React.FC = () => {
    const [students, setStudents] = useState<User[]>();
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
    useEffect(() => {
        fetchData();
    }, []);

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
                    <EditStudentModal user={student} />
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Layout title="Progress">
            <Flex justify="space-between" gap="md" align="center">
                <Search
                    retrieveItems={fetchData}
                    items={
                        students?.map((student) => ({
                            field: `${student.firstName} ${student.lastName}`,
                            details: student,
                        })) || []
                    }
                    setItems={setStudents}
                />
                <Flex gap="md" justify="end">
                    <UploadModal />
                    <DownloadModal onlyUser={false} />
                </Flex>
            </Flex>
            <Space h="md" />
            {students && students.length > 0 ? (
                <Table verticalSpacing="sm">
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            ) : (
                "No Students Found."
            )}
        </Layout>
    );
};

export default FacultyProgress;
