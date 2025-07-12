import { useEffect, useState } from "react";
import { Title, Text, Grid, Table, Group, Flex, Button } from "@mantine/core";

import Layout from "../components/Layout";
import { useAuth, User } from "../hooks/AuthContext";
import Search from "../components/performance/Search";
import axios from "axios";
import DownloadModal from "../components/performance/DownloadModal";
import UploadModal from "../components/performance/UploadModal";

const UserDirectory: React.FC = () => {
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<User[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/users`
                );
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    });

    const rows = users?.map((student) => (
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
        </Table.Tr>
    ));
    return (
        <Layout title="User Directory">
            <Flex justify="space-between">
                <Search />
                <Flex gap="md">
                    <UploadModal />
                    <DownloadModal onlyUser />
                </Flex>
            </Flex>
            <Table verticalSpacing="sm">
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Layout>
    );
};

export default UserDirectory;
