import { useState } from "react";
import { Text, Table, Group, Flex, Skeleton, Space } from "@mantine/core";

import Layout from "../components/Layout";
import { User } from "../types/User";
import Search from "../components/progress/Search";

import DownloadModal from "../components/progress/DownloadModal";
import UploadModal from "../components/progress/UploadModal";
import { useUsers } from "../hooks/users";

const UserDirectory: React.FC = () => {
    const { data, isLoading, refetch } = useUsers();
    const [users, setUsers] = useState<User[] | undefined>(data);

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
                    retrieveItems={refetch}
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
