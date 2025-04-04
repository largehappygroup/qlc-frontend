import { Avatar, Card, Flex, Grid, Text } from "@mantine/core";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/AuthContext";

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <Grid>
                <Grid.Col>
                    <Card shadow="sm" withBorder>
                        <Flex gap="lg" align="center">
                            <Avatar
                                size="xl"
                                key={`${user?.firstName} ${user?.lastName}`}
                                name={`${user?.firstName} ${user?.lastName}`}
                                color="initials"
                            />
                            <Flex direction="column">
                                <Text>{`${user?.firstName} ${user?.lastName}`}</Text>
                                <Text>{user?.email}</Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default Profile;
