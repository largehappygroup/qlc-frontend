import { Avatar, Card, Flex, Grid, Text } from "@mantine/core";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthContext";

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <Layout title="Profile">
            <Grid>
                <Grid.Col>
                    <Flex
                        gap="lg"
                        align="center"
                        direction={{ base: "column", md: "row" }}
                    >
                        <Avatar
                            size="xl"
                            key={`${user?.firstName} ${user?.lastName}`}
                            name={`${user?.firstName} ${user?.lastName}`}
                            color="initials"
                        />
                        <Flex
                            ta={{ base: "center", md: "left" }}
                            direction="column"
                        >
                            <Text fw={700} size="xl">{`${user?.firstName} ${user?.lastName}`}</Text>
                            <Text>{user?.email}</Text>
                        </Flex>
                    </Flex>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default Profile;
