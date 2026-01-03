import Layout from "../components/Layout";
import { Flex, Text, Table, Space, Group } from "@mantine/core";

import EditStudentModal from "../components/progress/EditStudentModal";
import Search from "../components/progress/Search";
import DownloadModal from "../components/progress/DownloadModal";
import UploadModal from "../components/progress/UploadModal";
import { useUsers } from "../hooks/users";
import { useEffect, useState } from "react";

const FacultyProgress: React.FC = () => {
    const { data, refetch } = useUsers("student");

    const [students, setStudents] = useState(data);
    useEffect(() => {
        setStudents(data);
    }, [data]);

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
                    retrieveItems={refetch}
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
