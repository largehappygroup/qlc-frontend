import { useEffect, useState } from "react";
import { Text, Table, Group, Flex, Skeleton, Space } from "@mantine/core";

import Layout from "../components/Layout";
import { User } from "../hooks/AuthContext";
import Search from "../components/performance/Search";
import axios from "axios";
import DownloadModal from "../components/performance/DownloadModal";
import UploadModal from "../components/performance/UploadModal";

const UserDirectory: React.FC = () => {
    const [users, setUsers] = useState<User[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<User[]>(
                `${import.meta.env.VITE_BACKEND_URL}/users`
            );
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const rows = isLoading
        ? Array(5).map((val) => (
              <Table.Tr key={val}>
                  <Table.Td>
                      <Skeleton h="md" />
                  </Table.Td>
              </Table.Tr>
          ))
        : users?.map((student) => (
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
                <Search
                    retrieveItems={fetchData}
                    items={
                        users?.map((user) => ({
                            field: `${user.firstName} ${user.lastName}`,
                            details: user,
                        })) || []
                    }
                    setItems={setUsers}
                />
                <Flex gap="md">
                    <UploadModal />
                    <DownloadModal onlyUser />
                </Flex>
            </Flex>
            <Space h="md" />
            {users && users.length > 0 ? (
                <Table verticalSpacing="sm">
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            ) : (
                "No Users Found."
            )}
        </Layout>
    );
};

export default UserDirectory;
