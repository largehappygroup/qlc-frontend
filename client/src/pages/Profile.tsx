import { Card, Grid, Text } from "@mantine/core";
import Layout from "../components/Layout";

const Profile: React.FC = () => {
    return (
        <Layout>
            <Grid>
                <Grid.Col>
                    <Card shadow="sm" withBorder>
                        <Text>Helen Wu</Text>
                        <Text>helen.wu@vanderbilt.edu</Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </Layout>
    );
};

export default Profile;
