import { Avatar, Card, Flex, Grid, Text } from "@mantine/core";
import Layout from "../components/Layout";

const Profile: React.FC = () => {
    return (
        <Layout>
            <Grid>
                <Grid.Col>
                    <Card shadow="sm" withBorder>
                        <Flex gap="lg" align="center">
                            <Avatar
                                size="xl"
                                key={"HW"}
                                name={"HW"}
                                color="initials"
                            />
                            <Flex direction="column">
                                <Text>Helen Wu</Text>
                                <Text>helen.wu@vanderbilt.edu</Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default Profile;
